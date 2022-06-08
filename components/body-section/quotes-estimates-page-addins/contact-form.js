import React, { useState, useRef, useCallback, useEffect } from 'react';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import { FormControl, FormControlLabel, FormLabel, RadioGroup, TextField, Radio, Button } from '@material-ui/core'
import ContactFormStyles from './contact-form.module.css';
import { makeStyles, createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';
import axios from 'axios';
import NumberFormat from 'react-number-format';
import dynamic from 'next/dynamic';
const Modal  = dynamic(() => import('@material-ui/core/Modal'));


// Styles applied to MUI form inputs - assists and fixes the native label incorrectly displaying
const theme = createMuiTheme({
	palette: { 
		primary: { main: 'rgb(182, 98, 50)'	}, 
		secondary: { main: 'rgb(56, 56, 56)' } }
})
const useStyles = makeStyles ({
	label: {
		backgroundColor: "white",
		fontSize: '1.1rem',
		border: '4px solid white',
		marginTop: '-7px',
	},
	dateBox: { marginBottom: '14px' },
	dateWrapper: {
		'&:focus': {
			color: 'rgb(49, 49, 173)',
		}
	},
	paper: {
        position: 'absolute',
        width: 500,
		height: 'fit-content',
        backgroundColor: '#1f1f1f',
        color: 'white',
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
		left: '50%',
		top: '50%',
		transform: 'translate(-50%, -50%)',
        padding: theme.spacing(2, 4, 6),
		borderRadius: 20,
		borderColor: theme.palette.primary,
    },
	formStyle: {
		padding: '0px 20px',
		width: '90%',
		margin: '40px auto 80px',
		'@media(max-width: 550px)': {
			width: '100%',
			padding: '0',
		}
	},
	modalcontainer: {
		margin: 30,
	},
	modaltitle: {
		marginBottom: 30,
	},
	modaltext: {
		height: '30%',
		fontSize: 28,
	},
	haveGoodDayMsg: {
		margin: '40px 0', 
	}
});


// Contact form Component for the Quotes page
function ContactForm() { 
	const classes = useStyles();
	const { executeRecaptcha } = useGoogleReCaptcha();
	// Form Fields State Obj
	const initialStateVals = {
		fullName: { value: "", message: "Please provide a valid Name" },
		phoneNumber: { value: "", message: "Please provide a valid Phone Number" },
		email: { value: "", message: "Please provide a valid Email" },
		message: { value: "", message: "Please leave us a memo (No Numbers)"}
	};
	const [checkVals, setCheckVals] = useState(initialStateVals);
	const [radioSubjectSelectionValue, setRadioSubjectSelectionValue] = useState("Other");
	const [radioDateSelectionValue, setRadioDateSelectionValue] = useState("Next Business Day");
	// Modal & Error Messages
	const [success, setSuccess] = useState(false);
    const [messageModalOpen, setMessageModalOpen] = useState(messageModalOpen ? messageModalOpen : false);
	// captcha && form fields throw bool for submission button active/non-active
	const [scoreCard, setScoreCard] = useState(0.0);
	const [isVerifiedOnSubmit, setIsVerifiedOnSubmit] = useState(false);
	const [postErrorFlag, setPostErrorFlag] = useState(false);
	const [isError, setIsError] = useState(false);
	// Messages
	const variousMessages = {
		submitErrorText: "Something went wrong. Please try submitting your Quote Request again.",
		recaptchaErrorText: "The ReCaptcha has detected something strange. Please try again.",
		thankYouMessage: (calltime) => `Thank you for your getting in touch with us! We will get back to you by 6:00pm in ${calltime}.`,
		errorMessage: `There was an error with your information submission. Please try again.`
	}
	const regexComps = {
		reNormString: /^([^0-9]*)$/,
		rePhone: /[0-9]/g,
		reEmail: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
		reMessage: /([\n\r\t])/g
	}
	// const reNormString = /^([^0-9]*)$/;
	// const rePhone = /[0-9]/g;
	// const reEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	// const reMessage = /([\n\r\t])/g;
	const docLabel = document.querySelector('.Mui-error');

	// Form submission & resets
	const handleChange = (e) => {
		const {id, value} = e.target;
		if(checkVals) {
			setCheckVals({
				...checkVals,
				[id]: {
					...checkVals[id],
					value
				}
			})
		}
	}

	// Formats current date
	const formattedCallbackDate = () => {
		const dateString = new Date.toString(); // Sets the date to a string to parse
		const callBackDate = dateString.substring(0,15); // Dayofweek Month day year (Ex: Monday Jan 30 2022)
		const callBackTime = dateString.toString().substring(16,24); // time converted to standard time -skip GMT-xxxxx- 
		const callBackTimezone = dateString.substring(34); // then the suffix time zone
		return `${callBackDate} ${callBackTime} ${callBackTimezone}`;
	}
	
	// Evals on page load -- need to min this to var <onActivelyTypingOnForm>
	useEffect(() => {
		if(executeRecaptcha)
			handleReCaptchaVerify();
	}, [executeRecaptcha, handleReCaptchaVerify]);

	// Checks the form for Mui-based error thrown - active
	useEffect(() =>{
		docLabel !== undefined && docLabel ? setIsError(true) : setIsError(false);
		console.log(isError);
	}, [docLabel, isError])

	// Success/Deny Message Modal Close Func
	const handleModalClose = () => {
        setMessageModalOpen(false),
		setSuccess(false),
		window.scrollTo({ top: 0, behavior: 'smooth'})
    }

	// Called on submission
	function resetForm() {
		setCheckVals(initialStateVals)
		console.log(checkVals)
		setRadioSubjectSelectionValue("Other");
		setRadioDateSelectionValue("Next Business Day");
		setIsVerifiedOnSubmit(false);
		setIsError(false);
	}

	// Field Enforcement Checks
	const vetInputs = (xIn) => {
		let checkX = checkVals[xIn].value;
		if(checkX) {
			if(xIn === 'email') {
				if(checkX.length > 0 && !regexComps.reEmail.test(checkX)) {
					return true;
				}
				else return false;
			}
			if(xIn === 'phoneNumber') {
				if(checkX.match(regexComps.rePhone).length > 0 && checkX.match(regexComps.rePhone).length <= 10) {
					return true;
				}
				else return false;
			}
			else {
				if((checkX.length > 0 && checkX.length <= 2) || !regexComps.reNormString.test(checkX)) {
					return true;
				}
				else return false;
			}
		}
		else return null;
	}

	// ////////////////////////////////////////////////
	// Invoke Recaptcha Evaluation
	const handleReCaptchaVerify = useCallback(async () => {
		if(!executeRecaptcha) {
			console.log('Execute recaptcha not yet available');
			return;
		}
		const checkRecaptchaRoute = '/.netlify/functions/recaptchas';
		const token = await executeRecaptcha('submit');

		await axios.post(checkRecaptchaRoute, { 'token': token })
		.then(function(response) {
			console.log('client-recaptcha-status: ', response.statusText)
			setScoreCard(response.data.score * 100);

			if(response.data.score !== 0) {
				scoreCard > 40 && response.data.action === 'submit' && response.data.success
				? setIsVerifiedOnSubmit(true)
				: null; 
			}
			else { window.alert(variousMessages.recaptchaErrorText) }
		})
		.catch(function(error) {
			console.log("client-recaptcha-error-message", error)
			setPostErrorFlag(true);
			setMessageModalOpen(true);
			window.alert(variousMessages.submitErrorText);
		})
	}, [executeRecaptcha, scoreCard]);
	
	// ///////////////////////////////////////////////////
	// Dispatch email-data 
	const handleSubmit = async (event) => {
		event.preventDefault();
		if (!executeRecaptcha) {
			console.log('Execute recaptcha disrupted or delayed');
		}
		else {
			const sendEmailUrl = '/.netlify/functions/sendemail';
			const formattedMessage = checkVals.message.value.replace(reMessage, " ");
			const formattedName = checkVals.fullName.value.trim();
			const templateData = {
				'name': `${formattedName}`,
				'phone': `${checkVals.phoneNumber.value}`,
				'job': `${radioSubjectSelectionValue}`,
				'needBy': `${radioDateSelectionValue.toUpperCase()} from (${formattedCallbackDate})`,
				'text': `${formattedMessage}`,
				'from': `${checkVals.email.value}`,
			};
			await axios.post(sendEmailUrl, templateData)
			.then(function(response) {
				console.log('client-email-success-message: ', response.status);
				setSuccess(true);
				setMessageModalOpen(true);
				resetForm();
			})
			.catch(function(error) {
				console.log('client-email-error: ', error);
				setPostErrorFlag(true);
				setMessageModalOpen(true);
				window.alert(variousMessages.submitErrorText);
			})
		}
	}

	return (
		<ThemeProvider theme={theme}>
			<form 
				className={classes.formStyle} 
				autoComplete="off" 
				onSubmit={(event) => handleSubmit(event)}
				id='quote-form'
				// type='form'
				aria-label="job-quote-form"
				>
				{/* Name */}
				<FormControl style={{width: '100%'}}>
					<TextField 
						required
						InputLabelProps={{classes: {root: classes.label}}}
						id="fullName"
						label="Name"
						type="text"
						aria-label="full-name"
						value={checkVals.fullName.value}
						fullWidth
						variant="outlined"
						margin="normal"
						onChange={handleChange}
						error={vetInputs('fullName')}
						helperText={vetInputs('fullName') ? checkVals.fullName.message : null}
						style={{color: theme.secondary}}
					/>
					{/* Number - incl TextField props */}
					<NumberFormat 
						required
						InputLabelProps={{classes: {root: classes.label}}}
						id="phoneNumber"
						label="Phone Number"
						type="text"
						aria-label='phone-number'
						value={checkVals.phoneNumber.value}
						fullWidth
						variant="outlined"
						margin="normal"
						customInput={TextField}
						format="+1 (###) ###-####"
						mask="_"
						onChange={handleChange}
						error={vetInputs('phoneNumber')}
						helperText={vetInputs('phoneNumber') ? checkVals.phoneNumber.message : null}
						/>
					{/* Email */}
					<TextField 
						required
						InputLabelProps={{classes: {root: classes.label}}}
						id="email"
						label="Email" 
						type="text"
						aria-label="your-email"
						value={checkVals.email.value}
						fullWidth
						variant="outlined"
						margin="normal"      
						onChange={handleChange}
						error={vetInputs('email')}
						helperText={vetInputs('email') ? checkVals.email.message : null}
					/>
				</FormControl>
				{/* Services */}
				<FormControl aria-label="radio-list-form" margin="normal" fullWidth>
					<FormLabel aria-label="subject-radio-list-selection">
						<strong>Subject Matter</strong>
					</FormLabel>
					<RadioGroup 
						row 
						required
						id='radio-selection-group-services'
						type='radio-group'
						aria-label="select-service-radio-buttons" 
						defaultValue="Other"
						name="currentSelection" 
						value={radioSubjectSelectionValue} 
						onChange={(e) => setRadioSubjectSelectionValue(e.target.value)}
						className={ContactFormStyles.radioContainer}
						>
						<FormControlLabel 
							id='radio-button-stairs'
							type='radio-selection'
							value="Stairs"
							aria-label='radio-selection-stairs' 
							control={<Radio color="primary" />} 
							label="Stairs"
							labelPlacement="start"
							className={ContactFormStyles.radiobutton}
						/>
						<FormControlLabel 
							id='radio-button-railing'
							type='radio-selection'
							value="Railing" 
							aria-label='radio-selection-railing'
							control={<Radio color="primary" />} 
							label="Railing" 
							labelPlacement="start"
							className={ContactFormStyles.radiobutton}
						/>
						<FormControlLabel
							id='radio-button-refinishing'
							type='radio-selection'
							value="Refinishing" 
							aria-label='radio-selection-refinishing'
							control={<Radio color="primary" />} 
							label="Refinishing"
							labelPlacement="start"
							className={ContactFormStyles.radiobutton}
						/>
						<FormControlLabel 
							id='radio-button-other'
							type='radio-selection'
							value="Other"
							aria-label='radio-selection-other'
							control={<Radio color="primary" />} 
							label="Other"
							labelPlacement="start"
							className={ContactFormStyles.radiobutton}
						/>
					</RadioGroup>
				</FormControl>
				{/* Date */}
				<FormControl aria-label="date-radios" margin="normal" fullWidth>
					<FormLabel aria-label="date-radio-list-selection">
						<strong>Timeframe You Want A Call Back</strong>
					</FormLabel>
					<RadioGroup 
						row 
						required
						id='radio-selection-group-date'
						type='radio-group'
						aria-label="select-date-radio-buttons" 
						defaultValue="Next Business Day"
						name="dateSelection" 
						value={radioDateSelectionValue} 
						onChange={(e) => setRadioDateSelectionValue(e.target.value)}
						className={ContactFormStyles.radioContainer}
						>
						<FormControlLabel 
							id='radio-button-next-day'
							type='radio-selection'
							value="Next Business Day"
							aria-label='radio-selection-next-business-day'
							control={<Radio color="primary" />} 
							label="1 Business Day"
							labelPlacement="start"
							className={ContactFormStyles.radiobutton}
						/>
						<FormControlLabel 
							id='radio-button-two-business-days'
							type='radio-selection'
							value="2 Business Days" 
							aria-label='radio-selection-two-business-days'
							control={<Radio color="primary" />} 
							label="2 Business Days" 
							labelPlacement="start"
							className={ContactFormStyles.radiobutton}
						/>
						<FormControlLabel
							id='radio-button-three-business-days'
							type='radio-selection'
							value="3 Business Days" 
							aria-label='radio-selection-three-business-days'
							control={<Radio color="primary" />} 
							label="3 Business Days"
							labelPlacement="start"
							className={ContactFormStyles.radiobutton}
						/>
					</RadioGroup>
				</FormControl>
				{/* Message */}
				<FormControl style={{width: '100%'}}>
					<TextField
						required
						InputLabelProps={{classes: {root: classes.label}}}
						id="message"
						label="Message or Other"
						type="text"
						aria-label="your-message"
						value={checkVals.message.value}
						fullWidth 
						variant="outlined"
						margin="normal"
						multiline
						rows={4} 
						autoComplete="none"
						onChange={handleChange}
						error={vetInputs('message')}
						helperText={vetInputs('message') ? checkVals.message.message : null}
					/>
				</FormControl>
				{/* MODAL - Display on successful filling and submission of form data*/}
				<Modal
					open={messageModalOpen}
					onClose={handleModalClose}
					aria-labelledby="modal-title"
					aria-describedby="modal-description"
					>
					<div className={classes.paper}>
						<div className={classes.modalcontainer}>
							<h2 id="modal-title" className={classes.modaltitle}>
								{
									success ? "Message Sent Successfully" : "Uh Oh, There Was An Error!"
								}
							</h2>
							<p id="modal-description" className={classes.modaltext}>
								{
									success ? variousMessages.thankYouMessage(radioDateSelectionValue) : variousMessages.errorMessage
								}
							</p>
							<h4 className={classes.haveGoodDayMsg}>Have a good day!</h4>
							<Button 
								className={ContactFormStyles.bttn}
								type="button" 
								variant="contained"
								aria-label='ok-close-modal-button' 
								onClick={handleModalClose}
								style={{ backgroundColor: 'rgb(145, 71, 22, 0.940)', color: 'white', marginRight: '2px', float: 'right' }}
								size="large"
								>
								Ok
							</Button>
						</div>
					</div>
				</Modal>

				{/* Form Submit Button */}
				<div className={ContactFormStyles.bttncase}>
					<Button 
						className={ContactFormStyles.bttn}
						type="submit" 
						aria-label='submit-information-button'
						variant="contained"
						style={{ backgroundColor: 'rgb(182, 98, 50)', color: 'white', marginRight: '2px', fontSize: '18px' }}
						size="large"
						disabled={isError}
						>
						Submit
					</Button>
				</div>
			</form>
		</ThemeProvider>
	)
}

export default ContactForm;