import {
	editor as monaco_editor,
	Range,
} from "monaco-editor";
import loader, { Monaco } from "@monaco-editor/loader";
import { createEffect, createSignal, on, onCleanup, onMount } from "solid-js";
import { cursor_from, Te_Cursor } from "@utils/player.type";
import {
	add_pushed_comment,
	model_from,
	path_of,
	setup_editor,
	to_readonly,
	undo_readonly,
	useCursorMetadata,
} from "./editor.utils";
import { ciphel_io } from "ts_proto_api";

import { produce, SetStoreFunction } from "solid-js/store";
import { async_safe, HandledError, safe } from "@components/errors/barrier";
import { useSocket } from "@components/io_com/ws";

export type SnapshotResult = {
	src :string,
	first_line : number,
	last_line : number,
}

export type EditorApi = {
	snapshot?: () => SnapshotResult | null;
	to_readonly?: (line: number) => void;
	get_last_edited_line_number?: () => number | undefined;
};

type EditorProps = {
	api: EditorApi;
};

const EDITOR_VIEWSTATES: Map<Te_Cursor, monaco_editor.ICodeEditorViewState> =
	new Map();

function Editor(props: EditorProps) {
	
	const socket = useSocket();
	const cursor_metadata = useCursorMetadata();

	let container_ref!: HTMLDivElement;
	const [get_monaco, set_monaco] = createSignal<Monaco>();
	const [get_editor, set_editor] =
		createSignal<monaco_editor.IStandaloneCodeEditor>();
	let cancel: () => void = () => {};

	socket.on_request((request: ciphel_io.API_Signal) => {
		const editor = get_editor();
		if (!editor) return;
		const model = editor.getModel();
		if (!model) return;
		
		if ("commitCode" === request.SignalType) {
			undo_readonly(cursor_metadata.current_cursor, editor);

			const res = cursor_from(request.commitCode?.tid as number);
			if (!res) return;
			const [cursor,player] = res;

			to_readonly(
				cursor_metadata.current_cursor,
				cursor_metadata.info[cursor].commited_line,
				editor
			);

			cursor_metadata.setInfo(cursor_metadata.current_cursor, {
				remote_barrier : cursor_metadata.info[cursor].commited_line + 1,
			});
		}
	});

	onMount(async_safe(async () => {
		
		const load_monaco = loader.init();
		cancel = load_monaco.cancel;
		
		try {
			const monaco = await load_monaco;
			const model = model_from(
				monaco,
				path_of(cursor_metadata.current_cursor)
			);
			const editor = setup_editor(monaco, model, container_ref);

			set_editor(editor);
			set_monaco(monaco);
			to_readonly(cursor_metadata.current_cursor, 4, editor);
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
			const first_line = cursor_metadata.info[cursor_metadata.current_cursor].remote_barrier;
			const last_line = model.getLineCount();
			const last_line_content = model.getLineContent(last_line);
			const range = new Range(
				first_line,
				0,
				last_line,
				last_line_content.length + 1
			);
			return {
				first_line,
				last_line,
				src : model.getValueInRange(range),
			};
		};
		props.api.to_readonly = (line: number) => {
			const editor = get_editor();
			if (!editor) return;
			to_readonly(cursor_metadata.current_cursor, line, editor);
		};
		props.api.get_last_edited_line_number = () => {
			const editor = get_editor();
			if (!editor) return;
			const model = editor.getModel();
			if (!model) return;

			const last_line = model.getLineCount();
			return last_line;
		};
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
			() => cursor_metadata.current_cursor,
			(cursor, prev_cursor) => {
				const monaco = get_monaco();
				if (!monaco) return;
				const editor = get_editor();
				if (!editor) return;

				const model = model_from(
					monaco,
					path_of(cursor_metadata.current_cursor)
				);

				if (model !== editor.getModel()) {
					const previous_viewstate = editor.saveViewState();
					if (prev_cursor && previous_viewstate) {
						EDITOR_VIEWSTATES.set(prev_cursor, previous_viewstate);
					}
					if (prev_cursor) {
						undo_readonly(prev_cursor, editor);
					}
					editor.setModel(model);
					to_readonly(
						cursor_metadata.current_cursor,
						cursor_metadata.info[cursor].remote_barrier,
						editor
					);
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
