import React, { useState, useEffect } from 'react';
import { FormControl, FormControlLabel, FormLabel, RadioGroup, TextField, Radio, Button } from '@material-ui/core'
import ContactFormStyles from './contact-form.module.css';
import { makeStyles, createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
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
const useStyles = makeStyles({
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
	bttn: {
		width: '150px',
		height: '50px',
		marginTop: '14px',
		backgroundColor: 'rgb(182, 98, 50)', 
		color: 'white', 
		marginRight: '2px',
		float: 'right',
		fontSize: '18px',
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
	// Form Fields State Obj
	const initialStateVals = {
		fullName: { value: "", message: "Please provide a valid Name" },
		phoneNumber: { value: "", message: "Please provide a valid Phone Number" },
		email: { value: "", message: "Please provide a valid Email" },
		message: { value: "", message: "Please leave us a memo (No Numbers Please)"},
	};
	const [checkVals, setCheckVals] = useState(initialStateVals);
	const [subject, setSubject] = useState("Stairs");
	const [timeframe, setTimeframe] = useState("1 Business Day");
	// Modal & Error Messages
	const [success, setSuccess] = useState(false);
    const [messageModalOpen, setMessageModalOpen] = useState(messageModalOpen ? messageModalOpen : false);
	// Form Error Checking Vars
	const [isError, setIsError] = useState(false);
	const docLabel = document.querySelector('.Mui-error');
	// Messages
	const variousMessages = {
		submitErrorText: "Something went wrong. Please try submitting your Quote Request again.",
		thankYouMessage: (calltime) => `Thank you for your getting in touch with us! We will get back to you by 6:00pm in ${calltime}.`,
		errorMessage: `There was an error with your Quote Submission. Please try again.`
	}
	// Field Validation
	const regexComps = {
		reNormString: /^([^0-9]*)$/,
		rePhone: /[0-9]/g,
		reEmail: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
		reMessage: /([\n\r\t])/g,
	}
	
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
	const formattedCallbackDate = (date) => {
		const dateString = date.toString(); // Sets the date to a string to parse
		const callBackDate = `${dateString.substring(0,15)} ${dateString.substring(16, 24)} ${dateString.substring(34)}`; // grabs what's needed for this info
		return callBackDate;
	}
	
	useEffect(() => {
		docLabel !== undefined && docLabel ? setIsError(true) : setIsError(false);
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
		setSubject("Stairs");
		setTimeframe("1 Business Day");
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

	// ///////////////////////////////////////////////////
	// Dispatch email-data 
	const handleSubmit = async (event) => {
		event.preventDefault();
		const sendEmailUrl = '/.netlify/functions/sendemail';
		const newDate = new Date();
		const formattedMessage = checkVals.message.value.replace(regexComps.reMessage, " ");
		const formattedName = checkVals.fullName.value.trim();
		const formattedTimeframe = `${timeframe.toUpperCase()} from ${formattedCallbackDate(newDate)}`

		const dataObj = {
			"name": formattedName,
			"phone": checkVals.phoneNumber.value,
			"job": subject,
			"needBy": formattedTimeframe,
			"text": formattedMessage,
			"from": checkVals.email.value,
		};
		await axios.post(sendEmailUrl, dataObj)
		.then((response) => {
			console.log(
				`SUCCESS on CLIENT EMAIL->\nstatus:[ ${JSON.stringify(response.status)} ]\nstatusText:[ ${JSON.stringify(response.statusText)} ]`  
			);
			setSuccess(true);
			setMessageModalOpen(true);
			resetForm();
		})
		.catch((error) => {
			console.log(
				`ERROR on CLIENT EMAIL->\nerrorStatus:[ ${JSON.stringify(error.response.status)} ]\nerrorStatusText:[ ${JSON.stringify(error.response.statusText)} ]`
			);
			setMessageModalOpen(true);
			window.alert(variousMessages.submitErrorText);
		})
	};

	return (
		<ThemeProvider theme={theme}>
			<form 
				className={classes.formStyle} 
				onSubmit={(event) => handleSubmit(event)}
				id='quote-form'
				aria-label="job-quote-form"
				>
				{/* Name */}
				<FormControl style={{width: '100%'}}>
					<TextField 
						required
						InputLabelProps={{classes: {root: classes.label}}}
						id="fullName"
						label="Name"
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
						aria-label='phone-number'
						value={checkVals.phoneNumber.value}
						fullWidth
						variant="outlined"
						margin="normal"
						format="+1 (###) ###-####"
						mask="_"
						customInput={TextField}
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
						aria-label="your-email"
						fullWidth
						variant="outlined"
						margin="normal"      
						value={checkVals.email.value}
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
						id='subject-matter'
						type='radio-group'
						aria-label="subject-radio-buttons" 
						defaultValue="Stairs"
						value={subject} 
						onChange={(e) => setSubject(e.target.value)}
						className={ContactFormStyles.radioContainer}
						>
						<FormControlLabel 
							id='Stairs'
							label="Stairs"
							value="Stairs"
							aria-label='stairs' 
							labelPlacement="start"
							control={<Radio color="primary" />} 
							className={ContactFormStyles.radiobutton}
						/>
						<FormControlLabel 
							id='Railing'
							label="Railing" 
							value="Railing" 
							aria-label='railing'
							labelPlacement="start"
							control={<Radio color="primary" />} 
							className={ContactFormStyles.radiobutton}
						/>
						<FormControlLabel 
							id='Stair-and-Rail'
							label="Stair & Railing"
							value="Stair & Railing"
							aria-label='stairs-and-railing' 
							labelPlacement="start"
							control={<Radio color="primary" />} 
							className={ContactFormStyles.radiobutton}
						/>
						<FormControlLabel
							id='Refinishing'
							label="Refinishing"
							value="Refinishing" 
							aria-label='refinishing'
							labelPlacement="start"
							control={<Radio color="primary" />} 
							className={ContactFormStyles.radiobutton}
						/>
						<FormControlLabel 
							id='Other'
							label="Other"
							value="Other"
							aria-label='other'
							labelPlacement="start"
							control={<Radio color="primary" />} 
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
						id='timeframe'
						type='radio-group'
						aria-label="timeframe-radio-buttons" 
						defaultValue="1 Business Day"
						value={timeframe} 
						onChange={(e) => setTimeframe(e.target.value)}
						className={ContactFormStyles.radioContainer}
						>
						<FormControlLabel 
							id='one-day'
							label="1 Business Day"
							value="1 Business Day"
							aria-label='one-business-day'
							labelPlacement="start"
							control={<Radio color="primary" />} 
							className={ContactFormStyles.radiobutton}
						/>
						<FormControlLabel 
							id='two-days'
							label="2 Business Days" 
							value="2 Business Days" 
							aria-label='two-business-days'
							labelPlacement="start"
							control={<Radio color="primary" />} 
							className={ContactFormStyles.radiobutton}
						/>
						<FormControlLabel
							id='three-days'
							label="3 Business Days"
							value="3 Business Days" 
							aria-label='three-business-days'
							labelPlacement="start"
							control={<Radio color="primary" />} 
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
						label="Message and Other Notes"
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
				{/* MODAL - Display SUCCESS or FAILED Modal Message*/}
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
									success ? variousMessages.thankYouMessage(timeframe) : variousMessages.errorMessage
								}
							</p>
							{
								success ? <h4 className={classes.haveGoodDayMsg}>Have a good day!</h4> : null
							}
							<Button 
								className={classes.bttn}
								type="button" 
								variant="contained"
								aria-label='ok-close-modal-button' 
								onClick={handleModalClose}
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
						className={classes.bttn}
						type="submit" 
						aria-label='submit-information-button'
						variant="contained"
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