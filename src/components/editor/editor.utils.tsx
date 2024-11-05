import { IDisposable, editor as monaco_editor, Range } from "monaco-editor";
import { Monaco } from "@monaco-editor/loader";
import theme from "@assets/editor/theme.json";
import syntax from "@assets/editor/syntax";
import { C1, C2, C3, C4, Te_Cursor } from "@utils/player.type";
import { createContext, createSignal, JSXElement, useContext } from "solid-js";
import { createStore } from "solid-js/store";

type CursorInfo = {
	remote_barrier: number;
	commited_line:number;
	active: boolean;
};

type CursorMetadataStore = {
	info: {
	  [C1]: CursorInfo;
	  [C2]: CursorInfo;
	  [C3]: CursorInfo;
	  [C4]: CursorInfo;
	};
  };
  
function createCursorMetadata() {
	const [store, setStore] = createStore<CursorMetadataStore>({
		info: {
		[C1]: { remote_barrier: 0, commited_line:0, active: false },
		[C2]: { remote_barrier: 0, commited_line:0, active: false },
		[C3]: { remote_barrier: 0, commited_line:0, active: false },
		[C4]: { remote_barrier: 0, commited_line:0, active: false },
		},
	});
	const [currentCursor, setCurrentCursor] = createSignal<Te_Cursor>(C1);

	return {
		get current_cursor() {
			return currentCursor();
		},
		set current_cursor(cursor: Te_Cursor) {
			setCurrentCursor(cursor);
		},
		get info() {
			return store.info;
		},
		setInfo(cursor: Te_Cursor, updates: Partial<CursorInfo>) {
			setStore('info', cursor, (cursorInfo) => ({ ...cursorInfo, ...updates }));
		},
	};
}

type CursorMetadataContextValue = ReturnType<typeof createCursorMetadata>;

export const CursorMetadataContext = createContext<CursorMetadataContextValue>();

export function useCursorMetadata<T = CursorMetadataContextValue>() {
    return useContext(CursorMetadataContext) as T;
}


type CursorMetadataProviderProps = {
	children?: JSXElement;
}

export function CursorMetadataProvider(props:CursorMetadataProviderProps) {
	const cursor_metadata = createCursorMetadata();
	return <CursorMetadataContext.Provider value={cursor_metadata}>
		{props.children}
	</CursorMetadataContext.Provider>
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
  
interface ReadonlyState {
	range : Range;
	listeners: {
	  on_key_down: IDisposable;
	  on_did_change_cursor_selection: IDisposable;
	  on_did_change_model_content: IDisposable;
	};
}

const EDITOR_READONLY_LISTENERS: Map<
	Te_Cursor,ReadonlyState
> = new Map();

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

export function to_readonly(
	cursor: Te_Cursor,
	until: number,
	editor: monaco_editor.IStandaloneCodeEditor
) {
	const model = editor.getModel();
	if (!model) return;
	
	const range = new Range(1, 1, until, until > 0 ? model.getLineMaxColumn(until) : 1);

	const on_key_down = editor.onKeyDown((e) => {
		if (is_lock(range, editor)) {
			e.stopPropagation();
			e.preventDefault();
		}
	});

	const on_did_change_cursor_selection = editor.onDidChangeCursorSelection(
		() => {
			editor.updateOptions({
				readOnly: is_lock(range, editor),
				readOnlyMessage: {
					value: "Cannot edit already commited code.",
				},
			});
		}
	);

	ensure_editable_line(model, until);
	const on_did_change_model_content = editor.onDidChangeModelContent(() => {
		ensure_editable_line(model, until);
	});

	EDITOR_READONLY_LISTENERS.set(cursor, {
		listeners : {
			on_key_down,
			on_did_change_cursor_selection,
			on_did_change_model_content,
		},
		range,
	});
}

export function undo_readonly(
	cursor: Te_Cursor,
	editor: monaco_editor.IStandaloneCodeEditor
) {
	const model = editor.getModel();
	if (!model) return;

	const allDecorations = model.getAllDecorations();

	const readOnlyDecorations = allDecorations?.filter(
		(decoration) => decoration.options.className === "editor-line-readonly"
	);
	if (readOnlyDecorations) {
		editor.removeDecorations(readOnlyDecorations.map((d) => d.id));
	}

	const disposables = EDITOR_READONLY_LISTENERS.get(cursor);
	if (disposables) {
		disposables.listeners.on_key_down.dispose();
		disposables.listeners.on_did_change_cursor_selection.dispose();
		disposables.listeners.on_did_change_model_content.dispose();
	}
	
	editor.updateOptions({ readOnly: false });
}


function ensure_editable_line(model: monaco_editor.ITextModel, until: number) {
	const lastLine = model.getLineCount();
	
	if (lastLine <= until) {
	  model.pushEditOperations(
		[],
		[
		  {
			range: new Range(lastLine, model.getLineMaxColumn(lastLine), lastLine, model.getLineMaxColumn(lastLine)),
			text: "\n",
		  },
		],
		() => null
	  );
	}
}

export function add_pushed_comment(line:number, editor: monaco_editor.IStandaloneCodeEditor) {
	const model = editor.getModel();
	if (!model) return;
	model.pushEditOperations(
		[],
		[
		  {
			range: new Range(line, model.getLineMaxColumn(line), line, model.getLineMaxColumn(line)),
			text: "\n/* * * * * * * * * ^ PUSHED ^ * * * * * * * * */\n",
		  },
		],
		() => null
	  );
}