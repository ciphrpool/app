import TerminalIcon from "@assets/icons/terminal.svg?component-solid"

import { For, Show, createEffect, createSignal, on, onCleanup, onMount, splitProps } from 'solid-js';
import { preprocess_cmd } from "./utils";
import { EditorApi } from "./Editor";
import { WebSocketCom } from "@utils/websocket/com";
import { Te_Player, side_of } from "@utils/player.type";
import { createStore, produce } from "solid-js/store";

const In = Symbol('In');
const Out = Symbol('Out');
type Te_IOstate = typeof In | typeof Out;

type PrefixProps = {
    username:string,
    file?:string,
}

function Prefix(props:PrefixProps) {
    return <>
        <span class="text-pl1-200">{props.username}</span>
        <span class="text-ego">@ciphel</span>
        <Show when={props.file} fallback={
            <span class="text-night-300 mx-1"> $ </span>
        }>
            <span class="text-night-300 mx-1"> : {props.file}$</span>
        </Show>
    </>
}

// choco <3
type LineProps = {
    prefix : PrefixProps
    readonly : string,
    editable : boolean,
    ref?: (ref:HTMLInputElement) => void,
    on_submit?: (line:string) => void
}
function Line(props:LineProps) {
    const [local, others] = splitProps(props, ["ref"]);
    const [get_msg,set_msg] = createSignal<string>("");

    return <div class="flex">
        <Prefix 
            username={props.prefix!.username}
            file={props.prefix!.file}
        />
        {props.readonly}
        <Show when={props.editable}>
            <form
                class="flex-grow"
                onSubmit={
                    (e) => {
                        e.preventDefault();
                        props.on_submit && props.on_submit(get_msg());
                        set_msg("");
                    }}>
                <input
                    ref={local.ref}
                    class="w-full bg-night-800   text-moon outline-none" 
                    placeholder=""
                    value={get_msg()}
                    onInput={
                        (e) => {
                            e.preventDefault();
                            set_msg(e.target.value);
                        }
                    }
                    spellcheck={false} 
                    >
                </input>
            </form>            
        </Show>
    </div>
}

type Line = {
    username:string,
    file?:string,
    content:string,
    editable : boolean,
    in_out : Te_IOstate,
}

type ConsoleProps = {
    class ?: string,
    classList ?: {
        [k: string]: boolean | undefined;
    },
    editor_api : EditorApi,
    socket : WebSocketCom,
    side:Te_Player,
}
function Console(props:ConsoleProps) {
    let input_ref!:HTMLInputElement;
    let default_input_ref!:HTMLInputElement;
    let outputs_ref!:HTMLDivElement;
    // const [get_lines,set_lines] = createSignal<Line[]>([]);
    const [lines, set_lines] = createStore<Line[]>([]);
    const [get_is_waiting_input,set_waiting_input] = createSignal(false);
    const [is_focus,set_focus] = createSignal<boolean>(false);

    props.socket.on_req_input = () => {
        console.debug("request for std in");
        set_waiting_input(true);
        set_lines(
            produce((draft) => {
              if (draft.length > 0 && draft[draft.length - 1].in_out === In && draft[draft.length - 1].content === "") {
                draft.pop();
              }
              if (draft.length > 0) {
                draft[draft.length - 1].editable = true;
                draft[draft.length - 1].in_out = Out;
              }
            })
          );
        outputs_ref.scrollTop = outputs_ref.scrollHeight;
    }
    props.socket.on_stderr = (msg:string) => {
        console.debug("err >> " + msg)
        set_lines(
            produce((draft) => {
              if (draft.length > 0 && draft[draft.length - 1].editable) {
                draft[draft.length - 1].editable = false;
                if (draft[draft.length - 1].in_out === In && draft[draft.length - 1].content === "") {
                  draft.pop();
                }
              }
              draft.push({ content: msg, username: "user", editable: false, in_out: Out });
            })
        ); 
        if (default_input_ref && !get_is_waiting_input()) {
            default_input_ref.focus();
        }
        outputs_ref.scrollTop = outputs_ref.scrollHeight;
    }
    props.socket.on_stdout = (msg:string) => {
        console.debug("out >> " + msg)
        set_lines(
            produce((draft) => {
              if (draft.length > 0 && draft[draft.length - 1].editable) {
                draft[draft.length - 1].editable = false;
                if (draft[draft.length - 1].in_out === In && draft[draft.length - 1].content === "") {
                  draft.pop();
                }
              }
              draft.push({ content: msg, username: "user", editable: false, in_out: Out });
            })
        );
        if (default_input_ref && !get_is_waiting_input()) {
            default_input_ref.focus();
        }
        outputs_ref.scrollTop = outputs_ref.scrollHeight;
    }
    
    function handle_submit(line:string,is_cmd : boolean) {
        if (!line) return;
        
        if (is_cmd) {
            set_lines(
                produce((draft) => {
                  if (draft.length > 0 && draft[draft.length - 1].editable) {
                    draft[draft.length - 1].editable = false;
                    if (draft[draft.length - 1].in_out === In && draft[draft.length - 1].content === "") {
                      draft.pop();
                    }
                  }
                  draft.push({ content: line, username: "user", file: "cmd", editable: false, in_out: In });
                })
            );
            outputs_ref.scrollTop = outputs_ref.scrollHeight;
            const [cmd_id,...args] = preprocess_cmd(line);
            if (!cmd_id) return;
            if (cmd_id === "compile" && props.editor_api.snapshot) {
                const res = props.editor_api.snapshot();
                if (!res) return;
                props.socket.send({
                    command:{
                        cmd:cmd_id,
                        args,
                        src:{
                            content:res.content,
                            side:side_of(props.side),
                        }
                    }});
                return;
            }
            
            props.socket.send({
                command:{
                    cmd:cmd_id,
                    args,
                }});
        }else {
            set_waiting_input(false);
            set_lines(
                produce((draft) => {
                  if (draft.length > 0 && draft[draft.length - 1].editable) {
                    draft[draft.length - 1].editable = false;
                    draft[draft.length - 1].content += line;
                  }
                })
              );
            props.socket.send({
                in:{
                    content:line
            }});
        }
        return;
    }

    return <div class={props.class} classList={props.classList}>
        <div class="flex w-full h-full border-t overflow-hidden border-night-900" 
        onFocusIn={() => {
            set_focus(true);
            if (default_input_ref && !get_is_waiting_input()) {
                default_input_ref.focus();
            }
            outputs_ref.scrollTop = outputs_ref.scrollHeight;
        }}
        onFocusOut={() => set_focus(false)}
        onClick={() => {
            if (!is_focus()) {
                set_focus(true);
                if (default_input_ref && !get_is_waiting_input()) {
                    default_input_ref.focus();
                }
                outputs_ref.scrollTop = outputs_ref.scrollHeight;
            }
        }}
        >
            <div class="h-fit w-fit p-4 bg-night-900">
                <TerminalIcon class="cursor-pointer"/>
            </div>
            <div class="flex flex-col p-4 w-full bg-night-800">
                <div 
                    class="flex-grow overflow-y-auto"
                    ref={outputs_ref}
                    classList={{
                        "pb-4":lines.length > 0,
                    }}
                >
                    <For 
                        each={lines
                            .flatMap(
                                (line)=> {
                                    const lines = line.content.split("\n") ?? [];
                                    if (lines.length > 1 && lines[lines.length - 1] === "" && !line.editable) {
                                        lines.pop();
                                    } 
                                    return lines.map(
                                        (l,idx) => {
                                            return {
                                                username:line.username,
                                                content:l,
                                                file:line.file,
                                                in_out:line.in_out,
                                                editable:idx === lines.length -1 ? line.editable : undefined,
                                            } as Line
                                        })
                                }
                        )}
                    >
                        {(line,_) => {
                            return <Line 
                                prefix={{username:line.username,file:line.file}} 
                                readonly={line.content}
                                editable={line.editable}
                                on_submit={line.editable !== undefined ? 
                                    (content) => handle_submit(content,line.in_out === In) 
                                    : undefined}
                                ref={line.editable !== undefined ? 
                                    e => (input_ref = e) 
                                    : undefined}/>
                        }}
                    </For>
                </div>
                 <div class="flex-grow"
                    classList={{
                        "pt-4 border-t border-night-600":lines.length > 0,
                    }}
                    >
                    <Line 
                        prefix={{username:"user",file:"cmd"}} 
                        readonly={""}
                        editable={true}
                        on_submit={
                            (content) => handle_submit(content,true) 
                        }
                        ref={
                            e => (default_input_ref = e)
                        }/>
                </div> 
            </div>
        </div>
    </div>
}

export default Console;