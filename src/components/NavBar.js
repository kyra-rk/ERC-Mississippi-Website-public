/*navbar component that will always be on top of website*/
import React from 'react';
import { Navbar, Nav } from 'react-bootstrap'

import { NavLink} from 'react-router-dom'
import '../styling/App.css';

/*Calling the CreateNavBar const that is the const lower down*/
const NavBar = () => {
    return <CreateNavBar />
}
/*sr-only is for screenreaders, i.e. accessibility*/
const CreateNavBar = () => {
    const nav_bar_items = [{url: "/", name: "HOME"},
                           {url: "/dataportal", name: "DATA PORTAL"},
                           {url: "/dataportal2", name: "DATA PORTAL 2"},
                           {url: "/comparison", name: "COMPARE DATA"},
                           {url: "/indexinfo", name: "INDEX"},
                           {url: "/stories", name: "STORIES"},
                           {url: "/methodology", name: "METHODOLOGY"},
                           {url: "/about", name: "ABOUT"},
                           {url: "/contact", name: "CONTACT"}];

    const links = nav_bar_items.map((obj) =>
    <NavLink className="nav-link header" to= {obj.url} key={obj.name}>
        {obj.name}
    </NavLink>);

    return (
        <Navbar collapseOnSelect expand="xl" className="navigation" variant="dark" sticky="top">
            <Navbar.Brand className="NavbarBrand" href="/"><h2>MAKE WOMEN COUNT</h2></Navbar.Brand>
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
