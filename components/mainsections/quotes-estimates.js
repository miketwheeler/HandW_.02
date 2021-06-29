import React from 'react'
import Container from '@material-ui/core/Container'
import QEStyles from './quotes-estimates.module.css'
import ContactForm from '../contact-form'



function QuotesEstimates() {
	
	return (
		<div>
			<div className={QEStyles.title}>
				Need a Quote or Estimate for Your Next Project?
			</div>
			<div className={QEStyles.text}>
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
