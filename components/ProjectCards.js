import React from 'react';
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

function CardInners({props}) {
    return (
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
    )
}

function MyImage({imageProp}) {
    return (
        <Image
            src={imageProp} 
            width={400}
            height={465}
            alt={"services-image"}
            layout='intrinsic'
            priority={true}
            className={ProjectStyles.imageStyle}
            placeholder='blur'
            blurDataURL='../public/images/blurs/blurred.png'
        />
    )
}


// Individual card - uses passed data
function ProjectCard(props) {
    const cardId = props.item.id;
    const idList = [1,2,6,12];
    const headingList = ["Project Highlight", "Our Latest Orders", "The Team at Work", "The Shop"]

    return (
        <div>
            {
                idList.includes(cardId) 
                ? <h3 style={headingstyle}>{headingList[idList.indexOf(cardId)]}</h3>
                : null
            }
            <div className={ProjectStyles.card}>
                {
                    cardId % 2 === 0 // every other card oriented in reverse
                    ?
                    <div className={ProjectStyles.cardInnerStyle}>
                        <div className={ProjectStyles.imageContainer}>
                            <MyImage imageProp={props.item.image} />
                        </div>
                        <h3 className={ProjectStyles.cardHeader}>{props.item.title}</h3>
                        <div className={ProjectStyles.captionContainer}>
                            <CardInners props={props} />
                        </div>
                    </div>
                    :
                    // REVERSED LAYOUT 
                    <div className={ProjectStyles.reverseCardInnerStyle}>
                        <div className={ProjectStyles.reverseImageContainer}>
                            <MyImage imageProp={props.item.image} />
                        </div>
                        <h3 className={ProjectStyles.reverseCardHeader}>{props.item.title}</h3>
                        <div className={ProjectStyles.reverseCaptionContainer}>
                            <CardInners props={props} />
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