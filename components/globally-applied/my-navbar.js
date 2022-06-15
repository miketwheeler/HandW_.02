import React, { useEffect, useState } from 'react';
import MyNavbarStyle from './my-navbar.module.css';
import Image from 'next/image';
import { useLocation } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';
import { Row, Col, Navbar, Nav, NavbarBrand } from 'react-bootstrap';


let usePathname = () => {
	const location = useLocation().pathname;
	return location;
}
const navH2Style = {
	fontSize: '32px', 
	color: 'white', 
	height: '40px', 
	marginLeft: '11px', 
	alignContent: 'center', 
	borderTop: '2px solid transparent'
}
const navItemActiveStyle = {
	fontWeight: 'bolder',
	borderBottom: '1.5px solid rgba(255, 255, 255, 0.716)'
}
const toggleStyle = {
	fontSize: '1.2rem', 
	borderColor: 'grey', 
	color: 'grey', 
	borderWidth: '1px', 
	top: '10px'
}
const tabSet = {
	tabData: [
		{ id: "home", linkto: "/", tabText: "Home" },
		{ id: "quotes-estimates", linkto: "/quotes-estimates", tabText: "Quotes" },
		{ id: "services", linkto: "/services", tabText: "Services" },
		{ id: "projects", linkto: "/projects", tabText: "Projects" },
	]
}

function MyTab(props) {
	return(
		<>
			{
				props.layout === true
				? // Full Width Tab (med and UP)
				<div className={MyNavbarStyle.linkSurround}>
					<LinkContainer id={`${props.id}-expanded`} exact to={props.linkto} className={MyNavbarStyle.linkBox} activeStyle={navItemActiveStyle}>
						<Nav.Link aria-label={`navigate-to-${props.id}-page`} className={MyNavbarStyle.linkText}>
							{props.tabText}
						</Nav.Link>
					</LinkContainer>
				</div>
				: // Mobile Hamburger Tab (MED and DOWN)
				<LinkContainer id={`${props.id}-collapsed`} exact to={props.linkto} activeStyle={navItemActiveStyle}>
					<Nav.Link onClick={() => setExpanded(false)} aria-label={`navigate-to-${props.id}-page`} className={MyNavbarStyle.linkText}>
						{props.tabText}
					</Nav.Link>
				</LinkContainer>
			}
		</>
	)
};

// Creates a Menu of Tabs based on state of the webpage width (Mobile or Fullwidth)
function assembleMenu(layout, list) {
	return (
		<>
			{
				list.tabData.map((item, i) => (
					<div key={i}>
						<MyTab layout={layout} id={item.id} linkto={item.linkto} tabText={item.tabText} />
					</div>
				))
			}
		</>
	)
}



function MyNavbar() {
	const [expanded, setExpanded] = useState(false);
	const [dir, setDir] = useState('Home')

	useEffect(() => {
		location === '/' 
		? setDir('Home') 
		: location === '/quotes-estimates' 
		? setDir('Quotes') 
		: location=== '/services'
		? setDir('Services')
		: location === '/projects'
		? setDir('Projects')
		: null
	}, [location])
	
	return (
		<div style={{ padding: '0px 10px', boxShadow: '0px 8px 8px grey' }} >
			<Row className="pt-2 pb-3">
				<Col className="ms-3 mt-4 me-2" >
					<div className={MyNavbarStyle.imageattrs}>
						<Image 
							src="/images/hw_mainlogo.png"
							alt="Company Logo"
							width={335}
							height={162}
							priority={true}
							/>
					</div>
				</Col>
				
			</Row>
			<Row className={MyNavbarStyle.contbox}>
				<Col className="col">
					<Navbar expand="md" expanded={expanded} className="navbar-dark" >
						<NavbarBrand className="d-md-none d-lg-none d-xl-none d-xxl-none" aria-label='current-tab'>
							<h2 style={navH2Style}>
								{ dir }
							</h2>
						</NavbarBrand>
						<Navbar.Toggle
							id="navTogglerButton"
							onClick={() => setExpanded(!expanded)}
							className="ms-auto me-4" 
							aria-label='navbar-toggle'
							aria-controls="navbar-nav"
							style={toggleStyle}
							/>
						<Navbar.Collapse className="justify-content-center" id="navbar-nav" >
							<Nav defaultActiveKey="/" activeKey={usePathname} style={{ fontSize: '42px', margin: '0px 10px'}}>
								{/* Mobile Hamburger Menu (med and down) */}
								<div className="flexi d-md-none d-lg-none d-xl-none d-xxl-none fs-2 mt-3 mb-3">
									{ assembleMenu(false, tabSet) }
								</div>
								{/* Full Width Tabs (med and up) */}
								<div className="d-none d-md-flex fs-2">
									{ assembleMenu(true, tabSet) }
								</div>
							</Nav>
						</Navbar.Collapse>
					</Navbar>
				</Col>
			</Row>
		</div>
	);
}
export default MyNavbar;