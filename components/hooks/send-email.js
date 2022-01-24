import resolve from './Resolver.js';
import emailjs from 'emailjs-com';

const iun = '52544255784f4b5f4216534c6b4666744474741e574562617772';
const itn = '5f4e465b474a5f4e741a5b491b1c484e';


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// TODO: This hook is no where near active just yet, need decryptor added to app and setup with client email account
// TODO: Create email dispatcher account and link to client email
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function sendEmail(fullName, phoneNumber, radioSelection, dueBy, message, email) {
	emailjs.send(
		/////////////////////////////////////////////////////////
		// Need new service id for emailjs/mailgun 
		/////////////////////////////////////////////////////////
		"service_5uap2fy",

		/////////////////////////////////////////////////////////
		// Change this with the cryptor  
		/////////////////////////////////////////////////////////
		`${resolve('Dumbledore', itn)}`,
		{
			name: `${fullName}`,
			phone: `${phoneNumber}`,
			job: `${radioSelection}`,
			needBy: `${dueBy}`,
			text: `${message}`,
			from: `${email}`,
		},

		/////////////////////////////////////////////////////////
		// change this with the cryptor 
		/////////////////////////////////////////////////////////
		`${resolve('Dobbie', iun)}`,
	)
	.then((result) => {
		console.log(result.text);
	}, (error) => {
		console.log(error.text);
	});
};

export default sendEmail;