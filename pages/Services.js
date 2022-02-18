import React from 'react';
import { useHistory } from 'react-router-dom';
import ServiceStyles from './Services.module.css';
import { Button } from '@material-ui/core'
import DocStyles from '../styles/contentStyles.module.css'


function Services() {

	const history = useHistory();

	function goToQuotesForm(e) {
		e.preventDefault();
		history.push("/quotes-estimates");
		window.scrollTo(0, 480);
	}

	return (
		<div className={DocStyles.bodycontainer}>
			<div className={ServiceStyles.serviceContainer}>
			<h2 className={DocStyles.pageheader}>Services</h2>
				{/* Services Listed */}
				<div className={ServiceStyles.serviceSection}>
					<div className={ServiceStyles.serviceColumn1}>
						<h3 className={DocStyles.subheader1}>Installs</h3>
						<div className={ServiceStyles.section}>
							Our specialty! We implement custom and/or template design. We're flexible and ultimately ]
							put you the control. It's the first thing your patrons see, its a subtle but 
							an essential piece... lets make that grand entrance!
						</div>
						<h4 className={DocStyles.subheader2}>Rail & Ballast</h4>
						<div className={ServiceStyles.sectionlist}>
							<ul>
								<li>Installs</li>
								<li>Design</li>
								<li>On-site Implementation</li>
								<li>Fabrication</li>
								<li>Custom Fit</li>
							</ul>
						</div>
						<h4 className={DocStyles.subheader2}>Stairs</h4>
						<div className={ServiceStyles.sectionlist}>
							<ul>
								<li>Straightaway</li>
								<li>Loft Access</li>
								<li>Split</li>
								<li>Reinforced</li>
								<li>Custom Design</li>
							</ul>
						</div>
					</div>
					
					{/* column divider */}
					<div className={ServiceStyles.divider1}></div>

					<div className={ServiceStyles.serviceColumn2}>
						<h3 className={DocStyles.subheader1}>Restorations</h3>
						<div className={ServiceStyles.section}>
							Have a project where a refresh is needed? We can fabricate portions or overhaul an existing 
							structure.
						</div>
						<h4 className={DocStyles.subheader2}>Portional Additions</h4>
						<div className={ServiceStyles.sectionlist}>
							<ul>
								<li>Damaged Sections</li>
								<li>Partial Installs</li>
								<li>Refurbishment</li>
								<li>Stairs and Railing Sections</li>
							</ul>
						</div>
						<h4 className={DocStyles.subheader2}>Damage & Repair</h4>
						<div className={ServiceStyles.sectionlist}>
							<ul>
								<li>Water and Fire Damage</li>
								<li>OSHA Compliance</li>
								<li>Accessablity</li>
								<li>Reinforcement</li>
								<li>Wear and Tear</li>
							</ul>
						</div>
					</div>

					{/* column divider */}
					<div className={ServiceStyles.divider2}></div>

					<div className={ServiceStyles.serviceColumn3}>
						<h3 className={DocStyles.subheader1}>Finishing</h3>
						<div className={ServiceStyles.section}>
							Want a pearly coat on that new stairway? Got rust? Need paint? 
							We can refinish an existing structure too! Disclosure: we may still want to 
							promote what we do best by offering a complete project we're proud of!
						</div>
						<h4 className={DocStyles.subheader2}>Sealing & Paint</h4>
						<div className={ServiceStyles.sectionlist}>
							<ul>
								<li>Powder Coat</li>
								<li>Lacquer</li>
								<li>Polyetheline</li>
								<li>Rustoleum Rust Sealant</li>
								<li>Color</li>
								<li>Gloss, Semi-Gloss, Satin & Matte</li>
								<li>Vintage, Patinaed or Unfinished</li>
							</ul>
						</div>
						<h4 className={DocStyles.subheader2}>Refinishing</h4>
						<div className={ServiceStyles.sectionlist}>
							<ul>
								<li>Rust Prevention and Sealants</li>
								<li>Patchwork & Replacement</li>
								<li>Sectional Insertion</li>
								<li>On-Site Spray</li>
							</ul> 
						</div>
					</div>
				</div>
				<div className={ServiceStyles.quoteStatement}>
					We can handle just about any job at hand. Feel free to reach out and get into contact with us, we're interested in what you 
					have in mind. Get a Quote!
				</div>

				{/* Get a Quote Button */}
				<div className={ServiceStyles.buttonContainer}>
					<Button className={ServiceStyles.gettaQuoteButton}
						variant="contained"
						style={{backgroundColor: 'rgb(182, 98, 50)', color: 'white'}}
						size="large"
						onClick={(e) => goToQuotesForm(e)}
						>
						Get a Quote
					</Button>
				</div>
			</div>
		</div>
	)
}

export default Services;
