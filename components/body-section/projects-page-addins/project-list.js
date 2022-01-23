import React from 'react';
import Image from 'next/image';
import ProjectStyles from './project-list.module.css';


// Alternating stylings applied to the card list (entropic way of getting it done - allows for toggle in component (in-house))
// Reversed styles
const cardInnerStyleAlt = {
    display: 'flex', 
    flexDirection: 'row-reverse', 
    textAlign: 'left',
    justifyContent: 'space-between', 
    margin: '0px auto',
    width: '78%',
}
// Forward Display 
const cardInnerStyleStd = {
    display: 'flex', 
    textAlign: 'left',
    margin: '0px auto',
    width: '84%',
}
// Text Content
const captionStyle1 = {
    // marginLeft: '10px',
    fontWeight: 'bolder'
}
const captionStyle2 = {
    marginLeft: '10%',
}
// Main component exported to the appropriate 'Our Team' section
// Assembles a series of cards into a div for the imported & rendered component
function ProjectList() {
    // Data - List of Employees (props)
	const projects = [
		{ 
            id: 1,
            job: true,
            title: "Recent Equipment Addition", 
            type: "Equipment",
            description: "10 years welding and fabrication experience, entreprenuer",
            image: '/images/services-imgs/forklift.png',
        },
        { 
            id: 2,
            job: true,
            title: "Custom & Complex Fabrication", 
            type: "Fabrication Example",
            description: "6 years welding experience, 2 years blacksmith",
            image: '/images/services-imgs/raildesign_2_1.jpg',
        },
        { 
            id: 3,
            job: true,
            title: "Straight Railing", 
            type: "Fabrication Example",
            description: "Buisinees book management, tax preparation",
            image: '/images/services-imgs/raildesign_3.jpg',
        },
        { 
            id: 4,
            job: true,
            title: "Straight Railing", 
            type: "Fabrication Example",
            description: "Interior and Exterior Fabrication",
            image: '/images/services-imgs/raildesign_5.jpg',
        },
        { 
            id: 5,
            job: true,
            title: "Custom Design", 
            type: "Fabrication Example",
            description: "Interior and Exterior Fabrication",
            image: '/images/services-imgs/raildesign_6.jpg',
        },
        { 
            id: 6,
            job: true,
            title: "Custom Fabrication", 
            type: "Fabrication Example",
            description: "Interior and Exterior Fabrication, metalergy certified",
            image: '/images/services-imgs/raildesign_7.jpg',
        },
        { 
            id: 7,
            job: true,
            title: "Finished Order", 
            type: "Fabrication Example",
            description: "Interior and Exterior Fabrication, metalergy certified",
            image: '/images/services-imgs/railstack.jpg',
        },
        { 
            id: 8,
            job: true,
            title: "Installed Railing", 
            type: "Fabrication Example",
            description: "Interior and Exterior Fabrication, metalergy certified",
            image: '/images/services-imgs/railwork_1.png',
        },
        { 
            id: 9,
            job: true,
            title: "Finished Railing", 
            type: "Fabrication Example",
            description: "Interior and Exterior Fabrication, metalergy certified",
            image: '/images/services-imgs/railwork_2.jpg',
        },
        { 
            id: 10,
            job: true,
            title: "Welding Railing", 
            type: "Fabrication Example",
            description: "Interior and Exterior Fabrication, metalergy certified",
            image: '/images/services-imgs/railwork.jpg',
        },
        { 
            id: 11,
            job: true,
            title: "Weld", 
            type: "Fabrication Example",
            description: "Interior and Exterior Fabrication, metalergy certified",
            image: '/images/services-imgs/weld.jpg',
        },
	]
	
	return (
        <div className={ProjectStyles.projectListWrapper}>
			{projects.map((item, i) => <ProjectCard key={i} item={item}/>)}
		</div>
	)
}

// Individual card created from passed props- returns and is added to the employee collection
function ProjectCard(props) {
    return (
        <div className={ProjectStyles.cards}>
			<div style={
                props.item.id % 2 == 0 
                ? 
                cardInnerStyleAlt
                : 
                cardInnerStyleStd
                }>
                <div className={ProjectStyles.imageContainer}>
                    <Image
                        src={props.item.image} 
                        width={"240px"}
                        height={"260px"}
                        alt={"services icons"}
                        priority={true}
                        className={ProjectStyles.images}
                        />
                </div>
                <div className={ProjectStyles.caption}>
                    <div style={
                            props.item.id % 2 === 0 
                            ? 
                            captionStyle1 
                            : 
                            captionStyle2
                        }>
                        <h3>{props.item.title}</h3>
                        <p><strong>Role: </strong> {props.item.type}</p>
                        <p><strong>Description: </strong> {props.item.description}</p>
                    </div>
                </div>
            </div>
		</div>
    )
}

export default ProjectList;



// function EmployeeList() {
//     // Data - List of Employees (props)
// 	const employees = [
// 		{ 
//             id: 1,
//             eotm: false,
//             name: "Tanner Danielson", 
//             role: "CEO",
//             qualifications: "10 years welding and fabrication experience, entreprenuer",
//             image: '/placeholder_images/avatar_placeholder.png',
//         },
//         { 
//             id: 2,
//             eotm: false,
//             name: "Yoda", 
//             role: "COO",
//             qualifications: "6 years welding experience, 2 years blacksmith",
//             image: '/placeholder_images/avatar_placeholder.png',
//         },
//         { 
//             id: 3,
//             eotm: true,
//             name: "Darth Vader", 
//             role: "APN",
//             qualifications: "Buisinees book management, tax preparation",
//             image: '/placeholder_images/avatar_placeholder.png',
//         },
//         { 
//             id: 4,
//             eotm: false,
//             name: "Han Solo", 
//             role: "Employee",
//             qualifications: "Interior and Exterior Fabrication, electronics certified",
//             image: '/placeholder_images/avatar_placeholder.png',
//         },
//         { 
//             id: 5,
//             eotm: false,
//             name: "Lea Organa", 
//             role: "Employee",
//             qualifications: "Interior and Exterior Fabrication",
//             image: '/placeholder_images/avatar_placeholder.png',
//         },
//         { 
//             id: 6,
//             eotm: false,
//             name: "Luke Skywalker", 
//             role: "Employee",
//             qualifications: "Interior and Exterior Fabrication",
//             image: '/placeholder_images/avatar_placeholder.png',
//         },
//         { 
//             id: 7,
//             eotm: false,
//             name: "Chewbacca", 
//             role: "Employee",
//             qualifications: "Interior and Exterior Fabrication, metalergy certified",
//             image: '/placeholder_images/avatar_placeholder.png',
//         },
// 	]
	
// 	return (
//         <div className={EmployeeListStyles.employeeListWrapper}>
// 			{employees.map((item, i) => <EmployeeCard key={i} item={item}/>)}
// 		</div>
// 	)
// }

// // Individual card created from passed props- returns and is added to the employee collection
// function EmployeeCard(props) {
//     return (
//         <div className={EmployeeListStyles.cards}>
// 			<div style={
//                 props.item.id % 2 == 0 
//                 ? 
//                 cardInnerStyleAlt
//                 : 
//                 cardInnerStyleStd
//                 }>
//                 <div className={EmployeeListStyles.imageContainer}>
//                     <Image
//                         src={props.item.image} 
//                         width={"276px"}
//                         height={"200px"}
//                         alt={"services icons"}
//                         priority={true}
//                         className={EmployeeListStyles.images}
//                         />
//                 </div>
//                 <div className={EmployeeListStyles.caption}>
//                     <h3>{props.item.name}</h3>
//                     <p><strong>Role:</strong> {props.item.role}</p>
//                     <p><strong>Qualifications:</strong> {props.item.qualifications}</p>
//                 </div>
//             </div>
// 		</div>
//     )
// }

// export default EmployeeList;
