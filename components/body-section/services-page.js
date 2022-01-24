import React from 'react';
import { useHistory } from 'react-router-dom';
import ServiceStyles from './services-page.module.css';
import { Button } from '@material-ui/core'


function Services() {

	const history = useHistory();

	function goToQuote(event) {
		event.preventDefault();
		history.push("/quotes-estimates");
	}

	return (
		<div>
			<div className={ServiceStyles.serviceContainer}>
			<h2 className={ServiceStyles.serviceHeader}>Services</h2>
				{/* Services Listed */}
				<div className={ServiceStyles.serviceSection}>
					<div className={ServiceStyles.serviceColumn1}>
						<h3>Installs</h3>
						<div className={ServiceStyles.section}>
							We implement custom or pre-template designs. This makes our 
							process flexible and ultimately gives you the control. We generalize this as a complete project. The entrance to your business is important for your image, its a subtle but essencial piece that surely will round off your aesthetic.
						</div>
						<h6>Rail & Ballast</h6>
						<div className={ServiceStyles.section}>
							tortor posuere ac ut consequat semper viverra nam libero justo laoreet sit amet cursus sit amet dictum sit 
							amet justo donec enim diam vulputate ut pharetra sit amet aliquam id diam maecenas ultricies mi eget mauris 
							pharetra et ultrices neque ornare aenean euismod elementum nisi quis eleifend quam adipiscing vitae
						</div>
						<h6>Stairs</h6>
						<div className={ServiceStyles.section}>
							libero justo laoreet sit amet cursus sit amet dictum sit amet justo donec enim diam vulputate ut pharetra sit 
							amet aliquam id diam maecenas ultricies mi eget mauris pharetra et ultrices neque ornare aenean euismod elementum 
							nisi quis eleifend quam adipiscing vitae
						</div>
					</div>
					
					{/* column divider */}
					<div className={ServiceStyles.divider1}></div>

					<div className={ServiceStyles.serviceColumn2}>
						<h3>Restorations</h3>
						<div className={ServiceStyles.section}>
							Have a project where a refresh is needed? We can fabricate portions or overhaul an existing structure.
						</div>
						<h6>Portional Replacements</h6>
						<div className={ServiceStyles.section}>
							tortor posuere ac ut consequat semper viverra nam libero justo laoreet sit amet cursus sit amet dictum sit 
							amet justo donec enim diam vulputate ut pharetra sit amet aliquam id diam maecenas ultricies mi eget mauris 
							pharetra et ultrices neque ornare aenean euismod elementum nisi quis eleifend quam adipiscing vitae
						</div>
						<h6>Damage Repair</h6>
						<div className={ServiceStyles.section}>
							libero justo laoreet sit amet cursus sit amet dictum sit amet justo donec enim diam vulputate ut pharetra sit 
							amet aliquam id diam maecenas ultricies mi eget mauris pharetra et ultrices neque ornare aenean euismod elementum 
							nisi quis eleifend quam adipiscing vitae
						</div>
					</div>

					{/* column divider */}
					<div className={ServiceStyles.divider2}></div>

					<div className={ServiceStyles.serviceColumn3}>
						<h3>Finishing</h3>
						<div className={ServiceStyles.section}>
							Got rust? Need paint? We can refinish an existing structure too! Disclosure: we may still want to promote what we do best, offer a complete project we are proud of!
						</div>
						<h6>Sealing & Paint</h6>
						<div className={ServiceStyles.section}>
							tortor posuere ac ut consequat semper viverra nam libero justo laoreet sit amet cursus sit amet dictum sit 
							amet justo donec enim diam vulputate ut pharetra sit amet aliquam id diam maecenas ultricies mi eget mauris 
							pharetra et ultrices neque ornare aenean euismod elementum nisi quis eleifend quam adipiscing vitae
						</div>
						<h6></h6>
						<div className={ServiceStyles.section}>
							libero justo laoreet sit amet cursus sit amet dictum sit amet justo donec enim diam vulputate ut pharetra sit 
							amet aliquam id diam maecenas ultricies mi eget mauris pharetra et ultrices neque ornare aenean euismod elementum 
							nisi quis eleifend quam adipiscing vitae
						</div>
					</div>
				</div>

				{/* Get a Quote Button */}
				<div className={ServiceStyles.buttonContainer}>
					<Button className={ServiceStyles.gettaQuoteButton}
						variant="contained"
						// color="primary"
						style={{backgroundColor: 'rgb(145, 71, 22, 0.940)', color: 'white'}}
						size="large"
						onClick={(e) => goToQuote(e)}
						>
							Get a Quote
					</Button>
				</div>
			</div>
		</div>
	)
}

export default Services;
