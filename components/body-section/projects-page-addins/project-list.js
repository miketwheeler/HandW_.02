import React from 'react';
import Image from 'next/image';
import ProjectStyles from './project-list.module.css';


// Alternating stylings applied to the card list (entropic way of getting it done - allows for toggle in component (in-house))
// Forward Display 
const cardInnerStyleStd = {
    display: 'flex', 
    textAlign: 'left',
    justifyContent: 'space-between', 
    margin: '0px auto',
}
// Reversed Display on id%2
const cardInnerStyleReverse = {
    display: 'flex', 
    flexDirection: 'row-reverse', 
    textAlign: 'left',
    justifyContent: 'space-between', 
    margin: '0px auto',
}
// Text Content display
const captionStyle1 = {
    marginRight: '20px', 
}
const captionStyle2 = {
    marginLeft: '20px',
}
// Main component exported to the appropriate ~Project~ section
// Assembles a series of cards into a div for the imported & rendered component
function ProjectList() {

	const projects = [
        // Installation Example
		{ 
            id: 1,
            title: "Installed Railing", 
            type: "Fabrication Example",
            description: "Interior and Exterior Fabrication, metalergy certified",
            completion: "Febuary 22, 2020",
            image: '/images/services-imgs/railwork_1.jpg',
        },
        // Railing Examples
        { 
            id: 2,
            title: "Finished Order", 
            type: "Fabrication Example",
            description: "Interior and Exterior Fabrication, metalergy certified",
            completion: "Febuary 22, 2020",
            image: '/images/services-imgs/railstack.jpg',
        },
        { 
            id: 3,
            title: "Custom Railing for School", 
            type: "Workshop Builds",
            description: "Interior and Exterior Fabrication, metalergy certified",
            completion: "July 16, 2019",
            image: '/images/services-imgs/raildesign_2_1.jpg',
        },
        { 
            id: 4,
            title: "Linear Railing", 
            type: "Workshop Builds",
            description: "Interior and Exterior Fabrication, metalergy certified",
            completion: "October 10, 2020",
            image: '/images/services-imgs/raildesign_3.jpg',
        },
        { 
            id: 5,
            title: "Straight Railing", 
            type: "Fabrication Example",
            description: "Interior and Exterior Fabrication",
            completion: " 22, 2020",
            image: '/images/services-imgs/raildesign_5.jpg',
        },
        // We Do Custom Fabrication
        { 
            id: 6,
            title: "Custom Design", 
            type: "workshop-builds",
            description: "Interior and Exterior Fabrication",
            completion: "Febuary 22, 2020",
            image: '/images/services-imgs/rail_design_closeup.jpg',
        },
        { 
            id: 7,
            title: "Custom Fabrication", 
            type: "Fabrication Example",
            description: "Interior and Exterior Fabrication, metalergy certified",
            completion: "Febuary 22, 2020",
            image: '/images/services-imgs/raildesign_7.jpg',
        },
        // Handbuilt Excellence in Quality 
        { 
            id: 8,
            title: "Finished Railing", 
            type: "Fabrication Example",
            description: "Interior and Exterior Fabrication, metalergy certified",
            completion: "Febuary 22, 2020",
            image: '/images/services-imgs/railwork_2.jpg',
        },
        { 
            id: 9,
            title: "Welding Railing", 
            type: "Fabrication Example",
            description: "Interior and Exterior Fabrication, metalergy certified",
            completion: "Febuary 22, 2020",
            image: '/images/services-imgs/hw_crew.jpg',
        },
        { 
            id: 10,
            title: "Welding Railing", 
            type: "Fabrication Example",
            description: "Interior and Exterior Fabrication, metalergy certified",
            completion: "Febuary 22, 2020",
            image: '/images/services-imgs/hw_crew2.jpg',
        },
        { 
            id: 11,
            title: "Weld", 
            type: "Fabrication Example",
            description: "Interior and Exterior Fabrication, metalergy certified",
            completion: "Febuary 22, 2020",
            image: '/images/services-imgs/weld.jpg',
        },
        { 
            id: 12,
            title: "Weld 2", 
            type: "Fabrication Example",
            description: "Interior and Exterior Fabrication, metalergy certified",
            completion: "Febuary 22, 2020",
            image: '/images/services-imgs/weld_closeup.jpg',
        },
        // The Shop
        { 
            id: 13,
            title: "Our Forklift", 
            type: "Equipment",
            description: "Interior and Exterior Fabrication, metalergy certified",
            image: '/images/services-imgs/forklift_front.jpg',
        },
        { 
            id: 14,
            title: "Our Forklift", 
            type: "Equipment",
            description: "Interior and Exterior Fabrication, metalergy certified",
            image: '/images/services-imgs/rail_overhead.jpg',
        },
        { 
            id: 15,
            title: "Our Forklift", 
            type: "Equipment",
            description: "Interior and Exterior Fabrication, metalergy certified",
            image: '/images/services-imgs/whole_shop.jpg',
        },
	]
    
	
	return (
        <div className={ProjectStyles.projectListWrapper}>
			{
                projects.map((item, i) => <ProjectCard key={i} item={item}/>)
            }
		</div>
	)
}

// Individual card created from passed props- returns and is added to the employee collection
function ProjectCard(props) {
    return (
        <div>
            {
                props.item.id === 1
                ? <h3 className={ProjectStyles.headingstyle}>Installation Example</h3>
                : props.item.id === 2
                ? <h3 className={ProjectStyles.headingstyle}>Our Latest Railing Orders</h3>
                : props.item.id === 6
                ? <h3 className={ProjectStyles.headingstyle}>We Do Custom Fabrication</h3>
                : props.item.id === 8
                ? <h3 className={ProjectStyles.headingstyle}>Handbuilt Excellence in Quality</h3>
                : props.item.id === 13
                ? <h3 className={ProjectStyles.headingstyle}>The Shop</h3>
                : null
            }
            <div className={ProjectStyles.card}>
                <div className={ProjectStyles.cardInteriorContainer}>
                    {/* Alternating styles (on %2) */}
                    <div style={
                            props.item.id % 2 == 0 
                            ? 
                            cardInnerStyleReverse
                            : 
                            cardInnerStyleStd
                        }>
                        { 
                        // if image
                        props.item.image 
                        ? 
                            // add it
                            <div className={ProjectStyles.imageContainer}>
                                <Image
                                    src={props.item.image} 
                                    width={400}
                                    height={465}
                                    alt={"services icons"}
                                    priority={true}
                                    className={ProjectStyles.imageStyle}
                                    />
                            </div>
                        :
                            // waiting
                            <div> loading... </div>
                        }
                        <div className={ProjectStyles.caption}>
                            {/* Odd cards set with alternate styling */}
                            <div style={
                                    props.item.id % 2 === 0 
                                    ? 
                                    captionStyle1 
                                    : 
                                    captionStyle2
                                }>
                                <h3 className={ProjectStyles.cardHeader}>{props.item.title}</h3>
                                <p><strong>Category: </strong> {props.item.type}</p>
                                { 
                                    props.item.completion 
                                    ? <p><strong>Completed: </strong> {props.item.completion}</p>
                                    : null
                                }
                                <p><strong>Description: </strong> {props.item.description}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProjectList;