import React, { useState, useRef, useCallback, useEffect } from 'react'
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import { FormControl, FormControlLabel, FormLabel, RadioGroup, TextField, Radio, Button } from '@material-ui/core'
import ContactFormStyles from './contact-form.module.css'
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
	modalcontainer: {
		margin: 30,
		// padding: 20,
	},
	modaltitle: {
		marginBottom: 30,
	},
	modaltext: {
		height: '30%',
		fontSize: 28,
	},
	gudday: {
		marginBottom: 40, 
	}
});


// Contact form Component for the Quotes page
function ContactForm() {
	const classes = useStyles();
	const { executeRecaptcha } = useGoogleReCaptcha();
	// TODO: on recaptcha error - reset api call to endpoint
	// const { recaptchaRef } = useRef();

	// Form Fields
	const [fullName, setFullName] = useState("");
	const [phoneNumber, setPhoneNumber] = useState("");
	const [email, setEmail] = useState("");
	const [radioSubjectSelectionValue, setRadioSubjectSelectionValue] = useState("Other");
	const [radioDateSelectionValue, setRadioDateSelectionValue] = useState("Next Business Day");
	const [message, setMessage] = useState("");

	// Modal & Error Messages
	const [success, setSuccess] = useState(false);
    const [modalOpen, setModalOpen] = useState(modalOpen ? modalOpen : false);

	// captcha && form fields throw bool for submission button active/non-active
	const [scoreCard, setScoreCard] = useState(0.0);
	const [isVerifiedOnSubmit, setIsVerifiedOnSubmit] = useState(true);
	const [postErrorFlag, setPostErrorFlag] = useState(false);

	// Error Messages
	const submitErrorText = "Something went wrong. Please try submitting your Quote Request again.";
	const recaptchaErrorText = "The ReCaptcha has detected something strange. Please try again.";
	const thankYouMessage = (date) => {
		return `Thank you for your getting in touch with us! We will get back to you by 6:00pm PST within now and your callback range.`;
	}
	const errorMessage = `There was an error with your information submission. Please try again.`;

	// Regex Validation
	const reName = /^([^0-9]*)$/;
	const rePhone = /[0-9]/g;
	const reEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	const reMessage = /([\n\r\t])/g;
	
	// Formats current date
	const formatCallbackDateAndTime = (date) => {
		const dateString = date.toString(); // Sets the date to a string to parse
		const callBackDate = dateString.substring(0,15); // Dayofweek Month day year (Ex: Monday Jan 30 2022)
		const callBackTime = dateString.toString().substring(16,24); // time converted to standard time -skip GMT-xxxxx- 
		const callBackTimezone = dateString.substring(34); // then the suffix time zone
		return `${callBackDate} ${callBackTime} ${callBackTimezone}`;
	}

	// Final Check for submit button engage/disengage
	function isCheckedReadyForSubmitUnlock() {
		if(!checkName() && !checkPhone() && !checkMessage())
			return false;
		else
			return true;
	}
	
	// Evals on page load -- need to min this to var <onActivelyTypingOnForm>
	useEffect(() => {
		if(executeRecaptcha)
			handleReCaptchaVerify();
	  }, [executeRecaptcha, handleReCaptchaVerify]);

	// Modal Close
	const handleModalClose = () => {
        setModalOpen(false),
		setSuccess(false),
		window.scrollTo({ top: 0, behavior: 'smooth'})
    }

	// On success submit - sets all fields back to default
	const resetForm = () => {
		setFullName("");
		setPhoneNumber("");
		setEmail("");
		setRadioSubjectSelectionValue("Other");
		setRadioDateSelectionValue("Next Business Day");
		setMessage("");
		setIsVerifiedOnSubmit(false);
	}

	// /////////////////////////////////////////////////
	// Field Enforcement Checks
	const checkName = () => {
		return ((fullName.length >= 1 && fullName.length <= 2 )|| !reName.test(fullName)) ? true : false
	}
	const checkPhone = () => {
		if(phoneNumber === null || phoneNumber === "")
			return false;
		else
			return (phoneNumber.match(rePhone).length > 1 && phoneNumber.match(rePhone).length <= 10) ? true : false;
	}
	const checkEmail = () => {
		if(email === null || email === "") {
			return false;
		}
		else {
			return email.length < 2 ? true : reEmail.test(email) ? false : true;
		}
	}
	const checkMessage = () => {
		if(message === null || message === "") {
			return false;
		}
		else {
			return message.length > 2 ? false : true;
		}
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
			else { window.alert(recaptchaErrorText) }
		})
		.catch(function(error) {
			console.log("client-recaptcha-error-message", error)
			setPostErrorFlag(true);
			setModalOpen(true);
			window.alert(submitErrorText);
		})
	}, [executeRecaptcha, scoreCard]);
	
	// ///////////////////////////////////////////////////
	// Dispatch email-data 
	const handleSubmit = async (event) => {
		event.preventDefault();
		if (!executeRecaptcha) {
			console.log('Execute recaptcha not yet available');
		}
		
		else {
			const sendEmailUrl = '/.netlify/functions/sendemail';
			const formattedMessage = message.replace(reMessage, " ");
			const formattedName = fullName.trim();
			
			const templateData = {
				'name': `${formattedName}`,
				'phone': `${phoneNumber}`,
				'job': `${radioSubjectSelectionValue}`,
				'needBy': `${radioDateSelectionValue.toUpperCase()} from (${formatCallbackDateAndTime(new Date())})`,
				'text': `${formattedMessage}`,
				'from': `${email}`,
			};

			await axios.post(sendEmailUrl, templateData)
			.then(function(response) {
				console.log('client-email-success-message: ', response.data.message, response.status);
				setSuccess(true);
				setModalOpen(true);
				// recaptchaRef.current.reset();
				resetForm();
			})
			.catch(function(error) {
				console.log('client-email-error: ', error);
				setPostErrorFlag(true);
				setModalOpen(true);
				window.alert(submitErrorText);
			})
		}
	}

	return (
		<ThemeProvider theme={theme}>
			<MuiPickersUtilsProvider utils={DateFnsUtils}>
				<form 
					className={ContactFormStyles.form} 
					autoComplete="off" 
					onSubmit={(event) => handleSubmit(event)}
					id='quote-form'
					type='form'
					aria-label="quote-form"
					>
					{/* Name */}
					<TextField 
						InputLabelProps={{classes: {root: classes.label}}}
						id='full-name'
						type="textfield"
						label="Name"
						aria-label="full-name"
						value={fullName}
						required
						fullWidth
						variant="outlined"
						margin="normal"
						autoComplete="true"
						onChange={(e) => setFullName(e.target.value)}
						error={fullName !== null ? checkName() : false}
						helperText={checkName() ? "Please provide a valid contact name." :  null}
						style={{color: theme.secondary}}
						
					/>
					{/* Number - incl TextField props */}
					<NumberFormat 
						InputLabelProps={{classes: {root: classes.label}}}
						id='phone-number'
						type='textfield'
						label="Phone Number"
						aria-label='phone-number'
						value={phoneNumber}
						required
						fullWidth
						variant="outlined"
						margin="normal"
						autoComplete="true"
						customInput={TextField}
						format="+1 (###) ###-####"
						mask="_"
						onChange={(e) => setPhoneNumber(e.target.value)}
						error={checkPhone()}
						helperText={checkPhone() ? "Please enter a valid Phone Number." : null}
					/>
					{/* Email */}
					<TextField 
						InputLabelProps={{classes: {root: classes.label}}}
						id='email'
						type='textfield'
						label="Email" 
						aria-label='email'
						value={email}
						required
						fullWidth
						width="500"
						variant="outlined"
						margin="normal"      
						autoComplete="true"
						onChange={(e) => setEmail(e.target.value)}
						error={checkEmail()}
						helperText={checkEmail() ? "Please enter a valid Email Address." : null}
					/>
					{/* Services */}
					<FormControl aria-label="radio-list-form" margin="normal" fullWidth>
						<FormLabel aria-label="subject-radio-list-selection">
							<strong>Subject Matter</strong>
						</FormLabel>
						<RadioGroup 
							row 
							required
							id='radio-selection-group-service-type'
							type='radio-group'
							aria-label="select-service-radio-buttons" 
							defaultValue="Other"
							name="currentSelection" 
							value={radioSubjectSelectionValue} 
							onChange={(e) => setRadioSubjectSelectionValue(e.target.value)}
							className={ContactFormStyles.radioContainer}
							>
							<FormControlLabel 
								id='radio-button-value-stairs'
								type='radio-selection'
								value="Stairs"
								aria-label='radio-service-selection-value-stairs' 
								control={<Radio color="primary" />} 
								label="Stairs"
								labelPlacement="start"
								className={ContactFormStyles.radiobutton}
							/>
							<FormControlLabel 
								id='radio-button-value-railing'
								type='radio-selection'
								value="Railing" 
								aria-label='radio-service-selection-value-railing'
								control={<Radio color="primary" />} 
								label="Railing" 
								labelPlacement="start"
								className={ContactFormStyles.radiobutton}
							/>
							<FormControlLabel
								id='radio-button-value-refinishing'
								type='radio-selection'
								value="Refinishing" 
								aria-label='radio-service-selection-value-refinishing'
								control={<Radio color="primary" />} 
								label="Refinishing"
								labelPlacement="start"
								className={ContactFormStyles.radiobutton}
							/>
							<FormControlLabel 
								id='radio-button-value-other'
								type='radio-selection'
								value="Other"
								aria-label='radio-service-selection-value-other'
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
								id='radio-button-value-next-day'
								type='radio-selection'
								value="Next Business Day"
								aria-label='radio-callback-date-selection-value-next-business-day'
								control={<Radio color="primary" />} 
								label="Next Business Day"
								labelPlacement="start"
								className={ContactFormStyles.radiobutton}
							/>
							<FormControlLabel 
								id='radio-button-value-two-business-days'
								type='radio-selection'
								value="2 Business Days" 
								aria-label='radio-callback-date-selection-value-two-business-days'
								control={<Radio color="primary" />} 
								label="2 Business Days" 
								labelPlacement="start"
								className={ContactFormStyles.radiobutton}
							/>
							<FormControlLabel
								id='radio-button-value-three-business-days'
								type='radio-selection'
								value="3 Business Days" 
								aria-label='radio-callback-date-selection-value-three-business-days'
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
							label="Message or Any Other Specifics"
							input='message'
							type="text"
							aria-label='your-message'
							value={message}
							fullWidth 
							variant="outlined"
							margin="normal"
							multiline
							rows={4} 
							autoComplete="none"
							error={checkMessage()}
							helperText={checkMessage() ? "Please enter a message regarding your quote." : null}
							onChange={(e) => setMessage(e.target.value)}
						/>
					</FormControl>
					{/* MODAL - Display on successful filling and submission of form data*/}
					<Modal
						open={modalOpen}
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
										success ? thankYouMessage(radioDateSelectionValue) : errorMessage
									}
								</p>
								<h4 className={classes.gudday}>Have a good one!</h4>
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
							disabled={isVerifiedOnSubmit && isCheckedReadyForSubmitUnlock()}
							>
							Submit
						</Button>
					</div>
				</form>
			</MuiPickersUtilsProvider>
		</ThemeProvider>
	)
}

export default ContactForm;