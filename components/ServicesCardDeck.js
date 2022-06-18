import React from 'react';
import ServiceDeckStyles from '../styles/componentStyles/services-card-deck.module.css';
import Image from 'next/image';
import { serviceSet } from '../data/dataSets';

// Main component exported to the appropriate 'Home Page' section
// Assembles a series of cards into a div for the imported & rendered component
function ServiceDeck() {	
	return (
		<div className={ServiceDeckStyles.container}>
			{
				serviceSet.contents.map((item, i) => <MakeMiniCard key={i} item={item}/>)
			}
		</div>
	)
}

// creates an individual card out of the passed props- returns and is added to the service-deck
function MakeMiniCard(props) {
	return (
		<div>
			<div className={ServiceDeckStyles.imageattrs}>
				<Image 
					src={props.item.image} 
					layout="intrinsic"
					alt={"services icons"}
					width={256}
					height={256}
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