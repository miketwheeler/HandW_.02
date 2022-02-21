import React from 'react';
import FooterStyle from './footer.module.css';
import Image from 'next/image';


function Footer() {
	return (
		<div className={FooterStyle.container}>
			<div className={FooterStyle.logoandtext}>
				<div className={FooterStyle.imageattrs}>
					<Image 
						src={"/images/emptydub_logo_t.png"} 
						height={50} 
						width={150}
						aria-label='emptydub-production-logo'
						alt="emptydub-logo" 
						priority
						layout='responsive'
						className={FooterStyle.image}
						/>
				</div>
				<div className={FooterStyle.logotext}>
					Copyright © 2022, Emptydub Products
				</div>
			</div>
			<div className={FooterStyle.texts}>
				Some graphical elements and social icons were sourced and derived from asset sources at https://flaticon.com/
			</div>
		</div>
	)
}
export default Footer;
