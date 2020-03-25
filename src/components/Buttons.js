/*navbar component that will always be on top of website*/
import React from 'react';
import { Row, DropdownButton, Dropdown, ButtonToolbar, Col, Button, Container } from 'react-bootstrap';
import categories from '../data/Metadata'
import '../styling/Dropdown.css'
import '../styling/App.css';

/*Calling the CreateNavBar const that is the const lower down*/
const Buttons = () => {
    return (<DropdownButton title={"TEST"} key={1} variant={"Info"}>
    <Dropdown.Item>MORE TESTING</Dropdown.Item>
    </DropdownButton>)
}

/*sr-only is for screenreaders, i.e. accessibility*/
const CreateButtons = () => {
   console.log("DOING STUFF");
    const buttons = categories.map((obj, index) => (
        <DropdownButton
            title={obj.catname}
            variant={obj.variant.toLowerCase()}
            key={index}>
        {obj.variables.map((item, i) => (
             <Dropdown.Item eventKey={i} onClick={this.handleClick.bind(this,index, i)} key={i}>{item.name}</Dropdown.Item>
        ))}
        </DropdownButton>
));
    
    return (
        {buttons}
    )
};

export default Buttons;

