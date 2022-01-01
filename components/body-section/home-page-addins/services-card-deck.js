import React from 'react';
import ServiceDeckStyles from './services-card-deck.module.css';
import Image from 'next/image';

// Assembles a series of cards into a div for the imported & rendered component
function ServiceDeck(props) {
	var contents = [
		{ image: "/images/icons/2x/2x-design.png", description: "Design, Repair, Redesign, and Remodeling"},
		{ image: "/images/icons/2x/2x-stairs.png", description: "Ballast and Handrail"},
		{ image: "/images/icons/2x/2x-home-city.png", description: "Commercial and Residential"},
		{ image: "/images/icons/2x/2x-welder.png", description: "Interior and Exterior Fabrication"},
		{ image: "/images/icons/2x/2x-finishing.png", description: "Other Fixtures, Amenities, Painting and Refinishing"}
	]
	
	return (
		<div className={ServiceDeckStyles.container}>
			{contents.map((item, i) => <MakeMiniCard key={i} item={item}/>)}
		</div>
	)
}

// Main component exported to the appropriate Home Page section
function MakeMiniCard(props) {
	return (
		<div className={ServiceDeckStyles.cardoutline}>
			<div className={ServiceDeckStyles.tile}>
				<Image 
					src={props.item.image} 
					width={"231px"} 
					height={"242px"} 
					alt={"services icons"} 
					priority={true}
					/>
			</div>
			<div className={ServiceDeckStyles.caption}>
				{props.item.description}
			</div>
		</div>
	)
}

export default ServiceDeck;