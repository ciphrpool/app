/* @refresh reload */
import { render } from "solid-js/web";
import { Route, Router } from "@solidjs/router";
import { JSXElement, lazy } from "solid-js";
import "./index.css";
import {
	FaultContext,
	FaultHandler,
	FaultTarget,
} from "@components/errors/fault";
import { DatabaseProvider } from "@utils/DB/db.context";
import Protected from "@components/auth/protected";
import { ProtectedData } from "@utils/auth/auth";
import { ProtectedProvider, UserProvider } from "@utils/auth/auth.context";
import { NotificationProvider } from "@components/utils/notifications.context";

const HomePage = lazy(() => import("./pages/home/home.page"));
const ArenaPage = lazy(() => import("./pages/arena/arena.page"));
const DuelPage = lazy(() => import("./pages/duel/duel.page"));
const StatisticsPage = lazy(() => import("./pages/statistics/statistics.page"));
const PreferencesPage = lazy(
	() => import("./pages/preferences/preferences.page")
);
const AccountPage = lazy(() => import("./pages/account/account.page"));
const SearchPage = lazy(() => import("./pages/users/search.page"));
const UserPage = lazy(() => import("./pages/users/user.page"));
const ModulePage = lazy(() => import("./pages/modules/modules.page"));
const LandingPage = lazy(() => import("./pages/home/landing.page"));

const root = document.getElementById("root");
const fault = new FaultTarget();

interface ProvidersProps {
	children?: JSXElement;
}

function Providers(props: ProvidersProps) {
	return (
		<UserProvider>
			<DatabaseProvider>
				<NotificationProvider>{props.children}</NotificationProvider>
			</DatabaseProvider>
		</UserProvider>
	);
}

render(
	() => (
		<FaultContext.Provider value={fault}>
			<ProtectedProvider>
				<Router>
					{/* Protected route */}
					<Route
						path="/"
						component={() => (
							<Protected fallback={LandingPage}>
								<Providers>
									<HomePage />
								</Providers>
							</Protected>
						)}
					/>
					<Route
						path="/arena"
						component={() => (
							<Protected redirect="/">
								<Providers>
									<ArenaPage />
								</Providers>
							</Protected>
						)}
					/>
					<Route
						path="/duel"
						component={() => (
							<Protected redirect="/">
								<Providers>
									<DuelPage />
								</Providers>
							</Protected>
						)}
					/>
					<Route
						path="/statistics"
						component={() => (
							<Protected redirect="/">
								<Providers>
									<StatisticsPage />
								</Providers>
							</Protected>
						)}
					/>
					<Route
						path="/preferences"
						component={() => (
							<Protected redirect="/">
								<Providers>
									<PreferencesPage />
								</Providers>
							</Protected>
						)}
					/>
					<Route
						path="/account"
						component={() => (
							<Protected redirect="/">
								<Providers>
									<AccountPage />
								</Providers>
							</Protected>
						)}
					/>
					<Route
						path="/users/search"
						component={() => (
							<Protected redirect="/">
								<Providers>
									<SearchPage />
								</Providers>
							</Protected>
						)}
					/>
					<Route
						path="/users/:tag"
						component={() => (
							<Protected redirect="/">
								<Providers>
									<UserPage />
								</Providers>
							</Protected>
						)}
					/>
					<Route
						path="/module/:module"
						component={() => (
							<Protected redirect="/">
								<Providers>
									<ModulePage />
								</Providers>
							</Protected>
						)}
					/>
				</Router>
			</ProtectedProvider>

			<FaultHandler />
		</FaultContext.Provider>
	),
	root!
);
