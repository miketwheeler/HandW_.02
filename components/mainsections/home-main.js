import React from 'react'
import HomePageStyles from './home-main.module.css'
import MiniCardDeck from '../minicarddeck' 

function HomePage() {
	
	return (
		<div className={HomePageStyles.bodycontent}>
			<div className={HomePageStyles.upper}>
				<div className={HomePageStyles.titlesection}>
					<h2>Work That We Do</h2>
					<p>
						We're a Nebraska-native Startup, proud to bring our skills with 
						metalworking to the City of Lincoln, Omaha, and anywhere between. 
						Our primary focus is to provide a range of custom and integrated 
						projects for all of your Stairway and Railing needs. Want an 
						all-metal stairway fabricated for your new home or business? 
						We're qualified for both commercial and residential builds. We 
						also provide servicing and remodeling to existing structures in 
						the case you're looking for a refresh.
					</p>
				</div>
				{/*  */}
				<div className={HomePageStyles.mybar}></div>
				{/*  */}
				<div className={HomePageStyles.asidesection}>
					<div className={HomePageStyles.asidecontact}>
						<p>
							Whatever your metalworking needs may be, we're  
							happy to answer any questions you may have. We're 
							here to help.
						</p>
						<p className={HomePageStyles.asidenumber}>
							Call Us: +1(888) 777-2121
						</p>
					</div>
				</div>
			</div>
			<div className={HomePageStyles.mission}>
				<h1>
					We know you expect great work. 
					<br/> 
					We'll bring it, you can hold us to it - 100% guaranteed.
				</h1>
			</div>
			<div className={HomePageStyles.servicesection}>
				<h2 className={HomePageStyles.servicesheader}>Our Services</h2>
				<MiniCardDeck />
			</div>
		</div>
	)
}

export default HomePage;
