import { languages, editor as monaco_editor, Range} from 'monaco-editor'
import loader, { Monaco } from '@monaco-editor/loader'
import { createEffect, createSignal, on, onCleanup, onMount } from 'solid-js';
import theme from "@assets/editor/theme.json";
import syntax from "@assets/editor/syntax";
import { C1, C2, C3, C4, Te_Cursor } from '@utils/player.type';
import { model_from, path_of, setup_editor, to_readonly } from './utils';

export type EditorApi = {
    snapshot ?: () => {content :string,last_line:number} | null,
    to_readonly ?: (line:number) => void,
}

type EditorProps = {
    e_cursor : Te_Cursor,
    api : EditorApi,
}

const EDITOR_VIEWSTATES : Map<Te_Cursor,monaco_editor.ICodeEditorViewState> = new Map();

function Editor(props:EditorProps) {
    let container_ref!: HTMLDivElement ;
    const [get_monaco, set_monaco] = createSignal<Monaco>()
    const [get_editor, set_editor] = createSignal<monaco_editor.IStandaloneCodeEditor>()
    let cancel : () => void = () => {};
    
    onMount(async () => {
        const load_monaco = loader.init()
        cancel = load_monaco.cancel;
        try {
            const monaco = await load_monaco;
            const model = model_from(monaco,path_of(props.e_cursor))
            const editor = setup_editor(monaco,model,container_ref);

            set_editor(editor);set_monaco(monaco);
            props.api.snapshot = () => {
                const editor = get_editor();
                if (!editor) return null;
                const model =  editor.getModel()
                if (!model) return null;
                const last_line = model.getLineCount();
                return {content:editor.getValue(),last_line};
            };
            props.api.to_readonly = (line:number) => {
                const editor = get_editor();
                if (!editor) return;
                to_readonly(line, editor);
            };
        } catch(err) {
            /* TODO : handle error*/
        }
    })

    onCleanup(() => {
        const editor = get_editor();
        if (!editor) {
            cancel()
        } else {
            /* Dispose model and editor*/
            editor.getModel()?.dispose()
            editor.dispose()
        }
    })

    /* Change model base on the provided cursor */
    createEffect(
        on(
            () => props.e_cursor,
            (cursor,prev_cursor) => {
                const monaco = get_monaco()
                if (!monaco) return
                const editor = get_editor()
                if (!editor) return
                
                const model = model_from(monaco,path_of(props.e_cursor))
                
                
                if (model !== editor.getModel()) {
                    const previous_viewstate = editor.saveViewState()
                    if (prev_cursor && previous_viewstate) {
                        EDITOR_VIEWSTATES.set(prev_cursor,previous_viewstate)
                    }
                    editor.setModel(model)
                    editor.restoreViewState(EDITOR_VIEWSTATES.get(cursor) ?? null)
                }
            }
        )
    ) 

    return <div class="w-full h-full">
        <div class="w-full h-full" ref={container_ref}></div>
    </div>
}

export default Editor;