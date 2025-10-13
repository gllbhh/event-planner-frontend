import { Link, NavLink, useNavigate } from "react-router-dom";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useState } from "react";

// Main navigation bar component for the app
export default function AppNavbar() {
    const [searchId, setSearchId] = useState(""); // State for the event ID search input

    const navigate = useNavigate(); // React Router hook for navigation

    // Handles searching for an event by ID
    const handleSearch = () => {
        if (searchId.trim()) {
            navigate(`/event/${searchId.trim()}`); // Navigate to the event page if ID is entered
        } else {
            navigate("/not-found"); // Navigate to not found page if input is empty
        }
    };

    return (
        <Navbar expand="md" className="shadow-sm cheerful-navbar" sticky="top">
            <Container>
                {/* Brand/logo, links to home */}
                <Navbar.Brand as={Link} to="/">
                    Explore Events
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="main-nav" />
                <Navbar.Collapse id="main-nav">
                    <Nav className="me-auto">
                        {/* Link to create a new event */}
                        <Nav.Link as={NavLink} to="/create">
                            Create New Event
                        </Nav.Link>
                    </Nav>

                    {/* Search form for event by ID */}
                    <Form className="d-flex me-2">
                        <Form.Control
                            type="search"
                            placeholder="Search Event by ID"
                            className="me-2"
                            aria-label="Search"
                            value={searchId}
                            onChange={(e) => setSearchId(e.target.value)}
                        />
                        <Button variant="outline-primary" onClick={handleSearch}>
                            Search
                        </Button>
                    </Form>

                    {/* Placeholder Login button (no functionality yet) */}
                    <Button variant="primary">
                        Login
                    </Button>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}
