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
import { Navigator, useNavigate, useParams } from "@solidjs/router";
import { async_safe, Barrier, HandledError } from "@components/errors/barrier";
import BackButton from "@components/utils/back.button";
import SettingIcon from "@assets/icons/settings.svg?component-solid";
import CloseIcon from "@assets/icons/close.svg?component-solid";
import FetchIcon from "@assets/icons/fetch.svg?component-solid";
import PushIcon from "@assets/icons/push.svg?component-solid";
import CompileIcon from "@assets/icons/compile.svg?component-solid";
import CursorIcon from "@assets/icons/cursor.svg?component-solid";
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
import { api, nexuspool } from "@utils/auth/auth";
import {
	CompilationResult,
	FetchModuleResult,
	PrepareCompilationResult,
} from "@utils/api.type";

function ModulesPage() {
	const params = useParams();
	const navigate = useNavigate();
	const fault = useFault();
	const db = useDatabase();

	const [is_name_editable, set_name_editable] = createSignal<boolean>(false);
	const [module_name, set_module_name] = createSignal<string>(params.module);
	const [fetch_signal, set_fetch_signal] = createSignal<
		FetchModuleResult | undefined
	>();

	return (
		<div class="flex flex-col h-screen max-h-screen bg-night-600">
			<HomeHeader />
			<main class=" h-full justify-items-center p-4 dm-mono-medium flex-grow grid overflow-hidden">
				<div class="w-3/4 h-full grid grid-cols-3 gap-4  overflow-hidden ">
					<SideView default_open_index={1} />
					<div class="flex flex-row gap-4 justify-center h-full col-span-2 p-4 bg-night-700 overflow-hidden ">
						<section class="grow flex flex-col justify-center h-full col-span-2 bg-night-700 overflow-hidden ">
							<div class="pb-4 flex flex-row justify-between">
								<BackButton />
								{/* Menu */}
								<div class="grow justify-center flex items-center gap-4 ">
									<Show
										when={is_name_editable()}
										fallback={<h3>./{params.module}</h3>}
									>
										<button
											title="Save the changes"
											class="text-pl1-400 text-xl dm-sans-800 hover:text-pl1-200 transition-colors duration-200 ease-in-out"
											onclick={async (e) => {
												if (!e.isTrusted) return;
												e.preventDefault();
												// Validate the module name
												if (
													!module_name().endsWith(
														".cl"
													)
												) {
													// Invalid module extension
													fault.major({
														message:
															"The extension of the module must be .cl",
													});
													return;
												}
												// push the change
												try {
													await api.post(
														"/modules/rename",
														{
															prev_name:
																params.module,
															new_name:
																module_name(),
														}
													);
													await DB_MODULES.upsert(
														db,
														params.module,
														{ name: module_name() }
													);
													set_name_editable(false);
													navigate(
														`/module/${module_name()}`
													);
												} catch (error) {
													fault.major({
														message:
															"Failed to rename this module",
													});
												}
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
													(
														e.target as HTMLInputElement
													).value
												);
											}}
											class="bg-night-800 py-2 px-4 outline-none"
											autofocus
										></input>
										<button
											title="Discard the changes"
											onclick={() => {
												set_module_name(module_name());
												set_name_editable(false);
											}}
										>
											<CloseIcon class="[&_path]:fill-ego" />
										</button>
									</Show>
								</div>
							</div>
							<Barrier fallback={<EditorErrorFallback />}>
								<EditorModule
									module_path={params.module}
									fetch_signal={fetch_signal}
								/>
							</Barrier>
						</section>
						<section class="flex flex-col gap-4">
							{/* Controls */}
							{/* Fetch */}
							<button
								title="Fetch and update the remote version of this module"
								onclick={() => {
									fault.info({
										element: (close) => (
											<div class="w-full">
												Are you sure you want to fetch{" "}
												{params.module} (this will
												discard any unpushed changes) ?
												<button
													class="hover:underline hover:underline-offset-4 text-end pl-4"
													title="Fetch and update the remote version of this module"
													onclick={async () => {
														try {
															const res =
																await api.get(
																	"/modules/fetch",
																	{
																		params: {
																			name: params.module,
																		},
																	}
																);
															const module: FetchModuleResult =
																res.data.module;
															set_fetch_signal(
																module
															);
															await DB_MODULES.upsert(
																db,
																module.name,
																{
																	file: module.code,
																}
															);
															close();
															fault.info({
																message: `${module.name} has been fetched successfully`,
															});
														} catch (error) {
															fault.major({
																message:
																	"Failed to delete this module",
															});
														}
													}}
												>
													yes
												</button>
											</div>
										),
									});
								}}
							>
								<FetchIcon class="[&_path]:fill-pl2-200 [&_path]:hover:fill-ego [&_path]:transition-all [&_path]:duration-200 [&_path]:ease-in-out" />
							</button>
							{/* Push */}
							<button
								title="Push this module to remote"
								class="transition-all duration-200 ease-in-out"
								onclick={async () => {
									try {
										const module_data =
											await DB_MODULES.get(
												db,
												params.module
											);
										if (!module_data) return;

										await api.post("/modules/push", {
											name: params.module,
											code: module_data.file,
											hmac: module_data.hmac,
										});
										fault.info({
											message: `${params.module} has been pushed successfully`,
										});
									} catch (error) {
										fault.major({
											message: (error as Error).message,
										});
									}
								}}
							>
								<PushIcon class="[&_path]:fill-night-200 [&_path]:hover:fill-moon [&_path]:transition-all [&_path]:duration-200 [&_path]:ease-in-out" />
							</button>
							{/* Compile */}
							<button
								title="Push this module to remote"
								class="
								transition-all duration-200 ease-in-out
								"
								onclick={async () => {
									try {
										const module_data =
											await DB_MODULES.get(
												db,
												params.module
											);
										if (!module_data) return;

										const res = await api.get(
											"/modules/prepare_compilation"
										);
										const data: PrepareCompilationResult =
											res.data;
										const encrypted_user_id =
											data.encrypted_user_id;

										const compile_res =
											await nexuspool.post(
												"/common/compile",
												{
													encrypted_user_id,
													name: params.module,
													code: module_data.file,
												}
											);
										const compile_data: CompilationResult =
											compile_res.data;

										await DB_MODULES.upsert(
											db,
											params.module,
											{
												hmac: compile_data.hmac,
											}
										);
										fault.info({
											message: `${params.module} has been compiled successfully`,
										});
									} catch (error) {
										fault.major({
											message: (error as Error).message,
										});
									}
								}}
							>
								<CompileIcon class="[&_path]:fill-night-200 [&_path]:hover:fill-moon [&_path]:transition-all [&_path]:duration-200 [&_path]:ease-in-out" />
							</button>
							<button
								title={`Use ${params.module} in cipherpool`}
								class="text-center text-night-200
								border-night-200 flex items-center justify-center
								hover:text-moon hover:border-moon transition-all duration-200 ease-in-out
								mt-auto"
								onclick={async () => {
									try {
										await api.post("/modules/activate", {
											name: params.module,
										});
										fault.major({
											message:
												`${params.module} is now active`,
										});
									} catch (error) {
										fault.major({
											message:
												"Failed to activate this module",
										});
									}
								}}
							>
								<svg
									width="32"
									height="32"
									viewBox="0 0 32 32"
									fill="none"
									xmlns="http://www.w3.org/2000/svg"
									class="group transition-all duration-200 ease-in-out"
								>
									<path
										d="M0 0H32V32H0V0Z"
										class="group-hover:fill-ego-dark transition-all duration-200 ease-in-out"
									/>
									<path
										fill-rule="evenodd"
										clip-rule="evenodd"
										d="M29 3H3V29H29V3ZM0 0V32H32V0H0Z"
										class="group-hover:fill-moon transition-all duration-200 ease-in-out fill-night-200"
									/>
									<path
										d="M12 12H20V20H12V12Z"
										class="group-hover:fill-moon transition-all duration-200 ease-in-out fill-night-200"
									/>
								</svg>
							</button>
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
							<button
								title="Delete the module, this action is irreversible"
								class="text-center text-night-200
								border-night-200 flex items-center justify-center
								hover:text-moon hover:border-moon transition-all duration-200 ease-in-out
								border-4 p-2 h-8 w-8"
								onclick={() => {
									fault.info({
										element: (close) => (
											<DeleteDialog
												module_name={params.module}
												navigate={navigate}
												close={close}
											/>
										),
									});
								}}
							>
								rm
							</button>
						</section>
					</div>
				</div>
			</main>
			<Footer />
		</div>
	);
}

interface DeleteDialogProps {
	module_name: string;
	navigate: Navigator;
	close: () => void;
}

function DeleteDialog(props: DeleteDialogProps) {
	const fault = useFault();
	return (
		<div class="w-full flex justify-between">
			Are you sure you want to delete {props.module_name} ?
			<button
				class="hover:underline hover:underline-offset-4 text-end pl-4"
				title="Delete the module, this action is irreversible"
				onclick={async () => {
					try {
						await api.post("/modules/delete", {
							name: props.module_name,
						});
						props.navigate("/");
					} catch (error) {
						fault.major({
							message: "Failed to delete this module",
						});
					}
				}}
			>
				yes
			</button>
			<button
				class="hover:underline hover:underline-offset-4 text-end pl-4"
				title="Delete the module, this action is irreversible"
				onclick={() => {
					props.close();
				}}
			>
				no
			</button>
		</div>
	);
}

export default ModulesPage;
