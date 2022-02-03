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
	palette: {
		primary: { main: 'rgb(145, 71, 22, 0.940)' },
		secondary: { main: 'rgb(56, 56, 56)' }
	}
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

	// captcha && form fields throw bool
	const [isVerifiedOnSubmit, setIsVerifiedOnSubmit] = useState(false);

	// Special state for adapt'n for component (date picker -> it's label)
	const [isDateFocused, setDateIsFocused] = useState(false);
	const [isPhoneFocused, setPhoneIsFocused] = useState(false);
	const [isNameFocused, setNameIsFocused] = useState(false);
	const [isEmailFocused, setEmailIsFocused] = useState(false);
 
	// validators
	const reEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	const rePhone = /[0-9]/g;
	const reName = /^([^0-9]*)$/;
	// const compareDate = new Date();

	const checkName = (returnValTrueCase, returnValFalseCase) => {
		return (fullName.length >= 2 && fullName.length <= 3 || !reName.test(fullName)) ? returnValTrueCase : returnValFalseCase;
	}
	const checkPhone = (returnValTrueCase, returnValFalseCase) => {
		if(phoneNumber === null || phoneNumber === "")
			return false;
		else
			return (phoneNumber.match(rePhone).length > 1 && phoneNumber.match(rePhone).length <= 10) ? returnValTrueCase : returnValFalseCase;
	}
	const checkEmail = (returnValTrueCase, returnValueFalseCase) => {
		if(email === null || email === "")
			return false;
		else
			return email.length < 2 ? false : reEmail.test(email) ? returnValTrueCase : returnValueFalseCase;
	}
	
	const resetForm = () => {
		setFullName("");
		setPhoneNumber("");
		setEmail("");
		setRadioSelectionValue(null);
		setDueBy(new Date());
		setMessage("");
		setIsVerifiedOnSubmit(false);
	}

	const formatCallbackDate = (dueBy) => {
		const dateString = dueBy.toString(); // Sets the date to a string to parse out
		const callBackDate = dateString.substring(0,15); // Dayofweek Month day year (Ex: Monday Jan 30 2022)
		const callBackTime = dateString.toString().substring(16,24); // time converted to standard time -skip GMT-xxxxx- 
		const callBackTimezone = dateString.substring(34); // then the suffix time zone
		return `Call Back Client: ${callBackDate} @ ${callBackTime} ${callBackTimezone}`;
	}

	function submitme(event) {
		event.preventDefault();
		// if (executeRecaptcha) {
			handleSubmit();
		// }
	};

	const handleSubmit = async () => {
		if (!executeRecaptcha) {
			console.log('Execute recaptcha not yet available');
		}
		const token = await executeRecaptcha('submit');
		const timestamp = new Date().toUTCString();
		const formattedCallbackDateTime = formatCallbackDate(dueBy);
		const formattedName = fullName.trim();
		const templateData = {
			'name': `${formattedName}`,
			'phone': `${phoneNumber}`,
			'job': `${radioSelectionValue}`,
			'needBy': `${formattedCallbackDateTime}`,
			'text': `${message}`,
			'from': `${email}`,
		}
		const request = new XMLHttpRequest();
		request.open("POST", '/.netlify/functions/sendemail')
		request.send(JSON.stringify(templateData))
	}


	// const dispatchAlert = (message) => {
	// 	message !== "success"
	// 	? 
	// 	alert(`Whoops! The ${message} was not successfully added or something else went wrong. Please try again!`)
	// 	:
	// 	alert(`Success! Thank you for contacting us! We will get back to you ASAP.`)
	// }

	// const submitMe = (event) => {
	// 	event.preventDefault();
	// 	const formattedCallbackString = formatCallbackDate(dueBy);
	// 	const formattedName = fullName.trim();

	// 	//  IF SUCCESS ****
	// 	// dispatchAlert("success");
	// 	// sendemail(fullName, phoneNumber, radioSelectionValue, dueBy, message, email);

	// 	// FINAL STEP ESET CAPTCHA AND FORM FIELDS
	// 	recaptchaRef.current.reset();
	// 	console.log(formattedName, phoneNumber, radioSelectionValue, `${formattedCallbackString}`, message, email); // See the passed vals
	// 	resetForm();
	// }

	return (
		<ThemeProvider theme={theme}>
			<MuiPickersUtilsProvider utils={DateFnsUtils}>
				<form className={ContactFormStyles.form} autoComplete="off" onSubmit={submitme}>
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
						label="My Message"
						input='My Message'
						type="text"
						fullWidth 
						variant="outlined"
						margin="normal"
						multiline 
						rows={3} 
						autoComplete="none"
						onChange={(e) => setMessage(e.target.value)}
						value={message}
					/>
					<div className={ContactFormStyles.captchaRow}>
					{/* <ReCAPTCHA 
						// Import Actual public key just like below \/
						// sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}
						sitekey={process.env.NEXT_PUBLIC_TESTRECAPTCHA_SITE_KEY}
						onChange={onCaptchaHandler}
						onExpired={onCaptchaExpirationHandler}
						theme="light"
						ref={recaptchaRef}
						/> */}
					</div>
					<div className={ContactFormStyles.bttncase}>
						<Button 
							className={ContactFormStyles.bttn}
							type="submit" 
							variant="contained"
							style={{ backgroundColor: 'rgb(145, 71, 22, 0.940)', color: 'white', marginRight: '2px' }}
							// color="primary" 
							size="large"
							// disabled={!isVerifiedOnSubmit}
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