import React from 'react';
import FooterStyle from '../styles/componentStyles/footer.module.css';


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
				<div className={FooterStyle.logotext}>
					Copyright © 2022, <a onClick={() => onClickUrl('https://miketwheeler.github.io')}>mikewheeler</a>
				</div>
			</div>
			<div className={FooterStyle.texts}>
				Some icons were sourced from public asset resources at
				<a onClick={() => onClickUrl('https://flaticon.com')}>
					&thinsp;FlatIcon.com
				</a>
			</div>
		</div>
	)
}

export default Footer;