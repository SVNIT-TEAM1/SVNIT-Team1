import React from "react";
import { Redirect } from "react-router-dom";

// Dashboard
import Dashboard from "../pages/Dashboard/index";


const publicRoutes = [
	{ path: "/", component: Dashboard }
];

export { publicRoutes };
