// import Link from 'next/link';
import NavbarStyle from './navbar.module.css'
import Image from 'next/image'
import { Switch, Link, Route } from 'react-router-dom';


function Navbar(props) {
	return (
		<div className={NavbarStyle.wrapper}>
			<header className={NavbarStyle.header}>
				<div className={NavbarStyle.logo}>
					<Link to='/'>
						<Image 
							src="/images/hw_mainlogo.png"
							alt="Company Logo"
							width={310}
							height={150}
							priority={true}
						/>
					</Link>
				</div>
					<ul className={NavbarStyle.navigation}>
						<li><Link to='/'>Home</Link></li>
						<li><Link to='/quotes-estimates'>Quotes & Estimates</Link></li>
						<li><Link to='/services'>Services</Link></li>
						<li><Link to='/our-team'>Our Team</Link></li>
					</ul>
			</header>
		</div>
	);
}
export default Navbar