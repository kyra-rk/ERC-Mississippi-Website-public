/*navbar component that will always be on top of website*/
import React from 'react';
import { Navbar, Nav, NavDropdown} from 'react-bootstrap'

import { NavLink, Link} from 'react-router-dom'
import '../styling/App.css';

/*Calling the CreateNavBar const that is the const lower down*/
const NavBar = props => {
    return <CreateNavBar navbaritems={props.links} brand={props.brand} />
}
/*sr-only is for screenreaders, i.e. accessibility*/
const CreateNavBar = props => {
    // const nav_bar_items = [{url: "/", name: "Home"}, 
    //                      //  {url: "/dataportal", name: "Data Portal"},
    //                        {url: "/dataportal", name: "Data Portal"},
    //                        {url: "/dataportal2", name: "Data Portal2"},
    //                        {url: "/comparison", name: "Compare Data"}, 
    //                        {url: "/indexinfo", name: "Index"}, 
    //                        {url: "/stories", name: "Stories"},
    //                        {url: "/methodology", name: "Methodology"},
    //                        {url: "/about", name: "About"},
    //                        {url: "/contact", name: "Contact"}];
   
    var links = props.navbaritems.map((obj, i) => 
        <Nav.Link className="nav-link header" as={Link} to={obj.url}  eventKey={i}>
            {obj.name}
        </Nav.Link>);

    
    
    return (
        <Navbar expand={props.sidebar? "sm": "xl"} className="navigation" variant="dark" sticky="top" collapseOnSelect={!props.sidebar} expanded={props.sidebar}>
            {props.brand && <Navbar.Brand className="NavbarBrand" href="/"><h2>{props.brand}</h2></Navbar.Brand>}
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="ml-auto">
                    {links}
                    <span className="sr-only">{links}</span>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    )
};

export default NavBar;

