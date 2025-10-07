import { Link, NavLink } from "react-router-dom";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

export default function AppNavbar() {
	return (
		<Navbar bg="light" expand="md" className="shadow-sm" sticky="top">
			<Container>
				<Navbar.Brand as={Link} to="/">
					Hobby Sessions
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
						<Form.Control type="search" placeholder="Search" className="me-2" aria-label="Search" disabled />
						<Button variant="outline-primary" disabled>
							Search
						</Button>
					</Form>

					{/* Login (no functionality yet) */}
					<Button variant="primary" disabled>
						Login
					</Button>
				</Navbar.Collapse>
			</Container>
		</Navbar>
	);
}
