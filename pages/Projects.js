import React from 'react';
import ProjectStyles from './Projects.module.css';
import ProjectList from '../components/body-section/projects-page-addins/project-list';
import DocStyles from '../styles/contentStyles.module.css'


function Projects() {

	return (
		<div className={DocStyles.bodycontainer}>
			<div className={ProjectStyles.titleSection}>
				<h2 className={DocStyles.pageheader}>Why We Do It</h2>
				<div>
					As welders we noticed our abilities rose quickly.  After working many hours at other companies, 
					we asked ourselves: "Why not us?". We felt we could apply a greater mission and put fourth 
					work we were proud of. <br/> This was it, apply myself in the way I thought was the best way, 
					and hopefully a team would find their way to me, ready to carry that mission with them in the same way.
					Speaking for the team - we are ready to give the effort to acheive the best results that your money can 
					buy. 
					<br /><br /> 
					<p>
						Invest in us, we will invest in you. 
					</p> 
					<br />
					<div>
						Thanks for your time, 
						<br/>
						<br />
						<p> - The Team at H&W Stair and Rail</p>
					</div>
				</div>
			</div>
			
			<div className={ProjectStyles.projects}>
				<div className={DocStyles.bodybar}>
					<h2 className={ProjectStyles.projectHeaderText}>Dozens of Projects Completed, 100% Satisfaction Delivered</h2>
				</div>
				<div className={ProjectStyles.projectList}>
					<ProjectList />
				</div>
			</div>
		</div>
	)
}

export default Projects;
