import { Button, Form, FormControl, Navbar, Nav, NavDropdown } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import {useNavigate} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../../actions/userActions'
import { useEffect } from 'react'


const Header = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;

    useEffect(() => {
        if(!userInfo)
        {
            navigate('/');
        }
    }, [userInfo]);


    const logoutHandler = () => {
        dispatch(logout());
        // navigate('/');
    }

    return (
        <Navbar bg="light" expand="lg">
                <Navbar.Brand>
                    <Link to='/'> Notes Saving</Link>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        {
                            userInfo?(
                                <>
                                    <Nav.Link>
                                        <Link to='/mynotes'>My Notes</Link>
                                    </Nav.Link>
                                </>
                            ):
                            (
                                <>
                                    <Nav.Link>
                                        <Link to='/login'>Login</Link>
                                    </Nav.Link>
                                </>
                            )
                        }

                        {
                            userInfo?(
                                <>
                                    <NavDropdown title="Settings" id="basic-nav-dropdown">
                                    <NavDropdown.Item href="/myprofile">My Profile</NavDropdown.Item>
                                    <NavDropdown.Divider />
                                    <NavDropdown.Item
                                        onClick={logoutHandler}
                                    >Logout</NavDropdown.Item>
                                    </NavDropdown>
                                </>
                            )
                            : (
                                <>
                                    <Nav.Link>
                                        <Link to='/register'>Register</Link>
                                    </Nav.Link>
                                </>
                            )
                        }

                    </Nav>

                    {/* <Form >
                        <FormControl type="text" placeholder="Search" className="mr-sm-2"/>
                        <Button variant="outline-success">Search</Button>
                    </Form> */}

                </Navbar.Collapse>
        </Navbar>
    );
}

export default Header;