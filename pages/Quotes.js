import React from 'react';
import Container from '@material-ui/core/Container';
import ContactForm from '../components/ContactForm';
import DocStyles from '../styles/contentStyles.module.css';


function QuotesEstimates() {
	
	return (
		<div className={DocStyles.bodycontainer}>
			<div>
				<h2 className={DocStyles.pageheader}>Need a Quote or Estimate for Your Next Project?</h2>
			</div>
			<div>
				<p>
					You can count on us to fill you in with the details and assist you with any questions you have.
					<br />
					<br />
					Please fill in the information below and we'll get back to you.
				</p>
			</div>
			<Container>
				<ContactForm />
			</Container>
		</div>
	)
}

export default QuotesEstimates;
