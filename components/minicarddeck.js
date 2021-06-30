import React from 'react'
import MiniCardDeckStyles from './minicarddeck.module.css'
import Image from 'next/image'


function MiniCardDeck(props) 
{
	var contents = [
		{ image: "/images/icons/2x/2x-design.png", description: "Design, Repair, Redesign, and Remodeling"},
		{ image: "/images/icons/2x/2x-stairs.png", description: "Ballast and Handrail"},
		{ image: "/images/icons/2x/2x-home-city.png", description: "Commercial and Residential"},
		{ image: "/images/icons/2x/2x-welder.png", description: "Interior and Exterior Fabrication"},
		{ image: "/images/icons/2x/2x-finishing.png", description: "Other Fixtures, Amenities, Painting and Refinishing"}
	]
	
	return (
		<div className={MiniCardDeckStyles.container}>
			{
				contents.map((item, i) => <MakeMiniCard key={i} item={item}/>)
			}
		</div>
	)
}

function MakeMiniCard(props)
{
	return (
		<div className={MiniCardDeckStyles.cardoutline}>
			<div className={MiniCardDeckStyles.tile}>
				<Image src={props.item.image} width={"241px"} height={"252px"} alt={"services icons"} priority={true}/>
			</div>
			<div className={MiniCardDeckStyles.caption}>
				{props.item.description}
			</div>
		</div>
	)
}

export default MiniCardDeck