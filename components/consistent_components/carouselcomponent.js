import React from 'react';
import Carousel from 'react-material-ui-carousel'
import { Paper, Button } from '@material-ui/core'
import Image from 'next/image'
import CarouselStyles from './carouselcomponent.module.css'

function MyCarousel(props)
{
	var items = [
		{ name: "Welding", image: "/images/welding_railing.jpg" },
		{ name: "Hardly Working", image: "/images/hardly_working.jpg" },
		{ name: "Welding2", image: "/images/jigwelding.jpg" }
	]

	return (
		<div className={CarouselStyles.carouselcontainer}>
			<Carousel 
				animation={"slide"}
				borderRadius={"10px"}
				indicatorIconButtonProps={{
					style: { padding: '10px' }
				}}
				activeIndicatorIconButtonProps={{
					style: { backgroundColor: 'transparent' }
				}}
				indicatorContainerProps={{
					style: { marginTop:"-35px", alignItems: "center"}
				}}
				>
				{
					items.map((item, i) => <Item key={i} item={item} /> )
				}
			</Carousel>
		</div>
	)
}

function Item(props)
{
    return (
        <Paper>
            <Image 
				src={props.item.image}
				priority={true} 
				width={1320} 
				height={350} 
				alt={"carousel highlight image"}
				/>
        </Paper>
    )
}

export default MyCarousel