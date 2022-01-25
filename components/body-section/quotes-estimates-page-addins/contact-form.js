import React, { useState, useRef, useEffect } from 'react'
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
import { makeStyles, useTheme } from "@material-ui/core/styles";
import ReCAPTCHA from 'react-google-recaptcha';
import sendemail from '../../hooks/sendemail.js';

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
	// const theme = useTheme();
	// const highlightRef = useRef(null);
	const recaptchaRef = useRef();

	// States for form inputs - passed to email handler
	const [fullName, setFullName] = useState("");
	const [phoneNumber, setPhoneNumber] = useState("");
	const [email, setEmail] = useState("");
	const [radioSelectionValue, setRadioSelectionValue] = useState(null);
	const [dueBy, setDueBy] = useState("");
	const [message, setMessage] = useState("");
	const [isVerifiedOnSubmit, setIsVerifiedOnSubmit] = useState(false);

	// Special state hack for unadaptable component (date picker -> it's label)
	const [isFocused, setIsFocused] = useState(false);


/* ***************************************************************************************************** */
//  if the new onChange assignments don't work as intended -- this is where the commented out section goes
/* ***************************************************************************************************** */
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
		<form className={ContactFormStyles.form} noValidate autoComplete="off" onSubmit={submitMe}>
			<TextField 
				InputLabelProps={{classes: {root: classes.label}}}
				label="Name" 
				variant="outlined"
				fullWidth
				type="text"
				margin="normal"
				autoComplete="true"
				onChange={(e) => setFullName(e.target.value)}
				value={fullName}
				/>
			<TextField 
				InputLabelProps={{classes: {root: classes.label}}}
				label="Phone Number" 
				variant="outlined"
				fullWidth
				margin="normal"
				autoComplete="true"
				onChange={(e) => setPhoneNumber(e.target.value)}
				value={phoneNumber}
				/>
			<TextField 
				InputLabelProps={{classes: {root: classes.label}}}
				label="Email" 
				variant="outlined"
				width="500"
				fullWidth
				margin="normal"
				autoComplete="true"
				onChange={(e) => setEmail(e.target.value)}
				value={email}
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
					focused={isFocused}
					className={classes.inputLabelBox}
					>
					When Would You Like a Call Back?
				</FormLabel>
				<TextField
					onFocus={() => setIsFocused(true)}
					onBlur={() => setIsFocused(false)}
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
			<div className={ContactFormStyles.bttncase}>
				<ReCAPTCHA 
					// Import Actual public key just like below \/

					sitekey={process.env.NEXT_PUBLIC_TEST_RECAPTCHA_SITE_KEY}
					onChange={onCaptchaHandler}
					onExpired={onCaptchaExpirationHandler}
					theme="light"
					ref={recaptchaRef}
					style={{marginRight: '42px'}}
					/>
				<Button 
					className={ContactFormStyles.bttn}
					type="submit" 
					variant="contained" 
					style={{ backgroundColor: 'rgb(145, 71, 22, 0.940)', color: 'white'}}
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