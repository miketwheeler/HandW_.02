import React from 'react';
import ProjectStyles from '../styles/pageStyles/Projects.module.css';
import DocStyles from '../styles/contentStyles.module.css'
import ProjectList from '../components/ProjectCards';
import dynamic from 'next/dynamic';


const GettaQuoteButton = dynamic(() => import('../components/GettaQuoteButton'));


function Projects() {
	return (
		<div className={DocStyles.bodycontainer}>
			<div className={ProjectStyles.titleSection}>
				<h2 className={DocStyles.pageheader}>Why We Do It</h2>
				<div className={ProjectStyles.note}>
					<br />
					<p>Hello,</p>
					<br />
					<p>
						As welders we noticed our abilities set us apart.  After working at other companies, 
						we found ourselves asking: "Why not us?". We wanted to <i>forge</i> our own path, finally getting 
						the opportunity to put our name on the work we are so proud of. From the team at H&W Stair 
						and Rail - we're ready to put our name on your next project and make your vision a reality.
					</p>
					<br />
					<div>
						<p>Feel free to reach us at any time,</p> 
						<br />
						<p><strong>The whole team at H&W Stair and Rail</strong></p>
					</div>
				</div>
				<div className={DocStyles.bodybar}>
					<h2 className={ProjectStyles.projectHeaderText}>Dozens of projects completed, 100% satisfaction!</h2>
				</div>
			</div>
			<div className={ProjectStyles.projects}>
					<h2 className={DocStyles.pageheader}>Projects & Our Facility</h2>
					<ProjectList />				
			</div>
			{/* Get a quote button */}
			<GettaQuoteButton />
		</div>
	)
}

export default Projects;
