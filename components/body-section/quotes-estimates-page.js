import React from 'react';
import Container from '@material-ui/core/Container';
import QuotesEstimatesStyles from './quotes-estimates-page.module.css';
import ContactForm from './quotes-estimates-page-addins/contact-form';



function QuotesEstimates() {
	
	return (
		<div>
			<div className={QuotesEstimatesStyles.title}>
				<h2>Need a Quote or Estimate for Your Next Project?</h2>
			</div>
			<div className={QuotesEstimatesStyles.text}>
				<p>
					No worries my friend, you're in the right place!
					First, we would like to extend our warm-welcome.
				</p>
				<p>
					We understand there are many unknowns, and you can 
					on our professionals to fill you in with the details
					in good care, after all, you're fam to us! Please
					fill in the information below and we'll get back to 
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
