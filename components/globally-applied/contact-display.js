// import { Icon } from '@material-ui/core'
import React from 'react';
import ContactDisplayStyle from './contact-display.module.css';
import Image from 'next/image';



function ContactDisplay() {

	const openNewTab = (url) => {
		const newWindow = window.open(url, '_blank', 'noopener, noreferrer');
		if(newWindow) newWindow.opener = null;
	}
	
	const onClickUrl = (url) => {
		return () => openNewTab(url);
	}

	function SocialIcon(props){
		return (
			<>
				<a onClick={onClickUrl(props.item.linkedto)}>
					<Image 
						src={props.item.image} 
						alt={props.item.description} 
						width={76}
						height={76}
						priority={true}
						className={ContactDisplayStyle.socialicon}
					/>
				</a>
			</>
		)
	}

	// TODO: replace with real links to proper socials
	const socials = [
		{ 
			image: "/images/icons/2x/2x-facebook.png", 
			description: "facebook" ,
			linkedto: "https://www.facebook.com/handwstairandrail" 
		},
		{ 
			image: "/images/icons/2x/2x-instagram.png", 
			description: "instagram", 
			linkedto: "https://www.instagram.com"
		},
		// { 
		// 	image: "/images/icons/2x/2x-linkedin.png", 
		// 	description: "linked in", 
		// 	linkedto: "https://www.linkedin.com"
		// },
		{ 
			image: "/images/icons/2x/2x-twitter.png", 
			description: "twitter", 
			linkedto: "https://www.twitter.com"
		},
		// { 
		// 	image: "/images/icons/2x/2x-youtube.png", 
		// 	description: "youtube", 
		// 	linkedto: "https://www.youtube.com"
		// }
	]
	return (
		<div className={ContactDisplayStyle.objparams}>
			<div className={ContactDisplayStyle.infobox}>
				<div className={ContactDisplayStyle.contactsContainer}>
					<div className={ContactDisplayStyle.contactus}>
						<h2>Contact Us</h2>
					</div>
					<div className={ContactDisplayStyle.reachus}>
						<p>Call us 9:00am-6:00pm (CST):</p>
					</div>
					<div className={ContactDisplayStyle.number}>
						<h2>+1 (000) 000-0000</h2>
					</div>
					<div className={ContactDisplayStyle.orbar}>
						<p> - or - </p>
					</div>
					<div className={ContactDisplayStyle.emailus}>
						<p>Customer Service Inquiries:</p>
					</div>
					<div className={ContactDisplayStyle.email}>
						<h2>hwstair@gmail.com</h2>
					</div>
				</div>
			</div>
			<div className={ContactDisplayStyle.socialbox}>
				<div className={ContactDisplayStyle.socialheader}>
					<h2>Follow Us and Share</h2>
				</div>
				<div className={ContactDisplayStyle.socialicons}>
					{/* !!!! Need links */}
					{
						socials.map((item, i) => <SocialIcon key={i} item={item} />)
					}
				</div>
			</div>
			<div className={ContactDisplayStyle.businessbox}>
				<div className={ContactDisplayStyle.businessicon}>
					<Image 
						src="/images/hw_mainlogo.png"
						alt="H&W Company Logo"
						width={150}
						height={75}
						priority={true}
						/>
				</div>
				<div className={ContactDisplayStyle.businessdetail}>
					<p>
						Proudly owned and operated in Lincoln, NE
					</p>
				</div>
			</div>
		</div>
	)
}

export default ContactDisplay;
