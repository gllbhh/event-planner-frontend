import React from "react";
// Import global styles (SCSS)
import "./css/index.scss";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { router } from "./app/router";

// Import Bootstrap CSS for styling (only needs to be imported once)
import "bootstrap/dist/css/bootstrap.min.css";

// Entry point: Render the React app into the root DOM element
ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        {/* Provide routing context to the app */}
        <RouterProvider router={router} />
    </React.StrictMode>
);
