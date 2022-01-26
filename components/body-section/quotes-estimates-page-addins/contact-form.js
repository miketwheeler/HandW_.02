import React, { useState, useRef } from 'react'
import { 
	FormControl, 
	FormControlLabel, 
	FormLabel, 
	RadioGroup, 
	TextField, 
	Radio, 
	Button,
} from '@material-ui/core'
import ContactFormStyles from './contact-form.module.css'
import { makeStyles } from "@material-ui/core/styles";
import ReCAPTCHA from 'react-google-recaptcha';
import sendemail from '../../hooks/sendemail.js';
import NumberFormat from 'react-number-format';

// Styles applied to MUI form inputs - assists and fixes the native label incorrectly displaying
const useStyles = makeStyles ({
	label: {
		backgroundColor: "white",
		fontSize: '1.1rem',
		border: '4px solid white',
		marginTop: '-7px',
	},
	dateBox: {
		marginBottom: '1ch',
	},
	dateWrapper: {
		'&:focus': {
			color: 'rgb(49, 49, 173)',
		}
	}
}); 

// Contact form Component for the Quotes page
function ContactForm() {
	const classes = useStyles();
	const recaptchaRef = useRef();
	const numberRef = useRef();

	// Form Inputs
	const [fullName, setFullName] = useState("");
	const [phoneNumber, setPhoneNumber] = useState("");
	const [email, setEmail] = useState("");
	const [radioSelectionValue, setRadioSelectionValue] = useState(null);
	const [dueBy, setDueBy] = useState("");
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
	const compareDate = new Date()

	const checkName = (returnValTrueCase, returnValFalseCase) => {
		return (fullName.length >= 2 && fullName.length <= 3 || !reName.test(fullName)) ? returnValTrueCase : returnValFalseCase;
	}
	const checkPhone = (returnValTrueCase, returnValFalseCase) => {
		console.log(phoneNumber);
		return !phoneNumber === null || (phoneNumber.match(rePhone).length > 1 && phoneNumber.match(rePhone).length <= 10) ? returnValTrueCase : returnValFalseCase;
	}
	const checkEmail = (returnValFalseCase, returnValueTrueCase) => {
		return email.length < 2 ? false : reEmail.test(email) ? returnValFalseCase : returnValueTrueCase;
	}


	const resetForm = () => {
		setFullName("");
		setPhoneNumber("");
		setEmail("");
		setRadioSelectionValue(null);
		setDueBy("");
		setMessage("");
		setIsVerifiedOnSubmit(false);
	}

	const onCaptchaHandler = (value) => {
		console.log("Captcha value:", value);
		setIsVerifiedOnSubmit(true);
	}
	const onCaptchaExpirationHandler = () => {
		setIsVerifiedOnSubmit(false);
	}


	const dispatchAlert = (message) => {
		message !== "success"
		? 
		alert(`Whoops! The ${message} was not successfully added or something else went wrong. Please try again!`)
		:
		alert(`Success! Thank you for contacting us! We will get back to you ASAP.`)
	}

	const submitMe = (event) => {
		event.preventDefault();

		//  ON SUBMIT __ NEED TO String.trim() the full name to lob off preceed/proceed spaces
		
		//  IF SUCCESS ****
		dispatchAlert("success");
		sendemail(fullName, phoneNumber, radioSelectionValue, dueBy, message, email);

		// AND IF FAILURE ****
		// dispatchAlert("DATE");  <-- pass in var-field to notify & don't reset form or submit, re-eval captcha

		// FINAL STEP ESET CAPTCHA AND FORM FIELDS
		recaptchaRef.current.reset();
		console.log(fullName, phoneNumber, radioSelectionValue, dueBy, message, email); // See the passed vals
		resetForm();
	}

	return (
		<form className={ContactFormStyles.form} autoComplete="off" onSubmit={submitMe}>
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
				error={checkName(true, false)}
				helperText={checkName("Please provide a valid contact name.",  null)}
				/>
			<NumberFormat 
				onFocus={() => setPhoneIsFocused(true)}
				onBlur={() => setPhoneIsFocused(false)}
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
				allowEmptyFormatting
				onChange={(e) => setPhoneNumber(e.target.value)}
				error={checkPhone(true, false)}
				helperText={checkPhone("Please enter a valid Phone Number.", null)}
			/>
			<TextField 
				onFocus={() => setEmailIsFocused(true)}
				onBlur={() => setEmailIsFocused(false)}
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
				error={checkEmail(false, true)}
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
				<TextField
					// InputLabelProps={{ shrink: true }}
					onFocus={() => setDateIsFocused(true)}
					onBlur={() => setDateIsFocused(false)}
					name="dateField"
					id="#dateid"
					type="date"
					variant="outlined"
					onChange={(e) => setDueBy(e.target.value)}
					value={dueBy}
					className={classes.dateBox}
					/>
			</div>
			<TextField
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
			<ReCAPTCHA 
				// Import Actual public key just like below \/
				sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}
				onChange={onCaptchaHandler}
				onExpired={onCaptchaExpirationHandler}
				theme="light"
				ref={recaptchaRef}
				/>
			</div>
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
	)
}

export default ContactForm;