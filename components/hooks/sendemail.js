import resolver from './resolver.js';
import emailjs from 'emailjs-com';

const isn = '1e081f1b040e08325b0b5c5b1f095e'
const iun = '0b0d1b0c211612061b4f0a15321f3f2d1d2d2d470e1c3b382e2b';
const itn = '67767e637f7267764c786763247d2626';

function sendemail(fullName, phoneNumber, radioSelection, dueBy, message, email) {
	let data = {
		service_id: `${resolver('theCryptKeeperDidIt', isn)}`,
		template_id: `${resolver('chewbaccaIsLukesRealFather', itn)}`,
		user_id: `${resolver('rickIsActuallyMortyInTheEnd', iun)}`,
		template_params: {
			'name': `${fullName}`,
			'phone': `${phoneNumber}`,
			'job': `${radioSelection}`,
			'needBy': `${dueBy}`,
			'text': `${message}`,
			'from': `${email}`,
		}
	}
	return data;
	// emailjs.send(
	// 	`${resolver('theCryptKeeperDidIt', isn)}`,
	// 	`${resolver('chewbaccaIsLukesRealFather', itn)}`,
	// 	{
	// 		name: `${fullName}`,
	// 		phone: `${phoneNumber}`,
	// 		job: `${radioSelection}`,
	// 		needBy: `${dueBy}`,
	// 		text: `${message}`,
	// 		from: `${email}`,
	// 	},
	// 	`${resolver('rickIsActuallyMortyInTheEnd', iun)}`,
	// )
	// .then((result) => {
	// 	console.log(result.text);
	// }, (error) => {
	// 	console.log(error.text);
	// });
};

// export default sendemail;