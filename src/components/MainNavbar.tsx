import { Navbar, Container, Nav, NavDropdown, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import "../styles/general.css"
import { useContext, useCallback } from "react";
import { AuthContext } from "../auth/AuthProvider";

export const MainNavbar = () => {

    const { logout } = useContext(AuthContext);

    const handleLogout = useCallback(() => {
        console.log('Logging out...');
        logout?.(); 
    }, [logout]);

    return (
        <Navbar expand="lg" bg="dark" data-bs-theme="dark" className="sticky-top">
            <Container fluid>
                <Navbar.Brand as={Link} to="/home">
                    Home
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link as={Link} to="/history">History</Nav.Link>
                        <NavDropdown title="Reservation" id="basic-nav-dropdown">
                            <NavDropdown.Item as={Link} to="/reservation/make">
                                Make Reservation
                            </NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                    <Button
                        variant="outline-danger"
                        className="ms-auto"
                        onClick={handleLogout}
                    >
                        Logout
                    </Button>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};
