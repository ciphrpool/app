/* @refresh reload */
import { render } from "solid-js/web";
import { Router } from "@solidjs/router";
import { lazy } from "solid-js";
import "./index.css";
import {
	FaultContext,
	FaultHandler,
	FaultTarget,
} from "@components/errors/fault";
import { DatabaseProvider } from "@utils/DB/db.context";

const routes = [
	{
		path: "/",
		component: lazy(() => import("./pages/home/home.page")),
	},
	{
		path: "/arena",
		component: lazy(() => import("./pages/arena/arena.page")),
	},
	{
		path: "/duel",
		component: lazy(() => import("./pages/duel/duel.page")),
	},
	{
		path: "/statistics",
		component: lazy(() => import("./pages/statistics/statistics.page")),
	},
	{
		path: "/preferences",
		component: lazy(() => import("./pages/preferences/preferences.page")),
	},
	{
		path: "/account",
		component: lazy(() => import("./pages/account/account.page")),
	},
	{
		path: "/users/search",
		component: lazy(() => import("./pages/users/search.page")),
	},
	{
		path: "/users/:tag",
		component: lazy(() => import("./pages/users/user.page")),
	},
	{
		path: "/module/:module",
		component: lazy(() => import("./pages/modules/modules.page")),
	},
];
const root = document.getElementById("root");
const fault = new FaultTarget();

render(
	() => (
		<FaultContext.Provider value={fault}>
			<DatabaseProvider>
				<Router>{routes}</Router>
			</DatabaseProvider>
			<FaultHandler />
		</FaultContext.Provider>
	),
	root!
);
