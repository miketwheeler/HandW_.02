import React from 'react';
import Carousel from 'react-material-ui-carousel';
import Image from 'next/image';
import CarouselStyles from './my-carousel.module.css';
import dataSet from '../data/dataSets';

function MyCarousel(props)
{
	const items = [
		{ name: "H&W Welders", image: "/images/welders_wbias_9.png" },
		{ name: "Welding", image: "/images/welding_railing.jpg" },
		{ name: "Hardly Working", image: "/images/hardly_working.jpg" },
		{ name: "Welding2", image: "/images/jigwelding.jpg" }
	]

	return (
		<div className={CarouselStyles.carouselcontainer}>
			<Carousel 
				animation={"slide"}
				indicatorIconButtonProps={{style: { padding: '12px'}, ariaLabel: 'prev-next-carousel-image-button'}}
				indicatorContainerProps={{style: { marginTop: '-2px'}, ariaLabel: 'current-carousel-image'}}
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
				aria-label={props.item.name}
				width={1300} 
				height={380} 
				layout='intrinsic'
				alt={"carousel highlight image"}
				id={`image-${props.item.name}`}
				type="image"
				/>
        </div>
    )
}

export default MyCarousel;