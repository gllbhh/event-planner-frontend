import { createBrowserRouter } from "react-router-dom";
import AppLayout from "../layouts/AppLayout";
import TileView from "../pages/TileView";
import CreateEvent from "../pages/CreateEvent";
import NotFound from "../pages/NotFound";
import EventDetails from "../pages/EventDetails";
import FailedToCreateEvent from "../pages/FailedToCreateEvent";
import EventView from "../pages/EventView";
import ManageEvent from "../pages/ManageEvent";
import SessionNotFound from "../pages/SessionNotFound";
import SessionNotFoundNotFound from "../pages/SessionNotFound";

// Define the application's routes using React Router's createBrowserRouter
export const router = createBrowserRouter([
	{
		element: <AppLayout />, // The main layout (e.g., navbar) that wraps all child routes
		children: [
			{ index: true, element: <TileView /> }, // Default route ("/"): shows the event tiles
			{ path: "create", element: <CreateEvent /> }, // "/create": page to create a new event
			{ path: "create/event/:id", element: <EventDetails /> }, // "/create/event/:id": event details after creation
			{ path: "create/fail", element: <FailedToCreateEvent /> }, // "/create/fail": shown if event creation fails
			{ path: "event/:id", element: <EventView /> }, // "/event/:id": view a specific event
			{ path: "manage", element: <ManageEvent /> }, // "/manage": manage an event (edit, delete, etc.)
			{ path: "*", element: <NotFound /> }, // Catch-all for any undefined route (404)
			{ path: "/not-found", element: <SessionNotFoundNotFound /> }, // "/not-found": custom not found page (possibly for sessions)
		],
	},
]);
