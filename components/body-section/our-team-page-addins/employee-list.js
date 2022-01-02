import React from 'react';
import Image from 'next/image';
import EmployeeListStyles from './employee-list.module.css';

// Alternating stylings applied to the card list (entropic way of getting it done - allows for toggle in component (in-house))
// Reversed styles
const cardInnerStyleAlt = {
    display: 'flex', 
    flexDirection: 'row-reverse', 
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

// Main component exported to the appropriate 'Our Team' section
// Assembles a series of cards into a div for the imported & rendered component
function EmployeeList(props) {
    // Data - List of Employees (props)
	const employees = [
		{ 
            id: 1,
            eotm: false,
            name: "Tanner Danielson", 
            role: "CEO",
            qualifications: "10 years welding and fabrication experience, entreprenuer",
            image: '/placeholder_images/avatar_placeholder.png',
        },
        { 
            id: 2,
            eotm: false,
            name: "Yoda", 
            role: "COO",
            qualifications: "6 years welding experience, 2 years blacksmith",
            image: '/placeholder_images/avatar_placeholder.png',
        },
        { 
            id: 3,
            eotm: true,
            name: "Darth Vader", 
            role: "APN",
            qualifications: "Buisinees book management, tax preparation",
            image: '/placeholder_images/avatar_placeholder.png',
        },
        { 
            id: 4,
            eotm: false,
            name: "Han Solo", 
            role: "Employee",
            qualifications: "Interior and Exterior Fabrication, electronics certified",
            image: '/placeholder_images/avatar_placeholder.png',
        },
        { 
            id: 5,
            eotm: false,
            name: "Lea Organa", 
            role: "Employee",
            qualifications: "Interior and Exterior Fabrication",
            image: '/placeholder_images/avatar_placeholder.png',
        },
        { 
            id: 6,
            eotm: false,
            name: "Luke Skywalker", 
            role: "Employee",
            qualifications: "Interior and Exterior Fabrication",
            image: '/placeholder_images/avatar_placeholder.png',
        },
        { 
            id: 7,
            eotm: false,
            name: "Chewbacca", 
            role: "Employee",
            qualifications: "Interior and Exterior Fabrication, metalergy certified",
            image: '/placeholder_images/avatar_placeholder.png',
        },
	]
	
	return (
        <div>
			{employees.map((item, i) => <EmployeeCard key={i} item={item}/>)}
		</div>
	)
}

// Individual card created from passed props- returns and is added to the employee collection
function EmployeeCard(props) {
    return (
        <div className={EmployeeListStyles.cards}>
			<div style={
                props.item.id % 2 == 0 
                ? 
                cardInnerStyleAlt
                : 
                cardInnerStyleStd
                }>
                <div className={EmployeeListStyles.imageContainer}>
                    <Image
                        src={props.item.image} 
                        width={"276px"} 
                        height={"200px"} 
                        alt={"services icons"} 
                        priority={true}
                        className={EmployeeListStyles.images}
                        />
                </div>
                <div className={EmployeeListStyles.caption}>
                    <h3>{props.item.name}</h3>
                    <p><strong>Role:</strong> {props.item.role}</p>
                    <p><strong>Qualifications:</strong> {props.item.qualifications}</p>
                </div>
            </div>
		</div>
    )
}

export default EmployeeList;
