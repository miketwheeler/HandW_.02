import React from 'react';
import ProjectStyles from './Projects.module.css';
import ProjectList from '../components/body-section/projects-page-addins/project-list';


function Projects() {

	return (
		<div className="row">
			<div className={ProjectStyles.titleSection}>
				<h2>Why We Do It</h2>
				<div>
					As a welder I noticed my abilities rose quickly.  After working many hours at another company, 
					I asked myself: "Why not make a company to do the same myself?". I felt I could apply a greater mission 
					to the work I wanted to be proud of. This was it, apply myself in the way I thought was the best way, 
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
						<p> - Tanner Danielson, CEO - H&W Stair and Rail</p>
					</div>
				</div>
			</div>
			
			<div className={ProjectStyles.projects}>
				<div className={ProjectStyles.projectHeader}>
					<h2 className={ProjectStyles.projectHeaderText}>Our Work & Faculties</h2>
				</div>
				<div className={ProjectStyles.projectList}>
					<ProjectList />
				</div>
			</div>
		</div>
	)
}

export default Projects;
