import { Navbar, Nav, Container } from 'react-bootstrap';
import {NavLink} from 'react-router-dom';

function Header() {
    return (
        <>
            <Navbar collapseOnSelect expand="md" bg="dark" variant="dark">
                <Container>
                    <Navbar.Brand href="/">Admin Dashboard</Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="ml-auto">
                            <NavLink to="/login" className="nav-item nav-link">SignIn</NavLink>
                            <NavLink to="/register" className="nav-item nav-link">SignUp</NavLink>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    );
    
}

export default Header;