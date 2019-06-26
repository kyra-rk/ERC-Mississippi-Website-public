/*navbar component that will always be on top of website*/
import React from 'react';
import { Navbar, Nav, span } from 'react-bootstrap'

/*Calling the CreateNavBar const that is the const lower down*/
const NavBar = () => {
    return <CreateNavBar />
}
/*sr-only is for screenreaders, i.e. accessibility*/
const CreateNavBar = () => {
    const nav_bar_items = [{url: "/", name: "Home"}, 
                            {url: "/dataportal", name: "Data Portal"}, 
                           {url: "/index", name: "Index"}, 
                           {url: "/oralhistories", name: "Oral Histories"},
                           {url: "/about", name: "About"}];

    const links = nav_bar_items.map((obj, index) => <Nav.Link href = {obj.url}>{obj.name}</Nav.Link>);
    
    return (<Navbar expand="md" sticky="top" bg="purple" variant="dark">
                <Navbar.Brand href="/">MS Women Count</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="mr-auto">
                            {links}
                            <span className="sr-only">{links}</span>
                        </Nav>
                    </Navbar.Collapse>.
                </Navbar>
            );
};

export default NavBar;

