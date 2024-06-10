import { editor as monaco_editor, Range} from 'monaco-editor'
import { Monaco } from '@monaco-editor/loader'
import theme from "@assets/editor/theme.json";
import syntax from "@assets/editor/syntax";
import { C1, C2, C3, C4, Te_Cursor } from '@utils/player.type';


const default_code = `/* 
 * Welcome to cipher pool arena !
 * Begin your journey by writing some code
 */ 

println("Hello World");
`;

export function path_of(cursor:Te_Cursor) {
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

export function model_from(monaco: Monaco, path: string) {
    const uri = monaco.Uri.parse(path)
    return monaco.editor.getModel(uri) 
        ?? monaco.editor.createModel(default_code, "ciphel", uri)
}

export function setup_editor(
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


function is_lock(range:Range,editor: monaco_editor.IStandaloneCodeEditor) {
    const selections = editor.getSelections();
    if (!selections) return false;

    return selections.some(selection => range.intersectRanges(selection) !== null)
}

export function to_readonly(until:number,editor: monaco_editor.IStandaloneCodeEditor) {
    const model = editor.getModel();
    if (!model) return;
    const range = new Range(1, 0, until + 1, 0)
    const decoration = {
        range: new Range(1, 0, until, 0),
        options: {
            isWholeLine: true,
            className: 'editor-line-readonly',
            linesDecorationsClassName: 'editor-line-readonly'
        }
    };
    editor.createDecorationsCollection([decoration]);
    editor.onKeyDown(e => {
        if (is_lock(range,editor)) {
          e.stopPropagation();
          e.preventDefault();
        }
      });

    editor.onDidChangeCursorSelection(_ => {
        editor.updateOptions({readOnly: is_lock(range,editor), readOnlyMessage: {value: 'Cannot edit already commited lines.'}});
    });

    editor.onDidChangeModelContent(() => {
        const last_line = model.getLineCount();
        const last_line_content = model.getLineContent(last_line);
    
        if (last_line <= until) {
            model.pushEditOperations([], [
                {
                    range: new Range(last_line, last_line_content.length + 1, last_line, last_line_content.length + 1),
                    text: '\n'
                }
            ], () => null);
        }
    });
}

export function preprocess_cmd(cmd:string) : string[] {
    return cmd.trim().split(/\s+/);
}