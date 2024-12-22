import HomeHeader from "../../components/headers/HomeHeader";
import Footer from "@components/footers/DefaultFooter";
import SideView from "@components/views/side.view";
import GraphView from "@components/views/graph.view";
import CalendarView from "@components/views/calendar.view";
import HistoryView from "@components/views/history.view";
import BinariesView from "@components/views/binaries.view";
import StartView from "@components/views/start.view";
import EditorModule, {
	EditorErrorFallback,
} from "@components/editor/editor.module";
import { useParams } from "@solidjs/router";
import { async_safe, Barrier, HandledError } from "@components/errors/barrier";
import BackButton from "@components/utils/back.button";
import SettingIcon from "@assets/icons/settings.svg?component-solid";
import CloseIcon from "@assets/icons/close.svg?component-solid";
import FetchIcon from "@assets/icons/fetch.svg?component-solid";
import PushIcon from "@assets/icons/push.svg?component-solid";
import {
	createEffect,
	createResource,
	createSignal,
	Match,
	Show,
	Suspense,
	Switch,
} from "solid-js";
import { useFault } from "@components/errors/fault";
import { useDatabase } from "@utils/DB/db.context";
import { DB_MODULES, ModuleNotFoundError } from "@utils/DB/module.db";
import { Module } from "@utils/DB/db";

function ModulesPage() {
	const params = useParams();
	const fault = useFault();
	const db = useDatabase();
	const [module_file] = createResource(
		params.module,
		async (module_name: string) => {
			console.debug("About to get module");

			try {
				const module_file = await DB_MODULES.get(db, module_name);
				return module_file;
			} catch (err) {
				fault.major({ message: (err as ModuleNotFoundError).message });
				throw err;
			}
		}
	);

	const [is_name_editable, set_name_editable] = createSignal<boolean>(false);
	const [module_name, set_module_name] = createSignal<string>(params.module);
	return (
		<div class="flex flex-col h-screen max-h-screen bg-night-600">
			<HomeHeader />
			<main class=" h-full justify-items-center p-4 dm-mono-medium flex-grow grid overflow-hidden">
				<div class="w-3/4 h-full grid grid-cols-3 gap-4  overflow-hidden ">
					<SideView default_open_index={1} />
					<section class=" h-full col-span-2 p-4 gap-4 bg-night-700 overflow-hidden ">
						<div class="pb-4 flex flex-row justify-between">
							<BackButton />
							{/* Menu */}
							<h3 class="inline-flex items-center gap-4 ">
								<Show
									when={is_name_editable()}
									fallback={`./${params.module}`}
								>
									<button
										title="Save the changes"
										class="text-pl1-400 text-xl dm-sans-800 hover:text-pl1-200 transition-colors duration-200 ease-in-out"
										onclick={(e) => {
											if (!e.isTrusted) return;
											e.preventDefault();
											// Validate the module name
											if (
												!module_name().endsWith(".cl")
											) {
												// Invalid module extension
												fault.major({
													message:
														"The extension of the module must be .cl",
												});
												return;
											}
											// push the change
										}}
									>
										↑
									</button>
									<input
										type="text"
										value={module_name()}
										onchange={(e: Event) => {
											if (!e.target || !e.isTrusted)
												return;
											set_module_name(
												(e.target as HTMLInputElement)
													.value
											);
										}}
										class="bg-night-800 py-2 px-4 outline-none"
										autofocus
									></input>
								</Show>

								<Switch>
									<Match when={is_name_editable()}>
										<button
											title="Discard the changes"
											onclick={() => {
												set_module_name(module_name());
												set_name_editable(false);
											}}
										>
											<CloseIcon class="[&_path]:fill-ego" />
										</button>
									</Match>
									<Match when={!is_name_editable()}>
										<button
											title="Rename this module"
											onclick={(e: MouseEvent) => {
												e.preventDefault();
												set_name_editable(true);
											}}
										>
											<SettingIcon
												class="
										[&_path]:fill-night-200 [&_path]:hover:fill-night-100
										[&_path]:transition-all [&_path]:duration-200 [&_path]:ease-in-out"
											/>
										</button>
									</Match>
								</Switch>
							</h3>
							<div class="flex flex-row gap-4 items-end">
								{/* Controls */}
								{/* Fetch */}
								<button title="Fetch and update the remote version of this module">
									<FetchIcon />
								</button>
								<Switch>
									<Match when={true}>
										{/* The code is compiled */}
										{/* Push */}
										<button title="Push this module to remote">
											<PushIcon
												class="[&_path]:fill-night-200 [&_path]:hover:fill-ego
												[&_path]:transition-all [&_path]:duration-200 [&_path]:ease-in-out"
											/>
										</button>
									</Match>
									<Match when={false}>
										{/* The is not compiled */}
										{/* Compile */}
										{""}
									</Match>
								</Switch>
							</div>
						</div>
						<Show when={is_name_editable()}>
							<button
								title="Delete the module, this action is irreversible"
								class="w-full text-center text-night-400 underline underline-offset-4 pb-4"
								onclick={() => {}}
							>
								Delete this module
							</button>
						</Show>
						<Suspense fallback="loading">
							<Show when={module_file()}>
								{(module) => {
									return (
										<Barrier
											fallback={<EditorErrorFallback />}
										>
											<EditorModule
												module_path={params.module}
												init_file={module().file}
											/>
										</Barrier>
									);
								}}
							</Show>
						</Suspense>
					</section>
				</div>
			</main>
			<Footer />
		</div>
	);
}

// {/* Main View */}
// <div class=" h-full col-span-2  flex flex-col gap-4  overflow-hidden ">
// 	{/* Dashboard */}
// 	<GraphView />
// 	<CalendarView />
// 	<HistoryView />
// </div>
// <div class=" h-full flex flex-col gap-4 overflow-hidden">
// 	{/* Game */}
// 	<BinariesView />
// 	<StartView />
// </div>
export default ModulesPage;
