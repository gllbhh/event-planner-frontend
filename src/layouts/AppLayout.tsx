import { Outlet } from "react-router-dom";
import Container from "react-bootstrap/Container";
import AppNavbar from "../components/AppNavbar";

export default function AppLayout() {
	return (
		<>
			<AppNavbar />
			<Container className="py-4">
				<Outlet />
			</Container>
		</>
	);
}
