import React from 'react'
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
	return (
		<form className={ContactStyles.form}>
			<TextField 
				label="Full Name" 
				labelPlacement="start"
				variant="outlined"
				fullWidth
				margin="normal"
				autocomplete="none"
				/>
			<TextField 
				label="Phone Number" 
				labelPlacement="start"
				variant="outlined"
				fullWidth
				margin="normal"
				autocomplete="none"
				/>
			<TextField 
				label="Email" 
				labelPlacement="start"
				variant="outlined"
				width="500"
				fullWidth
				margin="normal"
				autocomplete="none"
				/>
			<FormControl component="fieldset" margin="normal" fullWidth>
				<FormLabel component="subject">Subject</FormLabel>
				<RadioGroup 
					row 
					aria-label="" 
					name="" 
					value={1+1} 
					onChange={1+1}
					>
					<FormControlLabel 
						value="stairs" 
						control={<Radio />} 
						label="Stairs"
						labelPlacement="start" 
						/>
					<FormControlLabel 
						value="railing" 
						control={<Radio />} 
						label="Railing" 
						labelPlacement="start"
						/>
					<FormControlLabel 
						value="refinishing" 
						control={<Radio />} 
						label="Refinishing"
						labelPlacement="start" 
						/>
					<FormControlLabel 
						value="other" 
						control={<Radio />} 
						label="Other"
						labelPlacement="start"
						 />
				</RadioGroup>
			</FormControl>
			<TextField 
				label="Due Date"
				variant="outlined"
				margin="normal" 
				autocomplete="none"
				/>
			<TextField
				label="What can we help you with..." 
				fullWidth 
				variant="outlined"
				margin="normal"
				multiline 
				rows={3} 
				autocomplete="none"
				/>
			<div className={ContactStyles.bttncase}>
				<Button className={ContactStyles.bttn}
					type="submit" 
					variant="contained" 
					color='primary' 
					textColor="white"
					size="large"
					// onClick={}
					// disableElevation
					>
						Submit
				</Button>
			</div>
		</form>
	)
}

export default ContactForm
