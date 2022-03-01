import React from 'react';
import FooterStyle from './footer.module.css';
import Image from 'next/image';


function Footer() {
	const openNewTab = (url) => {
		const newWindow = window.open(url, '_blank', 'noopener, noreferrer');
		if(newWindow) newWindow.opener = null;
	}
	
	const onClickUrl = (url) => {
		return () => openNewTab(url);
	}

	return (
		<div className={FooterStyle.container}>
			<div className={FooterStyle.logoandtext}>
				<div className={FooterStyle.imageattrs}>
					<Image 
						src={"/images/emptydub_logo_t.png"} 
						height={50} 
						width={160}
						aria-label='emptydub-production-logo'
						alt="emptydub-logo" 
						priority
						layout='intrinsic'
						className={FooterStyle.image}
						/>
				</div>
				<div className={FooterStyle.logotext}>
					Copyright © 2022, Emptydub Products
				</div>
			</div>
			<div className={FooterStyle.texts}>
				Some graphical elements and social icons were sourced and derived from asset sources at 
				<a onClick={onClickUrl('https://flaticon.com')}>
					FlatIcon.com
				</a>
			</div>
		</div>
	)
}
export default Footer;
