import React from 'react';
import ProjectStyles from './Projects.module.css';
import ProjectList from '../components/body-section/projects-page-addins/project-list';
import DocStyles from '../styles/contentStyles.module.css'
import GettaQuoteButton from '../components/globally-applied/GettaQuoteButton';


function Projects() {
	return (
		<div className={DocStyles.bodycontainer}>
			<div className={ProjectStyles.titleSection}>
				<h2 className={DocStyles.pageheader}>Why We Do It</h2>
				<div className={ProjectStyles.note}>
					<br />
					<p>Patrons,</p>
					<br />
					<p>
						As welders we noticed our abilities set us apart.  After working at other companies, 
						we found ourselves asking: "Why not us?". We felt it was necessary that we apply our vision while 
						having the opportunity to put our name on the work we were so proud of. From the team at H&W Stair 
						and Rail - we're ready to provide you the best results available.
					</p>
					<br />
					<p>
						Invest in us, we'll invest in you. 
					</p> 
					<br />
					<div>
						<p>Thank you for your time and visiting us today,</p> 
						<br/>
						<br />
						<p><strong>The whole team at H&W Stair and Rail</strong></p>
					</div>
				</div>
				<div className={DocStyles.bodybar}>
					<h2 className={ProjectStyles.projectHeaderText}>Dozens of projects completed, 100% satisfaction rate to boot!</h2>
				</div>
			</div>
			<div className={ProjectStyles.projects}>
				<div className={ProjectStyles.projectList}>
				<h2 className={DocStyles.pageheader}>Projects & Our Facility</h2>
					<ProjectList />
				</div>
				
			</div>
			
			{/* Get a quote button */}
			<GettaQuoteButton />

		</div>
	)
}

export default Projects;
