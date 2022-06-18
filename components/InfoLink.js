// import { Icon } from '@material-ui/core'
import React from 'react';
import ContactDisplayStyle from '../styles/componentStyles/info-link.module.css';
import Image from 'next/image';
import { socialSet } from '../data/dataSets';


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
						layout='intrinsic'
						className={ContactDisplayStyle.socialicon}
					/>
				</a>
			</>
		)
	}

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
						<h2>+1 (402) 805-2341</h2>
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
					{
						socialSet.socials.map((item, i) => <SocialIcon key={i} item={item} />)
					}
				</div>
			</div>
			<div className={ContactDisplayStyle.businessbox}>
				<div className={ContactDisplayStyle.businessicon}>
					<Image 
						src="/images/hw_mainlogo.png"
						alt="H&W Company Logo"
						width={192}
						height={97}
						layout='responsive'
						placeholder='blur'
						blurDataURL='../public/images/blurs/blurred.png'
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
