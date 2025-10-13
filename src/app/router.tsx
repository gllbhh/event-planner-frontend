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

export const router = createBrowserRouter([
	{
		element: <AppLayout />, // Navbar stays mounted here
		children: [
			{ index: true, element: <TileView /> }, // default route "/"
			{ path: "create", element: <CreateEvent />,},
			{ path: "create/event/:id", element: <EventDetails /> },
			{ path: "create/fail", element: <FailedToCreateEvent /> },
			{ path: "event/:id", element: <EventView /> },
			{ path: "manage", element: <ManageEvent /> },
			{ path: "*", element: <NotFound /> },
			{ path: "/not-found", element: <SessionNotFoundNotFound /> },
		],
	},
]);
