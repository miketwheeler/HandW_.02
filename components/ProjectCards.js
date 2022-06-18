import React, {useState} from 'react';
import Image from 'next/image';
import ProjectStyles from '../styles/componentStyles/project-cards.module.css';
import { projectSet } from '../data/dataSets';


const projectListWrapper = {
    marginTop: '38px',
}
const headingstyle = {
    marginTop: '40px',
    padding: '10px 0 10px 10px',
    borderWidth: '2px',
    borderStyle: 'solid',
    borderImage: 'linear-gradient(to right, rgb(182, 98, 50), rgba(182, 98, 50, 0.507), transparent) 0 0 60% 0',
}

// Individual card - uses passed data
function ProjectCard(props) {

    return (
        <div>
            {
                // The Section Headers for preceeding each section of Projects by number
                props.item.id === 1
                ? <h3 style={headingstyle}>Project Highlight</h3>
                : props.item.id === 2
                ? <h3 style={headingstyle}>Our Latest Orders</h3>
                : props.item.id === 6
                ? <h3 style={headingstyle}>The Team At Work</h3>
                : props.item.id === 12
                ? <h3 style={headingstyle}>The Shop</h3>
                : null  // Or skip leading non-found elements
            }
            <div className={ProjectStyles.card}>
                {
                    props.item.id % 2 === 0
                    ?
                    <div className={ProjectStyles.cardInnerStyle}>
                        { 
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
                        }
                        <h3 className={ProjectStyles.cardHeader}>{props.item.title}</h3>
                        <div className={ProjectStyles.captionContainer}>
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
                    :
                    // REVERSED LAYOUT 
                    <div className={ProjectStyles.reverseCardInnerStyle}>
                        { 
                            <div className={ProjectStyles.reverseImageContainer}>
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
                        }
                        <h3 className={ProjectStyles.reverseCardHeader}>{props.item.title}</h3>
                        <div className={ProjectStyles.reverseCaptionContainer}>
                            <div>
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
                }
            </div>
        </div>
    )
}

// EXPORTED - Main component exported to the appropriate ~Project~ section
// Assembles all spun up project-cards into one component
function ProjectList() {    
	return (
        <div style={projectListWrapper}>
			{
                projectSet.projects.map((item, i) => <ProjectCard key={i} item={item}/>)
            }
		</div>
	)
}

export default ProjectList;