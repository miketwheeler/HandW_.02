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
            title: "Clinic - New Entryway", 
            category: "Custom Designed Rail",
            description: "First impressions are important, this client wanted a complete overhaul at a their office and we think this did the trick!",
            completion: "April, 2021",
            image: '/images/services-imgs/railwork_1.jpg',
        },
        // Our Latest Orders
        { 
            id: 2,
            title: "Auditorium Order", 
            category: "Fabrication Example",
            description: "One of the larger jobs we've completed",
            completion: "January, 2021",
            image: '/images/services-imgs/railstack.jpg',
        },
        { 
            id: 3,
            title: "Local School Replacement", 
            category: "Fabrication Example",
            description: "A school needed a new safety-minded railing, they trusted H&W Stair and Rail for the job",
            completion: "December, 2020",
            image: '/images/services-imgs/raildesign_2_1.jpg',
        },
        { 
            id: 4,
            title: "Full Flight Railing", 
            category: "Fabrication Example",
            description: "We do straight-aways and full-flights of stairs",
            completion: "October 10, 2020",
            image: '/images/services-imgs/raildesign_3.jpg',
        },
        { 
            id: 5,
            title: "Odd Shaped Jobs", 
            category: "Fabrication Example",
            description: "Some jobs are trickier than others, we can accommodate any situation",
            image: '/images/services-imgs/raildesign_7.jpg',
        },
        // The Team At Work
        { 
            id: 6,
            title: "Finalizing The Main Structure", 
            category: "Fabrication",
            description: "We measure twice and cut once, then doubly make sure our dimensions are drop-in ready",
            image: '/images/services-imgs/railwork_2.jpg',
        },
        { 
            id: 7,
            title: "Welding Railing", 
            category: "Assembly",
            description: "Working on completing a corner piece for a client's project",
            image: '/images/services-imgs/hw_crew.jpg',
        },
        { 
            id: 8,
            title: "Finishing Up Details", 
            category: "Assembly",
            description: "Our welds don't need rounding over, but just in case, we give them a polish before finishing",
            image: '/images/services-imgs/hw_crew2.jpg',
        },
        { 
            id: 9,
            title: "Custom Fabrication", 
            category: "Design Request",
            description: "We're proud to offer nearly any design you can think of",
            image: '/images/services-imgs/rail_design_closeup.jpg',
        },
        { 
            id: 10,
            title: "Quality & Intricate Tube Welding", 
            category: "Weld Sample",
            description: "We are some of the best welders in the business and contest anything short of perfection",
            image: '/images/services-imgs/weld.jpg',
        },
        { 
            id: 11,
            title: "More Tube Welding", 
            category: "Weld Sample",
            description: "Continuity accross our work is notable",
            image: '/images/services-imgs/weld_closeup.jpg',
        },
        // The Shop
        { 
            id: 12,
            title: "Increased Capacity", 
            description: "We recently adopted a new tool to the shop! Our ability to accommodate larger jobs has increased",
            image: '/images/services-imgs/forklift_front.jpg',
        },
        { 
            id: 13,
            title: "Dressing, Finishing and Quality Assurance Area", 
            description: "Great quality requires finishing touches ",
            image: '/images/services-imgs/rail_overhead.jpg',
        },
        { 
            id: 14,
            title: "Main Fab Area", 
            description: "We start with design, then cutting, prepping, and assembling our work",
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
                ? <h3 className={ProjectStyles.headingstyle}>Project Highlight</h3>
                : props.item.id === 2
                ? <h3 className={ProjectStyles.headingstyle}>Our Latest Orders</h3>
                : props.item.id === 6
                ? <h3 className={ProjectStyles.headingstyle}>The Team At Work</h3>
                : props.item.id === 12
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
                                    alt={"services-image"}
                                    layout='intrinsic'
                                    priority={true}
                                    className={ProjectStyles.imageStyle}
                                    />
                            </div>
                        :
                            // waiting
                            <div> loading... </div>
                        }
                        <div className={ProjectStyles.caption}>
                            {/* Odd cards set with alternating layout */}
                            <div style={
                                    props.item.id % 2 === 0 
                                    ? captionStyle1 
                                    : captionStyle2
                                }>
                                <h3 className={ProjectStyles.cardHeader}>{props.item.title}</h3>
                                {
                                    props.item.category
                                    ? <p><strong>Category: </strong> {props.item.category}</p>
                                    : null
                                }
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