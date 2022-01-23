import React from 'react';
import { useState, setState } from 'react';
import MyNavbarStyle from './my-navbar.module.css';
import Image from 'next/image';
import { LinkContainer } from 'react-router-bootstrap';
import { Row, Col, Navbar, Nav, Container } from 'react-bootstrap';



function MyNavbar(props) {
	const [expanded, setExpanded] = useState(false);
	
	return (
		<div>
			<Row className="mt-2">
				<Col className="ms-3 mt-4 me-2" >
					<Image 
						src="/images/hw_mainlogo.png"
						alt="Company Logo"
						width={335}
						height={160}
						priority={true}
					/>
				</Col>
			</Row>
			<Row>
				<Col className="col">
					<Navbar expand="md" expanded={expanded}>
						<Navbar.Toggle
							id="navTogglerButton"
							onClick={() => setExpanded(!expanded)}
							className="ms-auto me-4 mb-4" 
							aria-controls="navbar-nav"
							style={{marginTop: '-5rem', backgroundColor: 'transparent', fontSize: '1.5rem', borderColor: 'lightGrey'}}
						/>
						<Navbar.Collapse className="justify-content-center" id="navbar-nav" >
							<Nav defaultActiveKey="/" activeKey={window.location.pathname} style={{ fontSize: '38px', margin: '0px 10px'}}>
								{/* //////////////////////////////////////////////////////////////// */}
								{/*    MINI-> md and DOWN; display nav menu as hamburger menu        */}
								{/* //////////////////////////////////////////////////////////////// */}
								<div className="flexi d-md-none d-lg-none d-xl-none d-xxl-none fs-2">
									<LinkContainer id="home" exact to="/" activeStyle={{fontWeight: 'bolder', borderBottom: '1.5px solid rgba(71, 71, 71, 0.719)'}}>
										<Nav.Link onClick={() => setExpanded(false)} className={MyNavbarStyle.linkText}>
											Home
										</Nav.Link>
									</LinkContainer>
									<LinkContainer id="quotes-estimates" to="/quotes-estimates" activeStyle={{fontWeight: 'bolder', borderBottom: '1.5px solid rgba(71, 71, 71, 0.719)'}}>
										<Nav.Link onClick={() => setExpanded(false)} className={MyNavbarStyle.linkText}>
											Quotes
										</Nav.Link>
									</LinkContainer>
									<LinkContainer id="services" to="/services" activeStyle={{fontWeight: 'bolder', borderBottom: '1.5px solid rgba(71, 71, 71, 0.719)'}}>
										<Nav.Link onClick={() => setExpanded(false)} className={MyNavbarStyle.linkText}>
											Services
										</Nav.Link>
									</LinkContainer>
									<LinkContainer id="projects" to="/projects" activeStyle={{fontWeight: 'bolder', borderBottom: '1.5px solid rgba(71, 71, 71, 0.719)'}}>
										<Nav.Link onClick={() => setExpanded(false)} className={MyNavbarStyle.linkText}>
											Projects
										</Nav.Link>
									</LinkContainer>
								</div>
								{/* //////////////////////////////////////////////////////////////////////// */}
								{/*     Full -> md and UP; display nav menu as full width navbar tabs        */}
								{/* //////////////////////////////////////////////////////////////////////// */}
								<div className="d-none d-md-flex fs-2">
									<div className={MyNavbarStyle.linkSurround}>
										<LinkContainer id="home" exact to="/" className={MyNavbarStyle.linkBox} activeStyle={{fontWeight: 'bolder', borderBottom: '1.5px solid rgba(71, 71, 71, 0.719)'}}>
											<Nav.Link className={MyNavbarStyle.linkText}>
												Home
											</Nav.Link>
										</LinkContainer>
									</div>
									<div className={MyNavbarStyle.linkSurround}>
										<LinkContainer id="quotes-estimates" to="/quotes-estimates" className={MyNavbarStyle.linkBox} activeStyle={{fontWeight: 'bolder', borderBottom: '1.5px solid rgba(71, 71, 71, 0.719)'}}>
											<Nav.Link className={MyNavbarStyle.linkText}>
												Quotes
											</Nav.Link>
										</LinkContainer>
									</div>
									<div className={MyNavbarStyle.linkSurround}>
										<LinkContainer id="services" to="/services" className={MyNavbarStyle.linkBox} activeStyle={{fontWeight: 'bolder', borderBottom: '1.5px solid rgba(71, 71, 71, 0.719)'}}>
											<Nav.Link className={MyNavbarStyle.linkText}>
												Services
											</Nav.Link>
										</LinkContainer>
									</div>
									<div className={MyNavbarStyle.linkSurround}>
										<LinkContainer id="projects" to="/projects" className={MyNavbarStyle.linkBox} activeStyle={{fontWeight: 'bolder', borderBottom: '1.5px solid rgba(71, 71, 71, 0.719)'}}>
											<Nav.Link className={MyNavbarStyle.linkText}>
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