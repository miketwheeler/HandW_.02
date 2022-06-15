import React from 'react';
import ServiceStyles from './Services.module.css';
import DocStyles from '../styles/contentStyles.module.css';
// import GettaQuoteButton from '../components/globally-applied/GettaQuoteButton';
import dynamic from 'next/dynamic';


const GettaQuoteButton = dynamic(() => import('../components/globally-applied/GettaQuoteButton'));


function Services() {
	return (
		<div className={DocStyles.bodycontainer}>
			<div className={ServiceStyles.serviceContainer}>
			<h2 className={DocStyles.pageheader}>Our Services</h2>
				{/* Services Listed */}
				<div className={ServiceStyles.serviceSection}>
					<div className={ServiceStyles.serviceColumn1}>
						<h3 className={DocStyles.subheader1}>Installs</h3>
						<div className={ServiceStyles.section}>
							<p>
								We implement custom and/or templated designs that fit the needs of your project. 
								We like to remain flexible and put you in control. 
							</p> 
							<p>
								Our stairs and railings are sure to increase the 
								value of your home or business. It's the first thing your customers see, its 
								a subtle but an essential part of your image.
							</p>
						</div>
						<h4 className={DocStyles.subheader2}>Rail & Ballast</h4>
						<div className={ServiceStyles.sectionlist}>
							<ul>
								<li>Functional</li>
								<li>Adaptations</li>
								<li>Customized</li>
								<li>Safety</li>
								<li>Decorative</li>
							</ul>
						</div>
						<h4 className={DocStyles.subheader2}>Types</h4>
						<div className={ServiceStyles.sectionlist}>
							<ul>
								<li>Straight-away</li>
								<li>Spiral</li>
								<li>Split-Level</li>
								<li>Reinforced</li>
							</ul>
						</div>
						<h4 className={DocStyles.subheader2}>Where</h4>
						<div className={ServiceStyles.sectionlist}>
							<ul>
								<li>Interior</li>
								<li>Exterior</li>
								<li>Businesses</li>
								<li>Commercial</li>
								<li>Residential</li>
							</ul>
						</div>
					</div>
					{/* column divider */}
					<div className={ServiceStyles.divider1}></div>
					<div className={ServiceStyles.serviceColumn2}>
						<h3 className={DocStyles.subheader1}>Restorations</h3>
						<div className={ServiceStyles.section}>
							<p>
								We can fabricate portions or overhaul an existing installation in some cases. Most 
								of the time, however, it's more effective to start from scratch. 
							</p>
							<p>
								25%-projects and under are considered as overhauls. Any work above that would push your 
								project into the 'Installation' category for your job. Let's discuss what you have in 
								mind.
							</p>
						</div>
						<h4 className={DocStyles.subheader2}>Types</h4>
						<div className={ServiceStyles.sectionlist}>
							<ul>
								<li>Damaged Sections</li>
								<li>Partial Installs</li>
								<li>Refurbishment</li>
							</ul>
						</div>
						<h4 className={DocStyles.subheader2}>Spec & Requirements</h4>
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
							<p>
								Our work for you can be finished in typical colors that nearly all railings and metal 
								stairs receive. Some custom colors can be available if needed.  
							</p>
							<p>
								We only re-finish our own work, as our guarantee includes the finish for 10 years after 
								your install.
							</p>
						</div>
						<h4 className={DocStyles.subheader2}>Sealing & Paint</h4>
						<div className={ServiceStyles.sectionlist}>
							<ul>
								<li>Primers</li>
								<li>Durable Poly Coats</li>
								<li>Black, Greys, & Color</li>
								<li>Gloss, Semi-Gloss, Satin & Matte</li>
								<li>Unfinished</li>
							</ul>
						</div>
						<h4 className={DocStyles.subheader2}>Types</h4>
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
					We can handle just about any job requested. Feel free to reach out and get into contact with us, we're 
					interested in what you have in mind and helping you through the process.
				</div>
				{/* Get a Quote Button */}
				<GettaQuoteButton />
			</div>
		</div>
	)
}

export default Services;
