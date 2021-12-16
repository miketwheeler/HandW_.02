// import Link from 'next/link';
import React from 'react';
import { useState, setState, useEffect } from 'react';
import NavbarStyle from './mynavbar.module.css';
import Image from 'next/image';
import { LinkContainer } from 'react-router-bootstrap';
// import { Link } from 'react-router-dom';
// import Link from 'next/link';
import { Row, Col, Navbar, Nav, Container } from 'react-bootstrap';

function MyNavbar(props) {
	const [dimensionWidth, setDimensionWidth] = useState(window.innerWidth);
	const updateSize = () => setDimensionWidth(window.innerWidth);
	useEffect(() => (window.onresize = updateSize), []);
	// console.log(dimensionWidth);

	return (
		<div>
			<Row className="mt-2 mb-3 ml-2 mr-2">
				<Col className="col-7 col-md-11 m-auto mt-4" >
					<Image 
						src="/images/hw_mainlogo.png"
						alt="Company Logo"
						width={335}
						height={160}
						priority={true}
						intrinsic
						className={NavbarStyle.logoImage}
					/>
				</Col>
				<Col className="col-5 col-md-12">
					<Navbar expand="md" variant="light">
						<Container>
							<Navbar.Toggle 
								className="ms-auto" 
								aria-controls="navbar-nav"
								style={{
									marginTop: '50%',
									marginRight: '20px',
								}}
							/>
							<Navbar.Collapse id="navbar-nav">
								<Nav 
									defaultActiveKey='null'
									className=""
									// className={NavbarStyle.naviList} 
									style={{ 
										display: 'flex', 
										justifyContent: 'spaceEvenly',
										fontSize: '32px',
										fontWeight: '2rem',
										// '& a:hover': {
										// 	borderBottom: '2.2px solid rgba(71, 71, 71, 0.719)',
										// 	color: 'rgb(12, 12, 12)',
										// 	cursor: 'pointer',
										// },
									}}
									>
										{/* md and DOWN; display nav menu as ... */}
									<div 
										className="d-block d-md-none d-lg-none d-xl-none d-xxl-none fs-2" 
										style={{
											width: 'fitContent',
											padding: '30px',
											display: 'flex',
											flexDirection: 'column',
											position: 'absolute',
											zIndex: '100',
											backgroundColor: 'white',
											borderRadius: '6px',
											boxShadow: '2px 2px 2px darkGrey',
											'& a:hover': {
											borderBottom: '2.2px solid rgba(71, 71, 71, 0.719)',
											color: 'rgb(12, 12, 12)',
											cursor: 'pointer',
										}}}
										>
										<LinkContainer to="/">
											<Nav.Link className=" active" aria-current="/">
													Home
											</Nav.Link>
										</LinkContainer>
										<LinkContainer to="/quotes-estimates">
											<Nav.Link className={NavbarStyle.linkText}>
													Quotes
											</Nav.Link>
										</LinkContainer>
										<LinkContainer to="/services">
											<Nav.Link className={NavbarStyle.linkText}>
													Services
											</Nav.Link>
										</LinkContainer>
										<LinkContainer to="/our-team">
											<Nav.Link className={NavbarStyle.linkText}>
													Our Team
											</Nav.Link>
										</LinkContainer>
									</div>
									{/* md and UP; display nav menu as ... */}
									<div 
										className="d-none d-md-flex fs-2"
										style={{
											'& a:hover': {
											borderBottom: '2.2px solid rgba(71, 71, 71, 0.719)',
											color: 'rgb(12, 12, 12)',
											cursor: 'pointer',
										}}} 
										>
										<LinkContainer to="/">
											<Nav.Link className="nav-link active" aria-current="/">
													Home
											</Nav.Link>
										</LinkContainer>
										<LinkContainer to="/quotes-estimates">
											<Nav.Link className={NavbarStyle.linkText}>
													Quotes
											</Nav.Link>
										</LinkContainer>
										<LinkContainer to="/services">
											<Nav.Link className={NavbarStyle.linkText}>
													Services
											</Nav.Link>
										</LinkContainer>
										<LinkContainer to="/our-team">
											<Nav.Link className={NavbarStyle.linkText}>
													Our Team
											</Nav.Link>
										</LinkContainer>
									</div>
								</Nav>
							</Navbar.Collapse>
						</Container>
					</Navbar>
				</Col>
			</Row>
		</div>
	);
}
export default MyNavbar;