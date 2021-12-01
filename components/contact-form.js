import React, { useState, setState } from 'react'
import { 
	FormControl, 
	FormControlLabel, 
	FormLabel, 
	RadioGroup, 
	TextField, 
	Radio, 
	Button 
} from '@material-ui/core'
import lightblue from '@material-ui/core/colors/lightblue'
import ContactStyles from './contact-form.module.css'

function ContactForm() {
	const [fullName, setFullName] = useState("");
	const [phoneNumber, setPhoneNumber] = useState("");
	const [email, setEmail] = useState("");
	const [radioSelectionValue, setRadioSelectionValue] = useState(null);
	const [dueBy, setDueBy] = useState("");
	const [message, setMessage] = useState("");


	const handleFullNameChange = (event) => {
		setFullName(event.target.value)
	}
	const handlePhoneNumberChange = (event) => {
		setPhoneNumber(event.target.value)
	}
	const handleEmailChange = (event) => {
		setEmail(event.target.value)
	}
	const handleRadioSelectionChange = (event) => {
		setRadioSelectionValue(event.target.value);
		// console.log(event.target.value);
	}
	const handleDueByChange = (event) => {
		setDueBy(event.target.value);
	}
	const handleMessageChange = (event) => {
		setMessage(event.target.value);
	}

	const resetForm = () => {
		setFullName("");
		setPhoneNumber("");
		setEmail("");
		setRadioSelectionValue(null);
		setDueBy("");
		setMessage("");
	}

	const submitMe = (event) => {
		event.preventDefault();
		// sendEmail(fullName, phoneNummber, email, radioSelection, dueBy, message);
		// build func to popup alert success/denial 
		// alertBox();
		resetForm();
		console.log(fullName, phoneNumber, radioSelectionValue, dueBy, message, email);
	}


	return (
		<form className={ContactStyles.form} onSubmit={submitMe}>
			<TextField 
				label="Full Name" 
				labelPlacement="start"
				variant="outlined"
				fullWidth
				margin="normal"
				autoComplete="true"
				onChange={handleFullNameChange}
				value={fullName}
				/>
			<TextField 
				label="Phone Number" 
				labelPlacement="start"
				variant="outlined"
				fullWidth
				margin="normal"
				autoComplete="true"
				onChange={handlePhoneNumberChange}
				value={phoneNumber}
				/>
			<TextField 
				label="Email" 
				labelPlacement="start"
				variant="outlined"
				width="500"
				fullWidth
				margin="normal"
				autoComplete="true"
				onChange={handleEmailChange}
				value={email}
				/>
			<FormControl aria-label="radio-list-form" margin="normal" fullWidth>
				<FormLabel aria-label="subject-radio-list-selection">Subject</FormLabel>
					<RadioGroup 
						row 
						aria-label="select-service-radio-buttons" 
						defaultValue={radioSelectionValue}
						name="currentSelection" 
						value={radioSelectionValue} 
						onChange={handleRadioSelectionChange}
						>
						<FormControlLabel 
							value="stairs" 
							control={<Radio color="primary" />} 
							label="Stairs"
							labelPlacement="start"
							className={ContactStyles.radiobutton}
							/>
						<FormControlLabel 
							value="railing" 
							control={<Radio color="primary" />} 
							label="Railing" 
							labelPlacement="start"
							className={ContactStyles.radiobutton}
							/>
						<FormControlLabel 
							value="refinishing" 
							control={<Radio color="primary" />} 
							label="Refinishing"
							labelPlacement="start"
							className={ContactStyles.radiobutton}
							/>
						<FormControlLabel 
							value="other" 
							control={<Radio color="primary" />} 
							label="Other"
							labelPlacement="start"
							className={ContactStyles.radiobutton}
							/>
					</RadioGroup>
			</FormControl>
			<TextField 
				label="Due Date"
				variant="outlined"
				margin="normal" 
				autoComplete="none"
				onChange={handleDueByChange}
				value={dueBy}
				/>
			<TextField
				label="My Message" 
				fullWidth 
				variant="outlined"
				margin="normal"
				multiline 
				rows={3} 
				autoComplete="none"
				onChange={handleMessageChange}
				value={message}
				/>
			<div className={ContactStyles.bttncase}>
				<Button className={ContactStyles.bttn}
					type="submit" 
					variant="contained" 
					color='primary' 
					size="large"
					>
						Submit
				</Button>
			</div>
		</form>
	)
}

export default ContactForm
