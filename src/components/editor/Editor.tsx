import {
	editor as monaco_editor,
	Range,
} from "monaco-editor";
import loader, { Monaco } from "@monaco-editor/loader";
import { createEffect, createSignal, on, onCleanup, onMount } from "solid-js";
import { cursor_from, Te_Cursor } from "@utils/player.type";
import {
	CursorMetadata,
	model_from,
	path_of,
	setup_editor,
	to_readonly,
	undo_readonly,
} from "./editor.utils";
import { WebSocketCom } from "@utils/websocket/com";
import { ciphel_io } from "@assets/api/game/ciphel_io";
import { produce, SetStoreFunction } from "solid-js/store";
import { async_safe, HandledError, safe } from "@components/errors/barrier";

export type EditorApi = {
	snapshot?: () => string | null;
	to_readonly?: (line: number) => void;
	get_last_edited_line_number?: () => number | undefined;
};

type EditorProps = {
	api: EditorApi;
	socket: WebSocketCom;
	cursor_data: CursorMetadata;
	set_cursor_data: SetStoreFunction<CursorMetadata>;
};

const EDITOR_VIEWSTATES: Map<Te_Cursor, monaco_editor.ICodeEditorViewState> =
	new Map();

function Editor(props: EditorProps) {
	let container_ref!: HTMLDivElement;
	const [get_monaco, set_monaco] = createSignal<Monaco>();
	const [get_editor, set_editor] =
		createSignal<monaco_editor.IStandaloneCodeEditor>();
	let cancel: () => void = () => {};

	onMount(async_safe(async () => {
		const load_monaco = loader.init();
		cancel = load_monaco.cancel;
		
		try {
			const monaco = await load_monaco;
			const model = model_from(
				monaco,
				path_of(props.cursor_data.current_cursor)
			);
			const editor = setup_editor(monaco, model, container_ref);

			set_editor(editor);
			set_monaco(monaco);
			to_readonly(props.cursor_data.current_cursor, 4, editor);
		} catch (err) {
			const editor = get_editor();
			editor?.getModel()?.dispose();
			editor?.dispose();
			throw new HandledError(
				"Unable to create the editor.");
		}
		props.api.snapshot = () => {
			const editor = get_editor();
			if (!editor) return null;
			const model = editor.getModel();
			if (!model) return null;
			const last_line = model.getLineCount();
			const last_line_content = model.getLineContent(last_line);
			const range = new Range(
				props.cursor_data.info[props.cursor_data.current_cursor]
					.last_commited_line + 1,
				0,
				last_line,
				last_line_content.length + 1
			);

			return model.getValueInRange(range);
		};
		props.api.to_readonly = (line: number) => {
			const editor = get_editor();
			if (!editor) return;
			to_readonly(props.cursor_data.current_cursor, line, editor);
		};
		props.api.get_last_edited_line_number = () => {
			const editor = get_editor();
			if (!editor) return;
			const model = editor.getModel();
			if (!model) return;

			const last_line = model.getLineCount();
			return last_line;
		};
		props.socket.on_request((request: ciphel_io.CiphelRequest) => {
			const editor = get_editor();
			if (!editor) return;
			const model = editor.getModel();
			if (!model) return;

			const last_line = model.getLineCount();
			if (!editor) return;

			let cursor: Te_Cursor | undefined;

			switch (request.requestType) {
				case "commited":
					undo_readonly(props.cursor_data.current_cursor, editor);
					to_readonly(
						props.cursor_data.current_cursor,
						last_line,
						editor
					);
					props.set_cursor_data(
						produce((draft) => {
							const cursor = draft.current_cursor;
							draft.info[cursor].last_commited_line =
								last_line;
						})
					);
					break;
				case "reverted":
					undo_readonly(props.cursor_data.current_cursor, editor);

					if (
						props.cursor_data.info[
							props.cursor_data.current_cursor
						].last_pushed_line > 0
					) {
						to_readonly(
							props.cursor_data.current_cursor,
							props.cursor_data.info[
								props.cursor_data.current_cursor
							].last_pushed_line,
							editor
						);
					}
					props.set_cursor_data(
						produce((draft) => {
							const cursor = draft.current_cursor;
							draft.info[cursor].last_commited_line =
								draft.info[cursor].last_pushed_line;
						})
					);
					break;
				case "pushed":
					props.set_cursor_data(
						produce((draft) => {
							const cursor = draft.current_cursor;
							draft.info[cursor].last_pushed_line =
								draft.info[cursor].last_commited_line;
						})
					);
					break;
				case "spawnThread":
					if (
						!request.spawnThread ||
						request.spawnThread?.cursor === undefined ||
						request.spawnThread?.cursor === null
					)
						return;
					cursor = cursor_from(request.spawnThread?.cursor);

					if (!cursor) return;

					props.set_cursor_data(
						produce((draft) => {
							draft.info[cursor!].active = true;
						})
					);
					break;
				case "closeThread":
					if (
						!request.closeThread ||
						!request.closeThread?.cursor
					)
						return;
					cursor = cursor_from(request.closeThread?.cursor);
					if (!cursor) return;

					props.set_cursor_data(
						produce((draft) => {
							draft.info[cursor!].active = false;
						})
					);
					break;
				default:
					break;
			}
		});
	}));

	onCleanup(safe(() => {
		const editor = get_editor();
		if (!editor) {
			cancel();
		} else {
			/* Dispose model and editor*/
			editor.getModel()?.dispose();
			editor.dispose();
		}
	}));

	/* Change model base on the provided cursor */
	createEffect(
		on(
			() => props.cursor_data.current_cursor,
			(cursor, prev_cursor) => {
				const monaco = get_monaco();
				if (!monaco) return;
				const editor = get_editor();
				if (!editor) return;

				const model = model_from(
					monaco,
					path_of(props.cursor_data.current_cursor)
				);

				if (model !== editor.getModel()) {
					const previous_viewstate = editor.saveViewState();
					if (prev_cursor && previous_viewstate) {
						EDITOR_VIEWSTATES.set(prev_cursor, previous_viewstate);
					}
					editor.setModel(model);
					editor.restoreViewState(
						EDITOR_VIEWSTATES.get(cursor) ?? null
					);
				}
			}
		)
	);

	return (
		<section class="w-full h-full ">
			<div class="w-full h-full" ref={container_ref}></div>
		</section>
	);
}

export function EditorErrorFallback() {
	return <section class="w-full h-ful flex justify-center 
		items-center select-none cursor-default 
		bg-night-800 opacity-70 font-semibold 
		text-l text-center text-moon small-caps">
		This editor is disabled
	</section>;
}

export default Editor;
