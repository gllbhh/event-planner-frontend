import { createBrowserRouter } from "react-router-dom";
import AppLayout from "../layouts/AppLayout";
import TileView from "../pages/TileView";
import CreateEvent from "../pages/CreateEvent";
import NotFound from "../pages/NotFound";

export const router = createBrowserRouter([
	{
		element: <AppLayout />, // Navbar stays mounted here
		children: [
			{ index: true, element: <TileView /> }, // default route "/"
			{ path: "create", element: <CreateEvent /> },
			{ path: "*", element: <NotFound /> },
		],
	},
]);
