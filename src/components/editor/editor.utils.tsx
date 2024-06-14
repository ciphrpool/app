import { IDisposable, editor as monaco_editor, Range } from "monaco-editor";
import { Monaco } from "@monaco-editor/loader";
import theme from "@assets/editor/theme.json";
import syntax from "@assets/editor/syntax";
import { C1, C2, C3, C4, Te_Cursor } from "@utils/player.type";

type CursorInfo = {
	last_commited_line: number;
	last_pushed_line: number;
	active: boolean;
};

export type CursorMetadata = {
	current_cursor: Te_Cursor;
	info: {
		[C1]: CursorInfo;
		[C2]: CursorInfo;
		[C3]: CursorInfo;
		[C4]: CursorInfo;
	};
};

export function default_cursor_metadata(): CursorMetadata {
	return {
		current_cursor: C1,
		info: {
			[C1]: {
				last_commited_line: 0,
				last_pushed_line: 0,
				active: true,
			},
			[C2]: {
				last_commited_line: 0,
				last_pushed_line: 0,
				active: false,
			},
			[C3]: {
				last_commited_line: 0,
				last_pushed_line: 0,
				active: false,
			},
			[C4]: {
				last_commited_line: 0,
				last_pushed_line: 0,
				active: false,
			},
		},
	};
}

const default_code = `/* 
 * Welcome to cipher pool arena !
 * Begin your journey by writing some code
 */ 

println("Hello World");
`;

export function path_of(cursor: Te_Cursor) {
	switch (cursor) {
		case C1:
			return "file://cursor/1";
		case C2:
			return "file://cursor/2";
		case C3:
			return "file://cursor/3";
		case C4:
			return "file://cursor/4";
		default:
			return "file://default";
	}
}

export function model_from(monaco: Monaco, path: string) {
	const uri = monaco.Uri.parse(path);
	return (
		monaco.editor.getModel(uri) ??
		monaco.editor.createModel(default_code, "ciphel", uri)
	);
}

export function delete_cursor(monaco: Monaco, path: string): void {
	const uri = monaco.Uri.parse(path);
	const model = monaco.editor.getModel(uri);

	if (model) {
		model.dispose();
	}
}

export function setup_editor(
	monaco: Monaco,
	model: monaco_editor.ITextModel,
	ref: HTMLElement
): monaco_editor.IStandaloneCodeEditor {
	monaco.editor.defineTheme(
		"ciphel",
		theme as monaco_editor.IStandaloneThemeData
	);
	monaco.languages.register({ id: "ciphel" });
	monaco.languages.setMonarchTokensProvider("ciphel", syntax);
	monaco.languages.setLanguageConfiguration("ciphel", {
		autoClosingPairs: [
			{ open: "{", close: "}" },
			{ open: "[", close: "]" },
			{ open: "(", close: ")" },
			{ open: '"', close: '"' },
			{ open: "'", close: "'" },
		],
		surroundingPairs: [
			{ open: "{", close: "}" },
			{ open: "[", close: "]" },
			{ open: "(", close: ")" },
			{ open: '"', close: '"' },
			{ open: "'", close: "'" },
		],
		brackets: [
			["{", "}"],
			["[", "]"],
			["(", ")"],
			['"', '"'],
			["'", "'"],
		],
		comments: {
			blockComment: ["/*", "*/"],
			lineComment: "//",
		},
	});
	const editor = monaco.editor.create(ref, {
		model: model,
		automaticLayout: true,
		cursorBlinking: "smooth",
		cursorSmoothCaretAnimation: "on",
		fontFamily: "Chakra Petch",
		fontLigatures: true,
		letterSpacing: 1.6, // 0.1em converted to pixels (approximately 1.6px)
		theme: "ciphel",
		language: "ciphel",
	});

	return editor;
}

function is_lock(range: Range, editor: monaco_editor.IStandaloneCodeEditor) {
	const selections = editor.getSelections();
	if (!selections) return false;

	return selections.some(
		(selection) => range.intersectRanges(selection) !== null
	);
}

const EDITOR_READONLY_LISTENERS: Map<
	Te_Cursor,
	{
		on_key_down: IDisposable;
		on_did_change_cursor_selection: IDisposable;
		on_did_change_model_content: IDisposable;
	}
> = new Map();

export function to_readonly(
	cursor: Te_Cursor,
	until: number,
	editor: monaco_editor.IStandaloneCodeEditor
) {
	const model = editor.getModel();
	if (!model) return;
	const range = new Range(1, 0, until + 1, 0);

	const decoration = {
		range: new Range(1, 0, until, 0),
		options: {
			isWholeLine: true,
			className: "editor-line-readonly",
			linesDecorationsClassName: "editor-line-readonly",
		},
	};

	const last_line = model.getLineCount();
	const last_line_content = model.getLineContent(last_line);
	console.log({ last_line, until });

	if (last_line <= until) {
		model.pushEditOperations(
			[],
			[
				{
					range: new Range(
						last_line,
						last_line_content.length + 1,
						last_line,
						last_line_content.length + 1
					),
					text: "\n",
				},
			],
			() => null
		);
	}

	console.log({ decoration });
	editor.createDecorationsCollection([decoration]);
	const on_key_down = editor.onKeyDown((e) => {
		if (is_lock(range, editor)) {
			e.stopPropagation();
			e.preventDefault();
		}
	});
	console.log({ after_read_only: model.getAllDecorations() });

	const on_did_change_cursor_selection = editor.onDidChangeCursorSelection(
		(_) => {
			editor.updateOptions({
				readOnly: is_lock(range, editor),
				readOnlyMessage: {
					value: "Cannot edit already commited lines.",
				},
			});
		}
	);

	const on_did_change_model_content = editor.onDidChangeModelContent(() => {
		const last_line = model.getLineCount();
		const last_line_content = model.getLineContent(last_line);

		if (last_line <= until) {
			model.pushEditOperations(
				[],
				[
					{
						range: new Range(
							last_line,
							last_line_content.length + 1,
							last_line,
							last_line_content.length + 1
						),
						text: "\n",
					},
				],
				() => null
			);
		}
	});

	EDITOR_READONLY_LISTENERS.set(cursor, {
		on_key_down,
		on_did_change_cursor_selection,
		on_did_change_model_content,
	});
}

export function undo_readonly(
	cursor: Te_Cursor,
	editor: monaco_editor.IStandaloneCodeEditor
) {
	const model = editor.getModel();
	if (!model) return;

	const allDecorations = model.getAllDecorations();
	console.log({ before: allDecorations });

	const readOnlyDecorations = allDecorations?.filter(
		(decoration) => decoration.options.className === "editor-line-readonly"
	);
	if (readOnlyDecorations) {
		// editor.createDecorationsCollection(readOnlyDecorations);
		console.log(readOnlyDecorations);

		editor.removeDecorations(readOnlyDecorations.map((d) => d.id));
	}

	console.log({ after: model.getAllDecorations() });

	const disposables = EDITOR_READONLY_LISTENERS.get(cursor);
	if (disposables) {
		disposables.on_key_down.dispose();
		disposables.on_did_change_cursor_selection.dispose();
		disposables.on_did_change_model_content.dispose();
	}
	// editor.onDidChangeCursorSelection(_ => {});

	// editor.onDidChangeModelContent(() => {});

	editor.updateOptions({ readOnly: false });
}

export function preprocess_cmd(cmd: string): string[] {
	return cmd.trim().split(/\s+/);
}
