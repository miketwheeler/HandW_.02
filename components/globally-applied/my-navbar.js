import React, { useState } from 'react';
import MyNavbarStyle from './my-navbar.module.css';
import Image from 'next/image';
import { useLocation } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';
import { Row, Col, Navbar, Nav, NavbarBrand } from 'react-bootstrap';


let usePathname = () => {
	const location = useLocation();
	return location.pathname;
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

function MyNavbar() {
	const [expanded, setExpanded] = useState(false);
	
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
								{
									location.pathname === '/' 
									? 'Home' 
									: location.pathname === '/quotes-estimates' 
									? 'Quotes' 
									: location.pathname === '/services'
									? 'Services'
									: location.pathname === '/projects'
									? 'Projects'
									: null
								}
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
								{/* //////////////////////////////////////////////////////////////// */}
								{/*    MINI-> md and DOWN; display nav menu as hamburger menu        */}
								{/* //////////////////////////////////////////////////////////////// */}
								
								<div className="flexi d-md-none d-lg-none d-xl-none d-xxl-none fs-2 mt-3 mb-3">
									<LinkContainer id="home-collapsed" exact to="/" activeStyle={navItemActiveStyle}>
										<Nav.Link onClick={() => setExpanded(false)} aria-label='navigate-home' className={MyNavbarStyle.linkText}>
											Home
										</Nav.Link>
									</LinkContainer>
									<LinkContainer id="quotes-estimates-collapsed" to="/quotes-estimates" activeStyle={navItemActiveStyle}>
										<Nav.Link onClick={() => setExpanded(false)} aria-label='navigate-quotes-page' className={MyNavbarStyle.linkText}>
											Quotes
										</Nav.Link>
									</LinkContainer>
									<LinkContainer id="services-collapsed" to="/services" activeStyle={navItemActiveStyle}>
										<Nav.Link onClick={() => setExpanded(false)} aria-label='navigate-services-page' className={MyNavbarStyle.linkText}>
											Services
										</Nav.Link>
									</LinkContainer>
									<LinkContainer id="projects-collapsed" to="/projects" activeStyle={navItemActiveStyle}>
										<Nav.Link onClick={() => setExpanded(false)} aria-label='navigate-projects-page' className={MyNavbarStyle.linkText}>
											Projects
										</Nav.Link>
									</LinkContainer>
								</div>
								{/* //////////////////////////////////////////////////////////////////////// */}
								{/*     Full -> md and UP; display nav menu as full width navbar tabs        */}
								{/* //////////////////////////////////////////////////////////////////////// */}
								<div className="d-none d-md-flex fs-2">
									<div className={MyNavbarStyle.linkSurround}>
										<LinkContainer id="home-expanded" exact to="/" className={MyNavbarStyle.linkBox} activeStyle={navItemActiveStyle}>
											<Nav.Link aria-label='navigate-home' className={MyNavbarStyle.linkText}>
												Home
											</Nav.Link>
										</LinkContainer>
									</div>
									<div className={MyNavbarStyle.linkSurround}>
										<LinkContainer id="quotes-estimates-expanded" to="/quotes-estimates" className={MyNavbarStyle.linkBox} activeStyle={navItemActiveStyle}>
											<Nav.Link aria-label='navigate-quotes-page' className={MyNavbarStyle.linkText}>
												Quotes
											</Nav.Link>
										</LinkContainer>
									</div>
									<div className={MyNavbarStyle.linkSurround}>
										<LinkContainer id="services-expanded" to="/services" className={MyNavbarStyle.linkBox} activeStyle={navItemActiveStyle}>
											<Nav.Link aria-label='navigate-services-page' className={MyNavbarStyle.linkText}>
												Services
											</Nav.Link>
										</LinkContainer>
									</div>
									<div className={MyNavbarStyle.linkSurround}>
										<LinkContainer id="projects-expanded" to="/projects" className={MyNavbarStyle.linkBox} activeStyle={navItemActiveStyle}>
											<Nav.Link aria-label='navigate-projects-page' className={MyNavbarStyle.linkText}>
												Projects
											</Nav.Link>
										</LinkContainer>
									</div>
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