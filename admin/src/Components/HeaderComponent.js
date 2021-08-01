import { Navbar, Nav, Container } from 'react-bootstrap';
import {NavLink} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { signout } from '../actions/auth_actions';


function Header() {
const auth=useSelector(state => state.auth);
const dispatch= useDispatch();
    const logout =() =>{
        dispatch(signout());
    }

    const renderLoggedInLinks = () =>{
        return(
            <Nav className="ml-auto">
                <span onClick={logout} className="nav-link">Signout</span>
            </Nav>
        );
        
    }
    const renderNonLoggedInLinks = () =>{
        return(
            <Nav className="ml-auto">
                <NavLink to="/login" className="nav-item nav-link">SignIn</NavLink>
                <NavLink to="/register" className="nav-item nav-link">SignUp</NavLink>
            </Nav>
        );
        
    }
    return (
        <>
            <Navbar collapseOnSelect expand="md" bg="dark" variant="dark" >
                <Container fluid>
                    <Navbar.Brand href="/">Admin Dashboard</Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        {auth.authenticate ? renderLoggedInLinks() : renderNonLoggedInLinks()}
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    );
    
}

export default Header;