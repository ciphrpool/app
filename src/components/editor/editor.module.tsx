import { editor as monaco_editor } from "monaco-editor";
import loader, { Monaco } from "@monaco-editor/loader";
import { createSignal, onCleanup, onMount } from "solid-js";
import { model_from, setup_editor } from "./editor.utils";
import { async_safe, HandledError, safe } from "@components/errors/barrier";
import { DBCoreRangeType } from "dexie";
import { useDatabase } from "@utils/DB/db.context";
import { DB_MODULES } from "@utils/DB/module.db";
import { useFault } from "@components/errors/fault";
import { debounce } from "@utils/time";

type EditorModuleProps = {
	module_path: string;
	init_file?: string;
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
				const model = model_from(
					monaco,
					props.module_path,
					props.init_file
				);
				const editor = setup_editor(monaco, model, container_ref);

				const disposable = model.onDidChangeContent(() => {
					const content = model.getValue();
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

	return (
		<section class="w-full h-full ">
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
