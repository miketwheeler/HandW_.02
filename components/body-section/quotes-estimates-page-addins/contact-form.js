import React, { useState, useRef, useCallback, useEffect } from 'react'
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import { FormControl, FormControlLabel, FormLabel, RadioGroup, TextField, Radio, Button } from '@material-ui/core'
import ContactFormStyles from './contact-form.module.css'
import { makeStyles, createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';
import axios from 'axios';
import NumberFormat from 'react-number-format';
import Modal from '@material-ui/core/Modal';


// Styles applied to MUI form inputs - assists and fixes the native label incorrectly displaying
const theme = createMuiTheme({
	palette: { primary: { main: 'rgb(182, 98, 50)' }, secondary: { main: 'rgb(56, 56, 56)' } }
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
        backgroundColor: '#1f1f1f',
        color: 'white',
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
		left: '50%',
		top: '50%',
		transform: 'translate(-50%, -50%)',
        padding: theme.spacing(2, 4, 3),
    },
});

// Contact form Component for the Quotes page
function ContactForm() {
	const classes = useStyles();
	const { executeRecaptcha } = useGoogleReCaptcha();
	// const { recaptchaRef } = useRef();

	// Form Fields
	const [fullName, setFullName] = useState("");
	const [phoneNumber, setPhoneNumber] = useState("");
	const [email, setEmail] = useState("");
	const [radioSelectionValue, setRadioSelectionValue] = useState("Other");
	const [radioDateSelectionValue, setRadioDateSelectionValue] = useState("Next Business Day");
	const [dueBy, setDueBy] = useState(new Date());

	// Modal & Error Messages
	const [message, setMessage] = useState("");
	const [success, setSuccess] = useState(false);
    const [modalOpen, setModalOpen] = useState(modalOpen ? modalOpen : false);

	// captcha && form fields throw bool for submission button active/non-active
	const [isVerifiedOnSubmit, setIsVerifiedOnSubmit] = useState(false);
	const [scoreCard, setScoreCard] = useState(0.0);
	const [errorFlag, setErrorFlag] = useState(false);
	const submitErrorText = "Something went wrong. Please try submitting your Quote Request again.";
	const recaptchaErrorText = "The ReCaptcha has detected something strange. Please try again.";
	const thankYouMessage = `Thank you for your getting in touch with us! We will get back to you on: ${radioDateSelectionValue}.`;

	// Special state for adapt'n for component (date picker -> it's label)
	const [isPhoneFocused, setPhoneIsFocused] = useState(false);
	const [isNameFocused, setNameIsFocused] = useState(false);
	const [isEmailFocused, setEmailIsFocused] = useState(false);
	const [isMessageFocused, setMessageIsFocused] = useState(false);
 
	// Re-Validators
	const reEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	const rePhone = /[0-9]/g;
	const reName = /^([^0-9]*)$/;
	const reMessage = /([\n\r\t])/g;
	
	// Modal Close
	const handleModalClose = () => {
        setModalOpen(false),
		setSuccess(false),
		window.scrollTo({ top: 0, behavior: 'smooth'})
    }

	// field enforcement
	const checkName = (returnTrueCase, returnFalseCase) => {return (fullName.length >= 2 && fullName.length <= 3 || !reName.test(fullName)) ? returnTrueCase : returnFalseCase}
	const checkPhone = (returnTrueCase, returnFalseCase) => {
		if(phoneNumber === null || phoneNumber === "")
			return false;
		else
			return (phoneNumber.match(rePhone).length > 1 && phoneNumber.match(rePhone).length <= 10) ? returnTrueCase : returnFalseCase;
		}
	const checkEmail = (returnTrueCase, returnFalseCase) => {
		if(email === null || email === "")
			return false;
		else
			return email.length < 2 ? false : reEmail.test(email) ? returnTrueCase : returnFalseCase;
		}
	const checkMessage = (returnTrueCase, returnFalseCase) => {
		if(message === null || message === "") 
			return false;
		else
			return message.length > 2 ? returnFalseCase : returnTrueCase;
		}
	const resetForm = () => {
		setFullName("");
		setPhoneNumber("");
		setEmail("");
		setRadioSelectionValue("Other");
		setDueBy(new Date());
		setRadioDateSelectionValue("Next Business Day");
		setMessage("");
		setIsVerifiedOnSubmit(false);
	}
	const formatCallbackDateAndTime = (date) => {
		const dateString = date.toString(); // Sets the date to a string to parse
		const callBackDate = dateString.substring(0,15); // Dayofweek Month day year (Ex: Monday Jan 30 2022)
		const callBackTime = dateString.toString().substring(16,24); // time converted to standard time -skip GMT-xxxxx- 
		const callBackTimezone = dateString.substring(34); // then the suffix time zone
		return `${callBackDate} ${callBackTime} ${callBackTimezone}`;
	}

	// Invoke Recaptcha evaluation
	const handleReCaptchaVerify = useCallback(async () => {
		if(!executeRecaptcha) {
			console.log('Execute recaptcha not yet available');
			return;
		}
		// const checkDate = new Date().toISOString();
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
			setErrorFlag(true);
			window.alert(submitErrorText);
		})
	}, [executeRecaptcha, scoreCard]);

	// Evals on page load -- need to min this to var <onActivelyTypingOnForm>
	useEffect(() => {
		if(executeRecaptcha)
			handleReCaptchaVerify();
	  }, [executeRecaptcha, handleReCaptchaVerify]);
	
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
				'job': `${radioSelectionValue}`,
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
				setErrorFlag(true);
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
					>
					
					{/* Full Name */}
					<TextField 
						onFocus={() => setNameIsFocused(true)}
						onBlur={() => setNameIsFocused(false)}
						InputLabelProps={{classes: {root: classes.label}}}
						type="text"
						label="Name" 
						value={fullName}
						required
						fullWidth
						variant="outlined"
						margin="normal"
						autoComplete="true"
						onChange={(e) => setFullName(e.target.value)}
						error={fullName !== null ? checkName(true, false) : false}
						helperText={checkName("Please provide a valid contact name.",  null)}
						style={{color: theme.secondary}}
					/>
					
					{/* Phone Number - includes TextField props - has mask, verify, enforcement */}
					<NumberFormat 
						InputLabelProps={{classes: {root: classes.label}}}
						label="Phone Number" 
						value={phoneNumber}
						required
						fullWidth
						variant="outlined"
						margin="normal"
						autoComplete="true"
						customInput={TextField}
						format="+1 (###) ###-####"
						mask="_"
						allowEmptyFormatting={ isPhoneFocused ? true : false }					
						onChange={(e) => setPhoneNumber(e.target.value)}
						error={checkPhone(true, false)}
						helperText={checkPhone("Please enter a valid Phone Number.", null)}
					/>

					{/* Email */}
					<TextField 
						InputLabelProps={{classes: {root: classes.label}}}
						label="Email" 
						value={email}
						required
						fullWidth
						width="500"
						variant="outlined"
						margin="normal"      
						autoComplete="true"
						onChange={(e) => setEmail(e.target.value)}
						error={email !== null ? checkEmail(false, true) : false}
						helperText={checkEmail(null, "Please enter a valid Email Address.")}
					/>

					{/* Services */}
					<FormControl aria-label="radio-list-form" margin="normal" fullWidth>
						<FormLabel aria-label="subject-radio-list-selection">
							<strong>Subject Matter</strong>
						</FormLabel>
						<RadioGroup 
							row 
							aria-label="select-service-radio-buttons" 
							defaultValue="Other"
							name="currentSelection" 
							value={radioSelectionValue} 
							onChange={(e) => setRadioSelectionValue(e.target.value)}
							className={ContactFormStyles.radioContainer}
							>
							<FormControlLabel 
								value="Stairs" 
								control={<Radio color="primary" />} 
								label="Stairs"
								labelPlacement="start"
								className={ContactFormStyles.radiobutton}
							/>
							<FormControlLabel 
								value="Railing" 
								control={<Radio color="primary" />} 
								label="Railing" 
								labelPlacement="start"
								className={ContactFormStyles.radiobutton}
							/>
							<FormControlLabel
								value="Refinishing" 
								control={<Radio color="primary" />} 
								label="Refinishing"
								labelPlacement="start"
								className={ContactFormStyles.radiobutton}
							/>
							<FormControlLabel 
								value="Other"
								control={<Radio color="primary" />} 
								label="Other"
								labelPlacement="start"
								className={ContactFormStyles.radiobutton}
							/>
						</RadioGroup>
					</FormControl>

					{/* DATE */}
					<FormControl aria-label="date-radios" margin="normal" fullWidth>
						<FormLabel aria-label="date-radio-list-selection">
							<strong>Timeframe You Want A Call Back</strong>
						</FormLabel>
						<RadioGroup 
							row 
							aria-label="select-date-radio-buttons" 
							defaultValue="Next Business Day"
							name="dateSelection" 
							value={radioDateSelectionValue} 
							onChange={(e) => setRadioDateSelectionValue(e.target.value)}
							className={ContactFormStyles.radioContainer}
							>
							<FormControlLabel 
								value="Next Business Day" 
								control={<Radio color="primary" />} 
								label="Next Business Day"
								labelPlacement="start"
								className={ContactFormStyles.radiobutton}
							/>
							<FormControlLabel 
								value="2 Business Days" 
								control={<Radio color="primary" />} 
								label="2 Business Days" 
								labelPlacement="start"
								className={ContactFormStyles.radiobutton}
							/>
							<FormControlLabel
								value="3 Business Days" 
								control={<Radio color="primary" />} 
								label="3 Business Days"
								labelPlacement="start"
								className={ContactFormStyles.radiobutton}
							/>
						</RadioGroup>
					</FormControl>

					{/* Message */}
					<FormControl style={{width: '100%'}}>
						<FormLabel aria-label="message-form" focused={isMessageFocused}>
							<strong>Leave us some input on your needs</strong>
						</FormLabel>
						<TextField
							required
							onFocus={() => setMessageIsFocused(true)}
							onBlur={() => setMessageIsFocused(false)}
							InputLabelProps={{classes: {root: classes.label}}}
							id="#message"
							label="Message"
							input='message'
							type="text"
							value={message}
							fullWidth 
							variant="outlined"
							margin="normal"
							multiline
							rows={4} 
							autoComplete="none"
							error={checkMessage(true, false)}
							helperText={checkMessage("Please enter a message regarding your quote.", null)}
							onChange={(e) => setMessage(e.target.value)}
						/>
					</FormControl>

					{/* MODAL */}
					<Modal
						open={modalOpen}
						onClose={handleModalClose}
						aria-labelledby="simple-modal-title"
						aria-describedby="simple-modal-description"
						>
						<div className={classes.paper}>
							<h2 id="simple-modal-title">Message Sent</h2>
							<p id="simple-modal-description" style={{margin: '26px 0px'}}>
								{thankYouMessage}
							</p>
						
							<Button 
								className={ContactFormStyles.bttn}
								type="button" 
								variant="contained" 
								onClick={handleModalClose}
								style={{ backgroundColor: 'rgb(145, 71, 22, 0.940)', color: 'white', marginRight: '2px', float: 'right' }}
								size="large"
								>
								Ok
							</Button>
						</div>
					</Modal>

					{/* Form Submit Button */}
					<div className={ContactFormStyles.bttncase}>
						<Button 
							className={ContactFormStyles.bttn}
							type="submit" 
							variant="contained"
							style={{ backgroundColor: 'rgb(182, 98, 50)', color: 'white', marginRight: '2px' }}
							size="large"
							disabled={!isVerifiedOnSubmit && errorFlag }
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