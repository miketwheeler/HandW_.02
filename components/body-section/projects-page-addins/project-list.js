import React from 'react';
import Image from 'next/image';
import ProjectStyles from './project-list.module.css';


// Alternating stylings applied to the card list (entropic way of getting it done - allows for toggle in component (in-house))
// Reversed Display on id%2
const cardInnerStyleReverse = {
    display: 'flex', 
    flexDirection: 'row-reverse', 
    textAlign: 'left',
    justifyContent: 'space-between', 
    margin: '0px auto',
}
// Forward Display 
const cardInnerStyleStd = {
    display: 'flex', 
    textAlign: 'left',
    justifyContent: 'space-between', 
    margin: '0px auto',
}
// Text Content
const captionStyle1 = {
    width: '90%', 
}
const captionStyle2 = {
    marginLeft: '10%',
}
// Main component exported to the appropriate ~Project~ section
// Assembles a series of cards into a div for the imported & rendered component
function ProjectList() {

	const projects = [
		{ 
            id: 1,
            job: true,
            title: "Recent Equipment Addition", 
            type: "Equipment",
            description: "Interior and Exterior Fabrication, metalergy certified",
            image: '/images/services-imgs/forklift.png',
        },
        { 
            id: 2,
            job: true,
            title: "Custom & Complex Fabrication", 
            type: "Fabrication Example",
            description: "Interior and Exterior Fabrication, metalergy certified",
            image: '/images/services-imgs/raildesign_2_1.jpg',
        },
        { 
            id: 3,
            job: true,
            title: "Linear Railing", 
            type: "Fabrication Example",
            description: "Interior and Exterior Fabrication, metalergy certified",
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
        <div className={ProjectStyles.card}>
            <div className={ProjectStyles.cardInteriorContainer}>
                <div style={
                        props.item.id % 2 == 0 
                        ? 
                        cardInnerStyleReverse
                        : 
                        cardInnerStyleStd
                    }>
                    { 
                    props.item.image 
                    ? 
                        <div className={ProjectStyles.imageContainer}>
                            <Image
                                src={props.item.image} 
                                width={"265px"}
                                height={"285px"}
                                alt={"services icons"}
                                priority={true}
                                className={ProjectStyles.imageStyle}
                                />
                        </div>
                    :
                        <div> loading... </div>
                    }
                    <div className={ProjectStyles.caption}>
                        <div style={
                                props.item.id % 2 === 0 
                                ? 
                                captionStyle1 
                                : 
                                captionStyle2
                            }>
                            <h3 className={ProjectStyles.cardHeader}>{props.item.title}</h3>
                            <p><strong>Role: </strong> {props.item.type}</p>
                            <p><strong>Description: </strong> {props.item.description}</p>
                        </div>
                    </div>
                </div>
            </div>
		</div>
    )
}

export default ProjectList;