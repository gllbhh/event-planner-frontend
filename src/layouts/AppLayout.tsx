import { Outlet } from "react-router-dom";
import Container from "react-bootstrap/Container";
import AppNavbar from "../components/AppNavbar";

// AppLayout component: wraps all pages with a navbar and consistent layout
export default function AppLayout() {
    return (
        <>
            {/* Main navigation bar at the top */}
            <AppNavbar />
            <div className="main-container">
                {/* Bootstrap container for page content with vertical padding */}
                <Container className="py-4">
                    {/* Renders the matched child route component */}
                    <Outlet />
                </Container>
            </div>
        </>
    );
}
