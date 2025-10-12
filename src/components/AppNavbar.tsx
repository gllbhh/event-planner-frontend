import { Link, NavLink, useNavigate } from "react-router-dom";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useState } from "react";

export default function AppNavbar() {

	const [searchId, setSearchId] = useState("");

	const navigate = useNavigate();

	const handleSearch = () => {
		if (searchId.trim()) {
			navigate(`/event/${searchId.trim()}`);
		}
	};	
	return (
		<Navbar expand="md" className="shadow-sm cheerful-navbar" sticky="top">
			<Container>
				<Navbar.Brand as={Link} to="/">
					Explore Events
				</Navbar.Brand>
				<Navbar.Toggle aria-controls="main-nav" />
				<Navbar.Collapse id="main-nav">
					<Nav className="me-auto">
						<Nav.Link as={NavLink} to="/create">
							Create New Event
						</Nav.Link>
					</Nav>

					{/* Search (no functionality yet) */}
					<Form className="d-flex me-2">
						<Form.Control type="search" placeholder="Search Event by ID" className="me-2" aria-label="Search" value={searchId} onChange={(e) => setSearchId(e.target.value)} />
						<Button variant="outline-primary" onClick={handleSearch}>
							Search
						</Button>
					</Form>

					{/* Login (no functionality yet) */}
					<Button variant="primary">
						Login
					</Button>
				</Navbar.Collapse>
			</Container>
		</Navbar>
	);
}
