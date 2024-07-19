/* @refresh reload */
import { render } from "solid-js/web";
import { Router } from "@solidjs/router";
import { lazy } from "solid-js";
import "./index.css";
import { FaultContext, FaultHandler, FaultTarget } from "@components/errors/fault";

const routes = [
	{
		path: "/",
		component: lazy(() => import("./pages/home/Home")),
	},
	{
		path: "/arena",
		component: lazy(() => import("./pages/game/single_player/Arena")),
	},
	{
		path: "/dashboard",
		component: lazy(() => import("./pages/user/Dashboard")),
	},
	{
		path: "/setting",
		component: lazy(() => import("./pages/setting/Setting")),
	},
];
const root = document.getElementById("root");
const fault = new FaultTarget();

render(() => <FaultContext.Provider value={fault}>
		<Router>{routes}</Router>
		<FaultHandler/>
	</FaultContext.Provider>, root!);
