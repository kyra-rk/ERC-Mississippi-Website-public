/*navbar component that will always be on top of website*/
import React from 'react';
import { Navbar, Nav } from 'react-bootstrap'
import '../styling/index.css';

/*Calling the CreateNavBar const that is the const lower down*/
const NavBar = () => {
    return <CreateNavBar />
}
/*sr-only is for screenreaders, i.e. accessibility*/
const CreateNavBar = () => {
    const nav_bar_items = [{url: "/", name: "Home"}, 
                           {url: "/dataportal", name: "Data Portal"},
                           {url: "/dropdown", name: "Dropdown Bootstrap"}, 
                           {url: "/index", name: "Index"}, 
                           {url: "/stories", name: "Stories"},
                           {url: "/methodology", name: "Methodology"},
                           {url: "/about", name: "About"},
                           {url: "/contact", name: "Contact"}];

    const links = nav_bar_items.map((obj) => 
    <Nav.Link href = {obj.url} key={obj.name}>
        {obj.name}
    </Nav.Link>);
    
    return (
        <Navbar collapseOnSelect expand="xl" className="navigation" variant="dark" sticky="top">
            <Navbar.Brand className="NavbarBrand" href="/"><h2>MS Women's Count</h2></Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="mr-auto">
                    {links}
                    <span className="sr-only">{links}</span>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    )
};

export default NavBar;

