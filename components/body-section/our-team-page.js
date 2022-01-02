import React from 'react';
import OurTeamStyles from './our-team-page.module.css';
import EmployeeList from './our-team-page-addins/employee-list';

function OurTeam() {

	return (
		<div className="row">
			<div className={OurTeamStyles.titleSection}>
				<h2>Why We Do It</h2>
				<p>
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
					<p>
						Thanks for your time, 
						<br/>
						<br />
						<strong>Tanner Danielson, CEO - H&W Stair and Rail</strong>
					</p>
				</p>
			</div>
			
			<div className={OurTeamStyles.members}>
				<div className={OurTeamStyles.employeeList}>
					<EmployeeList />
				</div>
			</div>
		</div>
	)
}

export default OurTeam
