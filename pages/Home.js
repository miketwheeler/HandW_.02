import React from 'react';
import HomePageStyles from './Home.module.css';
import ServiceDeck from '../components/body-section/home-page-addins/services-card-deck';
import DocStyles from '../styles/contentStyles.module.css';
// import GettaQuoteButton from '../components/globally-applied/GettaQuoteButton';
import dynamic from 'next/dynamic';


const GettaQuoteButton = dynamic(() => import('../components/globally-applied/GettaQuoteButton'));

function HomePage() {
	
	return (
		<div className={DocStyles.bodycontainer}>
			<div className={HomePageStyles.bodycontent}>
				<div className={HomePageStyles.upper}>
					<div className={HomePageStyles.titlesection}>
						<h2 className={DocStyles.pageheader}>Welcome</h2>
						<p>
							We're a Nebraska-native Startup, proud to bring our skills with 
							metalworking to the City of Lincoln and the greater area. 
							Our primary focus is to provide a range of custom and integrated 
							projects for all of your Stairway and Railing needs. 
							We're qualified for both commercial and residential builds. 
						</p>
					</div>
					<div className={HomePageStyles.mybar}></div>
					<div className={HomePageStyles.asidesection}>
						<div className={HomePageStyles.asidecontact}>
							<p>
								Whatever your metalworking needs may be, we're  
								happy to answer any questions you have. We're 
								here to help.
							</p>
							<p className={HomePageStyles.asidenumber}>
								Contact Us 9am -5pm CST: <br /><strong>+1 (402) 805-2341</strong>
							</p>
						</div>
					</div>
				</div>
				<div className={DocStyles.bodybar}>
					<div className={HomePageStyles.mission}>
						<h1>
							We know you expect great work. 
							<br/> 
							We stand by our work, you can hold us to it - our work is 100% guaranteed.
						</h1>
					</div>
				</div>
				<div className={HomePageStyles.servicesection}>
					<h2 className={DocStyles.pageheader}>Our Services</h2>
					<ServiceDeck />
				</div>
				{/* Get a quote button */}
				<GettaQuoteButton />
			</div>
		</div>
	)
}

export default HomePage;
