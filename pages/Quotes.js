import React from 'react';
import Container from '@material-ui/core/Container';
import QuotesEstimatesStyles from './Quotes.module.css';
import ContactForm from './../components/body-section/quotes-estimates-page-addins/contact-form';
import DocStyles from '../styles/contentStyles.module.css'


function QuotesEstimates() {
	
	return (
		<div className={DocStyles.bodycontainer}>
			<div>
				<h2 className={DocStyles.pageheader}>Need a Quote or Estimate for Your Next Project?</h2>
			</div>
			<div>
				<p>
					No worries my friend, you're in the right place!
					Set up a free consultation today.
				</p>
				<p>
					We understand there are many unknowns, and you can count
					on our professionals to fill you in with the details.
					Please fill in the information below and we'll get back to 
					you ASAP.
				</p>
			</div>
			<Container>
				<ContactForm />
			</Container>
		</div>
	)
}

export default QuotesEstimates
