import React from "react";
import  Container  from "react-bootstrap/Container";
import  Navbar  from "react-bootstrap/Navbar";
import Nav from 'react-bootstrap/Nav';



const Header = () => {
    return(
        <Navbar>
            <Container>
                <Navbar.Brand href='#' style={{color:'white'}}>
                    Get It Done
                </Navbar.Brand>
                <Navbar.Toggle className='ms-auto' aria-controls='basic-navbar-nav'/>
                <Navbar.Collapse className='me-auto' id='basic-navbar-nav'>
                    <Nav.Link href='about'>about</Nav.Link>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default Header