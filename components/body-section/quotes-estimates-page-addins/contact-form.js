import React, { useState, useRef, useCallback, useEffect } from 'react'

import { MuiPickersUtilsProvider, DateTimePicker } from '@material-ui/pickers';
import EventIcon from '@material-ui/icons/Event';
import DateFnsUtils from '@date-io/date-fns';

import { FormControl, FormControlLabel, FormLabel, RadioGroup, TextField, Radio, Button, useTheme } from '@material-ui/core'
import ContactFormStyles from './contact-form.module.css'
import { makeStyles, createMuiTheme, ThemeProvider } from "@material-ui/core/styles";

// import ReCAPTCHA from 'react-google-recaptcha';
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';
import axios from 'axios';
import NumberFormat from 'react-number-format';


// Styles applied to MUI form inputs - assists and fixes the native label incorrectly displaying
const theme = createMuiTheme({
	palette: { primary: { main: 'rgb(145, 71, 22, 0.940)' }, secondary: { main: 'rgb(56, 56, 56)' } }
})

const useStyles = makeStyles ({
	label: {
		backgroundColor: "white",
		fontSize: '1.1rem',
		border: '4px solid white',
		marginTop: '-7px',
	},
	dateBox: { marginBottom: '1ch' },
	dateWrapper: {
		'&:focus': {
			color: 'rgb(49, 49, 173)',
		}
	}
}); 

// Contact form Component for the Quotes page
function ContactForm() {
	const classes = useStyles();
	const { executeRecaptcha } = useGoogleReCaptcha();

	// Form Inputs
	const [fullName, setFullName] = useState("");
	const [phoneNumber, setPhoneNumber] = useState("");
	const [email, setEmail] = useState("");
	const [radioSelectionValue, setRadioSelectionValue] = useState(null);
	const [dueBy, setDueBy] = useState(new Date());
	const [message, setMessage] = useState("");

	// captcha && form fields throw bool for submission button active/non-active
	const [isVerifiedOnSubmit, setIsVerifiedOnSubmit] = useState(false);
	const [scoreCard, setScoreCard] = useState(0.0);
	const [errorFlag, setErrorFlag] = useState(false);
	const submitErrorText = "Something went wrong. Please try submitting your Quote Request again.";
	const recaptchaErrorText = "The ReCaptcha has detected something strange. Please try again.";

	// Special state for adapt'n for component (date picker -> it's label)
	const [isDateFocused, setDateIsFocused] = useState(false);
	const [isPhoneFocused, setPhoneIsFocused] = useState(false);
	const [isNameFocused, setNameIsFocused] = useState(false);
	const [isEmailFocused, setEmailIsFocused] = useState(false);
 
	// field validators
	const reEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	const rePhone = /[0-9]/g;
	const reName = /^([^0-9]*)$/;
	const reMessage = /[^\t\r\n]/g;

	const checkName = (returnTrueCase, returnFalseCase) => {return (fullName.length >= 2 && fullName.length <= 3 || !reName.test(fullName)) ? returnTrueCase : returnFalseCase}
	const checkPhone = (returnTrueCase, returnFalseCase) => {
		if(phoneNumber === null || phoneNumber === "")
			return false;
		else
			return (phoneNumber.match(rePhone).length > 1 && phoneNumber.match(rePhone).length <= 10) ? returnTrueCase : returnFalseCase;
		}
	const checkEmail = (returnTrueCase, returnueFalseCase) => {
		if(email === null || email === "")
			return false;
		else
			return email.length < 2 ? false : reEmail.test(email) ? returnTrueCase : returnueFalseCase;
	}
	// const checkMessage = (returnTrueCase, returnFalseCase) => {
	// 	if(message === null || message === "") 
	// 		return false;
	// 	else {
	// 		if (message.length > 1)
	// 		{
	// 			return returnFalseCase;
	// 		}
	// 		else {
	// 			if(reMessage.test(message) === true) {
	// 				message.replace(reMessage, " ");
	// 				return returnTrueCase;
	// 			}
	// 			else return returnFalseCase;
	// 		}
			// return message.length < 1 
			// ? returnFalseCase
			// : reMessage.test(message) === true 
			// ? message.replace(reMessage, " ")
			// : message 
	// 	}
	// }

	const resetForm = () => {
		setFullName("");
		setPhoneNumber("");
		setEmail("");
		setRadioSelectionValue(null);
		setDueBy(new Date());
		setMessage("");
		setIsVerifiedOnSubmit(false);
	}
	const formatCallbackDateAndTime = (dueBy) => {
		const dateString = dueBy.toString(); // Sets the date to a string to parse out
		const callBackDate = dateString.substring(0,15); // Dayofweek Month day year (Ex: Monday Jan 30 2022)
		const callBackTime = dateString.toString().substring(16,24); // time converted to standard time -skip GMT-xxxxx- 
		const callBackTimezone = dateString.substring(34); // then the suffix time zone
		return `${callBackDate} @ ${callBackTime} ${callBackTimezone}`;
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
	},[executeRecaptcha, scoreCard]);

	// Evaluate on page load
	useEffect(() => {
		handleReCaptchaVerify();
	  }, [handleReCaptchaVerify]);


	// Dispatch email-data 
	const handleSubmit = async (event) => {
		// event.preventDefault();

		if (!executeRecaptcha) {
			console.log('Execute recaptcha not yet available');
		}
		else {
			const sendEmailUrl = '/.netlify/functions/sendemail';
			const formattedCallbackDateTime = formatCallbackDateAndTime(dueBy);
			const formattedName = fullName.trim();
			
			const templateData = {
				'name': `${formattedName}`,
				'phone': `${phoneNumber}`,
				'job': `${radioSelectionValue}`,
				'needBy': `${formattedCallbackDateTime}`,
				'text': `${message}`,
				'from': `${email}`,
			};

			const sendDatData = await axios.post(sendEmailUrl, templateData)
			.then(function(response) {
				console.log('client-email-success-message: ', response.data.message, response.status);
				window.alert("Thank you for your getting in touch with us! We will get back to you on the date you've provided.");
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
					onSubmit={(event) => handleSubmit(event)}>
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
					{/* includes TextField props - has mask, verify, enforcement */}
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
					<FormControl aria-label="radio-list-form" margin="normal" fullWidth>
						<FormLabel aria-label="subject-radio-list-selection">Subject Matter</FormLabel>
							<RadioGroup 
								row 
								aria-label="select-service-radio-buttons" 
								defaultValue={radioSelectionValue}
								name="currentSelection" 
								value={radioSelectionValue} 
								required
								onChange={(e) => setRadioSelectionValue(e.target.value)}
								className={ContactFormStyles.radioContainer}
								>
								<FormControlLabel 
									value="stairs" 
									control={<Radio color="primary" />} 
									label="Stairs"
									labelPlacement="start"
									className={ContactFormStyles.radiobutton}
								/>
								<FormControlLabel 
									value="railing" 
									control={<Radio color="primary" />} 
									label="Railing" 
									labelPlacement="start"
									className={ContactFormStyles.radiobutton}
								/>
								<FormControlLabel 
									value="refinishing" 
									control={<Radio color="primary" />} 
									label="Refinishing"
									labelPlacement="start"
									className={ContactFormStyles.radiobutton}
								/>
								<FormControlLabel 
									value="other" 
									control={<Radio color="primary" />} 
									label="Other"
									labelPlacement="start"
									className={ContactFormStyles.radiobutton}
								/>
							</RadioGroup>
					</FormControl>
					<div className={classes.dateWrapper}>
						<FormLabel 
							id="#date-input" 
							style={{
								display: 'flex',
								flexDirection: 'column',
								width: 'fit-content',
								margin: '1ch 0 2ch',
							}}
							for="dateField"
							focused={isDateFocused}
							className={classes.inputLabelBox}
						>
							When Would You Like a Call Back?
						</FormLabel>
						<DateTimePicker
							required
							onFocus={() => setDateIsFocused(true)}
							onBlur={() => setDateIsFocused(false)}
							name="datefield"
							id="#dateid"
							disablePast
							value={dueBy} 
							minutesStep={5}
							inputVariant="outlined"
							className={classes.dateBox}
							onChange={(date) => setDueBy(date)}
							InputProps={{ endAdornment: (<EventIcon />) }}
						/>
					</div>
					<TextField
						required
						InputLabelProps={{classes: {root: classes.label}}}
						id="message"
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
						// error={checkMessage(true, false)}
						// helperText={checkPhone("Please enter a message regarding your quote.", null)}
						onChange={(e) => setMessage(e.target.value)}
					/>

					<div className={ContactFormStyles.bttncase}>
						<Button 
							className={ContactFormStyles.bttn}
							type="submit" 
							variant="contained"
							style={{ backgroundColor: 'rgb(145, 71, 22, 0.940)', color: 'white', marginRight: '2px' }}
							// color="primary" 
							size="large"
							disabled={!isVerifiedOnSubmit}
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