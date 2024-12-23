import { editor as monaco_editor } from "monaco-editor";
import loader, { Monaco } from "@monaco-editor/loader";
import {
	Accessor,
	createEffect,
	createSignal,
	Match,
	on,
	onCleanup,
	onMount,
	Switch,
} from "solid-js";
import { model_from, setup_editor } from "./editor.utils";
import { async_safe, HandledError, safe } from "@components/errors/barrier";
import { DBCoreRangeType } from "dexie";
import { useDatabase } from "@utils/DB/db.context";
import { DB_MODULES, ModuleNotFoundError } from "@utils/DB/module.db";
import { FaultTarget, useFault } from "@components/errors/fault";
import { debounce } from "@utils/time";
import { AppDatabase } from "@utils/DB/db";
import { FetchModuleResult } from "@utils/api.type";
import { api } from "@utils/auth/auth";

const MODULE_EDITOR_VIEWSTATES: Map<
string,
monaco_editor.ICodeEditorViewState
> = new Map();

async function GetOrFetchModule(
	module_name: string,
	db: AppDatabase,
	fault: FaultTarget
) {
	console.debug("About to get module");
	console.debug(module_name);
	
	try {
		let module_file = await DB_MODULES.get(db, module_name);
		console.log("FROM DB ", { module_file });
		
		if (!module_file) {
			// Try to fetch remote
			const res = await api.get("/modules/fetch", {
				params: { name: module_name },
			});
			const module: FetchModuleResult = res.data.module;
			
			module_file = await DB_MODULES.upsert(db, module.name, {
				file: module.code,
			});
			console.log("FROM REMOTE ", { module_file });
		}
		return module_file;
	} catch (err) {
		fault.major({ message: (err as ModuleNotFoundError).message });
		throw err;
	}
}

type EditorModuleProps = {
	module_path: string;
	fetch_signal : Accessor<FetchModuleResult | undefined>
};

function EditorModule(props: EditorModuleProps) {
	const db = useDatabase();
	const fault = useFault();
	let container_ref!: HTMLDivElement;
	const [get_monaco, set_monaco] = createSignal<Monaco>();
	const [get_editor, set_editor] =
		createSignal<monaco_editor.IStandaloneCodeEditor>();
	let cancel: () => void = () => {};

	const periodic_save = debounce(async (content: string) => {
		try {
			await DB_MODULES.upsert(db, props.module_path, {
				file: content,
			});
		} catch (err) {
			fault.minor({ message: "Failed to save changes" });
		}
	}, 1000); // Save after 1 second of no changes

	onMount(
		async_safe(async () => {
			const load_monaco = loader.init();
			cancel = load_monaco.cancel;

			try {
				const monaco = await load_monaco;

				const uri = monaco.Uri.parse(props.module_path);

				let model: monaco_editor.ITextModel | null;
				model = monaco.editor.getModel(uri);
				if (!model) {
					const module = await GetOrFetchModule(
						props.module_path,
						db,
						fault
					);
					model = monaco.editor.createModel(
						module.file,
						"ciphel",
						uri
					);
					console.log("CREATE MODEL", { model });
				} else {
					console.log("GET MODEL", { model });
				}

				const editor = setup_editor(monaco, model, container_ref);

				const disposable = model.onDidChangeContent(() => {
					const content = model.getValue();
					console.debug("ABOUT TO SAVE", { content });

					periodic_save(content);
				});
				editor.onDidDispose(() => {
					disposable.dispose();
				});

				set_editor(editor);
				set_monaco(monaco);
			} catch (err) {
				const editor = get_editor();
				editor?.getModel()?.dispose();
				editor?.dispose();

				throw new HandledError("Unable to create the editor.");
			}
		})
	);

	onCleanup(
		safe(() => {
			const editor = get_editor();
			if (!editor) {
				cancel();
			} else {
				const content = editor.getModel()?.getValue();
				if (content) {
					// Use non-debounced direct save for cleanup
					DB_MODULES.upsert(db, props.module_path, {
						file: content,
					}).catch(console.error);
				}
				/* Dispose model and editor*/
				editor.getModel()?.dispose();
				editor.dispose();
			}
		})
	);

	/* Change model base on the provided module name */
	createEffect(
		on(
			() => props.module_path,
			async (module_path, prev_module_path) => {
				const monaco = get_monaco();
				if (!monaco) return;
				const editor = get_editor();
				if (!editor) return;

				console.log("ON EFFECT", { module_path, prev_module_path });

				const uri = monaco.Uri.parse(module_path);
				let model: monaco_editor.ITextModel | null;
				model = monaco.editor.getModel(uri);
				if (!model) {
					const module = await GetOrFetchModule(
						module_path,
						db,
						fault
					);
					model = monaco.editor.createModel(
						module.file,
						"ciphel",
						uri
					);
					console.log("CREATE MODEL", { model });
				} else {
					console.log("GET MODEL", { model });
				}

				if (model !== editor.getModel()) {
					const previous_viewstate = editor.saveViewState();
					if (prev_module_path && previous_viewstate) {
						MODULE_EDITOR_VIEWSTATES.set(
							prev_module_path,
							previous_viewstate
						);
					}
					editor.setModel(model);
					editor.restoreViewState(
						MODULE_EDITOR_VIEWSTATES.get(module_path) ?? null
					);
				}
			}
		)
	);

	createEffect(on(props.fetch_signal,
		(module)=> {
			if (!module) return;
			const monaco = get_monaco();
			if (!monaco) return;
			const editor = get_editor();
			if (!editor) return;
			
			const model = editor.getModel();
			if (model) {
				model.setValue(module.code);
			}
		}
	))

	return (
		<section class="w-full h-p95 max-h-p95 pb-4 overflow-hidden">
			<div class="w-full h-full" ref={container_ref}></div>
		</section>
	);
}

export function EditorErrorFallback() {
	return (
		<section
			class="w-full h-full flex justify-center 
		items-center select-none cursor-default 
		bg-night-800 opacity-70 font-semibold 
		text-l text-center text-moon small-caps"
		>
			This editor is disabled
		</section>
	);
}

export default EditorModule;
