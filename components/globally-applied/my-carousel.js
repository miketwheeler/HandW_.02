import React from 'react';
import Carousel from 'react-material-ui-carousel';
import Image from 'next/image';
import CarouselStyles from './my-carousel.module.css';

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
				indicatorIconButtonProps={{style: { padding: '12px'}}}
				indicatorContainerProps={{style: { marginTop: '-2px'}}}
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
        <div>
            <Image 
				src={props.item.image}
				priority={true} 
				width={1300} 
				height={380} 
				alt={"carousel highlight image"}
				/>
        </div>
    )
}

export default MyCarousel