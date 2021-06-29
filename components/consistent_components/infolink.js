import { Icon } from '@material-ui/core'
import React from 'react'
import InfolinkStyle from './infolink.module.css'
import Image from 'next/image'

function Infolink() {
	return (
		<div className={InfolinkStyle.objparams}>
			<div className={InfolinkStyle.infobox}>
				<div className={InfolinkStyle.contactus}>
					<h2>Contact Us</h2>
				</div>
				<div className={InfolinkStyle.reachus}>
					<p>Reach us by phone 8:00am-6:00pm(CST):</p>
				</div>
				<div className={InfolinkStyle.number}>
					<h2>+1(888) 777-2121</h2>
				</div>
				<div className={InfolinkStyle.orbar}>
					<p>or</p>
				</div>
				<div className={InfolinkStyle.emailus}>
					<p>Email us anytime:</p>
				</div>
				<div className={InfolinkStyle.email}>
					<h2>HMstair&rail@gmail.com</h2>
				</div>
			</div>
			<div className={InfolinkStyle.socialbox}>
				<div className={InfolinkStyle.socialheader}>
					<h2>Follow us on Social Media</h2>
				</div>
				<div className={InfolinkStyle.socialicons}>
					{/* Need click before/after and links */}
					<Image 
						src={"/images/icons/2x/2x-facebook.png"} 
						height={"76px"} 
						width={"76px"}
						alt={"facebook"}
						/>
					<Image 
						src={"/images/icons/2x/2x-instagram.png"} 
						height={"76px"} 
						width={"76px"}
						alt={"instagram"}
						/>
					<Image 
						src={"/images/icons/2x/2x-linkedin.png"} 
						height={"76px"} 
						width={"76px"}
						alt={"linked in"}
						/>
					<Image 
						src={"/images/icons/2x/2x-twitter.png"} 
						height={"76px"} 
						width={"76px"}
						alt={"twitter"}
						/>
					<Image 
						src={"/images/icons/2x/2x-youtube.png"} 
						height={"76px"} 
						width={"76px"}
						alt={"you tube"}
						/>
				</div>
			</div>
			<div className={InfolinkStyle.businessbox}>
				<div className={InfolinkStyle.businessicon}>
					<Image 
						src="/images/hw_mainlogo.png"
						alt="Company Logo"
						width={260}
						height={115}
						alt={"H & W Logo"}
						/>
				</div>
				<div className={InfolinkStyle.businessdetail}>
					<p>
						Owned and operated in Lincoln, NE<br/>
						Business Lic. #000-000101001010<br/>
						BBB, Hardware Assoc. Members Alliance
					</p>
				</div>
			</div>
		</div>
	)
}

export default Infolink
