/* @refresh reload */
import { render } from "solid-js/web";
import { Route, Router } from "@solidjs/router";
import { JSXElement, lazy } from "solid-js";
import "@assets/editor/prism";
import "prismjs/themes/prism-tomorrow.css";
import "./index.css";
import {
	FaultContext,
	FaultHandler,
	FaultTarget,
} from "@components/errors/fault";
import { DatabaseProvider } from "@utils/DB/db.context";
import Protected from "@components/auth/protected";
import { ProtectedProvider, UserProvider } from "@utils/auth/auth.context";
import { NotificationProvider } from "@components/notifications/notifications.context";

const HomePage = lazy(() => import("./pages/home/home.page"));
const ArenaPage = lazy(() => import("./pages/arena/arena.page"));
const DuelPage = lazy(() => import("./pages/duel/duel.page"));
const DuelResultPage = lazy(() => import("./pages/duel/duel_result.page"));
const WaitingPage = lazy(() => import("./pages/duel/waiting.page"));
const StatisticsPage = lazy(() => import("./pages/statistics/statistics.page"));
const PreferencesPage = lazy(
	() => import("./pages/preferences/preferences.page")
);
const AccountPage = lazy(() => import("./pages/account/account.page"));
const SearchPage = lazy(() => import("./pages/users/search.page"));
const UserPage = lazy(() => import("./pages/users/user.page"));
const ModulePage = lazy(() => import("./pages/modules/modules.page"));
const LandingPage = lazy(() => import("./pages/home/landing.page"));
const DocumentationPage = lazy(
	() => import("./pages/documentation/documentation.page")
);

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
				<Providers>
					<Router>
						{/* Protected route */}
						<Route
							path="/welcolm"
							component={() => <LandingPage />}
						/>
						<Route
							path={["/documentation/:section", "/documentation"]}
							component={() => <DocumentationPage />}
						/>
						{/* Protected route */}
						<Route
							path="/"
							component={() => (
								<Protected fallback={<LandingPage />}>
									<HomePage />
								</Protected>
							)}
						/>
						<Route
							path="/arena"
							component={() => (
								<Protected redirect="/welcolm">
									<ArenaPage />
								</Protected>
							)}
						/>
						<Route
							path="/duel/history/:duel_session_id"
							component={() => (
								<Protected redirect="/welcolm">
									<DuelResultPage />
								</Protected>
							)}
						/>
						<Route
							path="/duel/waiting/:waiting_room_id"
							component={() => (
								<Protected redirect="/welcolm">
									<WaitingPage />
								</Protected>
							)}
						/>
						<Route
							path="/duel/:duel_type/:duel_session_id"
							component={() => (
								<Protected redirect="/welcolm">
									<DuelPage />
								</Protected>
							)}
						/>
						<Route
							path="/statistics"
							component={() => (
								<Protected redirect="/welcolm">
									<StatisticsPage />
								</Protected>
							)}
						/>
						<Route
							path="/preferences"
							component={() => (
								<Protected redirect="/welcolm">
									<PreferencesPage />
								</Protected>
							)}
						/>
						<Route
							path="/account"
							component={() => (
								<Protected redirect="/welcolm">
									<AccountPage />
								</Protected>
							)}
						/>
						<Route
							path="/users/search"
							component={() => (
								<Protected redirect="/welcolm">
									<SearchPage />
								</Protected>
							)}
						/>
						<Route
							path="/users/:tag"
							component={() => (
								<Protected redirect="/welcolm">
									<UserPage />
								</Protected>
							)}
						/>
						<Route
							path="/module/:module"
							component={() => (
								<Protected redirect="/welcolm">
									<ModulePage />
								</Protected>
							)}
						/>
					</Router>
				</Providers>
			</ProtectedProvider>

			<FaultHandler />
		</FaultContext.Provider>
	),
	root!
);
