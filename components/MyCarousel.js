import React from 'react';
import Carousel from 'react-material-ui-carousel';
import Image from 'next/image';
import CarouselStyles from '../styles/componentStyles/my-carousel.module.css';
import SpinningLoader from './SpinningLoader';
import { carouselSet } from '../data/dataSets';


function MyCarousel() {
	return (
		<div className={CarouselStyles.carouselcontainer}>
			<Carousel 
				animation={"slide"}
				indicatorIconButtonProps={{style: { padding: '12px'}, ariaLabel: 'prev-next-carousel-image-button'}}
				indicatorContainerProps={{style: { marginTop: '-2px'}, ariaLabel: 'current-carousel-image'}}
				>
				{
					carouselSet.carouselItems.map((item, i) => 
						<Item key={i} item={item} /> 
					)
				}
			</Carousel>
		</div>
	)
}

function Item(props) {
    return (
		<Image 
			src={props.item.image}
			priority={true} 
			aria-label={props.item.name}
			width={1300} 
			height={380} 
			alt={"carousel highlight image"}
			id={`image-${props.item.name}`}
		/>
    )
}

export default MyCarousel;