import { languages, editor as monaco_editor } from 'monaco-editor'
import loader, { Monaco } from '@monaco-editor/loader'
import { createEffect, createSignal, on, onCleanup, onMount } from 'solid-js';
import theme from "@assets/editor/theme.json";
import syntax from "@assets/editor/syntax";
import { C1, C2, C3, C4, Te_Cursor } from '@utils/player.type';

const default_code = `
enum Sport {
    FOOT,
    BASKET,
}

fn _fft(Vec<f64> buf, Vec<f64> out, i64 n, i64 step) {
    if (step < n) {
          _fft(out, buf, n, step * 2);
          _fft(out + step, buf + step, n, step * 2);
        let i:u64 = 0;
        while (i < n) {
          let t:f64 = exp(-PI() * (i / n) as f64 ) * out[i + step];
          buf[i / 2] = out[i] + t;
          buf[(i + n as u64)/2] = out[i] - t;
             i = i + 2 * step;
        }
    }
}
/*
    doc comments
*/
// comment
fn fft(Vec<f64> buf, i64 n) {
    let out : Vec<f64> = vec(n);
    for i in 0u64..(n as u64) {
          out[i] = buf[i];
    }
    _fft(buf, out, n, 1);
}

fn main() -> u64 {
    println("Hello World");
    let a = 'e';
    let x = 2;
    let y = 2.0;
    let z = 2.0f64;
    let buf:Vec<f64> = vec[1, 1, 1, 1, 0, 0, 0, 0];
    fft(buf, 8);
    return 0;
}
`;

function path_of(cursor:Te_Cursor) {
    switch (cursor) {
        case C1:
            return "file://cursor/1"
        case C2:
            return "file://cursor/2"
        case C3:
            return "file://cursor/3"
        case C4:
            return "file://cursor/4"
        default:
            return "file://default"
    }
}

function model_from(monaco: Monaco, path: string) {
    const uri = monaco.Uri.parse(path)
    return monaco.editor.getModel(uri) 
        ?? monaco.editor.createModel(default_code, "ciphel", uri)
}

function setup_editor(
    monaco: Monaco,
    model:monaco_editor.ITextModel,
    ref: HTMLElement
) : monaco_editor.IStandaloneCodeEditor 
{
    monaco.editor.defineTheme(
        "ciphel",theme as monaco_editor.IStandaloneThemeData
    )
    monaco.languages.register({id:"ciphel"})
    monaco.languages.setMonarchTokensProvider("ciphel",syntax);
    monaco.languages.setLanguageConfiguration('ciphel', {
        autoClosingPairs: [
          { open: '{', close: '}' },
          { open: '[', close: ']' },
          { open: '(', close: ')' },
          { open: '"', close: '"' },
          { open: "'", close: "'" }
        ],
        surroundingPairs: [
          { open: '{', close: '}' },
          { open: '[', close: ']' },
          { open: '(', close: ')' },
          { open: '"', close: '"' },
          { open: "'", close: "'" }
        ],
        brackets: [
            ['{','}'],
            ['[',']'],
            ['(',')'],
            ['"','"'],
            ['\'','\''],
        ],
        comments:{
            blockComment:['/*','*/'],
            lineComment:'//'
        }
      });
    const editor = monaco.editor.create(ref,{
        model:model,
        automaticLayout: true,
        cursorBlinking : "smooth",
        cursorSmoothCaretAnimation : "on",
        fontFamily : "Chakra Petch",
        fontLigatures:true,
        letterSpacing: 1.6, // 0.1em converted to pixels (approximately 1.6px)
        theme:"ciphel",
        language:"ciphel",
    })

    return editor;
}

type EditorProps = {
    e_cursor : Te_Cursor
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

        }catch(err) {
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