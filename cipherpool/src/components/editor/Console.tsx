import TerminalIcon from "@assets/icons/terminal.svg?component-solid"

import { For, Show, createEffect, createSignal, on, onCleanup, onMount, splitProps } from 'solid-js';

type ConsoleProps = {
    class ?: string,
    classList ?: {
        [k: string]: boolean | undefined;
    },
}
const In = Symbol('In');
const Out = Symbol('Out');
type Te_IOstate = typeof In | typeof Out;

type Log = {
    io : Te_IOstate,
    prefix: PrefixProps,
    msg : string,
}

type PrefixProps = {
    username:string,
    file?:string,
    io?:Te_IOstate,
}

function Prefix(props:PrefixProps) {
    return <>
        <p class="text-pl1-200">{props.username}</p>
        <p class="text-ego">@ciphel</p>
        <Show when={props.file} fallback={
            <p class="text-night-300 mx-1">{props.io == In ? '<' : ' >'} </p>
        }>
            <p class="text-night-300 mx-1"> : {props.file}$</p>
        </Show>
    </>
}

type RowProps = {
    io : Te_IOstate,
    msg_io ?: Te_IOstate,
    prefix : PrefixProps, 
    msg ?: string,
    ref?: (ref:HTMLInputElement) => void,
    on_submit?: (cmd:Log) => void
}

// choco <3
function Row(props:RowProps) {
    const [local, others] = splitProps(props, ["ref"]);
    const [get_msg,set_msg] = createSignal<string>("");

    switch (props.io) {
        case In:
            return <span class="flex px-4 w-full">
                <Prefix 
                    username={props.prefix.username}
                    file={props.prefix.file}
                    />
                <form
                    class="pl-4 flex-grow"
                    onSubmit={
                        (e) => {
                            e.preventDefault();
                            props.on_submit && props.on_submit({
                                io:In,
                                prefix:props.prefix,
                                msg:get_msg(),
                            });
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
            </span>
        case Out:
        default:
            const lines = props.msg?.split("\n") ?? [];

            return <span class="flex px-4 w-full" classList={{
                "flex-col":lines.length > 1,
                "flex-row":lines.length <= 1,
            }}>
                <span class="flex flex-row">
                    <Prefix 
                        username={props.prefix.username}
                        io={props.msg_io}
                        />
                    <Show when={lines.length >= 1}>
                        <p class="text-moon">{lines[0]}</p>
                    </Show>
                </span>
                <Show when={lines.length > 1}>
                    <For each={lines.slice(1)}>
                        {(line,_) => 
                            <p class="text-moon">{'>'}{line}</p>
                        }
                    </For>
                </Show>
            </span>
    }
}

function Console(props:ConsoleProps) {
    let input_ref!:HTMLInputElement;
    let logs_ref!:HTMLDivElement;
    const [get_log,set_log] = createSignal<Log[]>([]);
    const [is_focus,set_focus] = createSignal<boolean>(false);

    return <div class={props.class} classList={props.classList}>
        <div class="flex w-full h-full border-t overflow-hidden border-night-900" 
        onFocusIn={() => {
            set_focus(true)
            input_ref.focus()
        }}
        onFocusOut={() => set_focus(false)}
        onClick={() => {
            if (!is_focus()) {
                console.log("focus");
                set_focus(true)
                input_ref.focus()
            }
        }}
        >
            <div class="h-fit w-fit p-4 bg-night-900">
                <TerminalIcon class="cursor-pointer"/>
            </div>
            <div class="flex flex-col py-4 w-full bg-night-800">
                <div 
                    class="flex-grow overflow-y-auto"
                    ref={logs_ref}>
                    <For each={get_log()}>
                        {(log,_) => 
                            <Row 
                            io={Out}
                            msg_io={log.io} 
                            prefix={log.prefix} 
                            msg={log.msg}/> 
                        }
                    </For>
                </div>
                <div class="flex-grow">
                    <Row 
                        io={In}
                        ref={e => (input_ref = e)}
                        prefix={{file:"cmd",username:"user"}} 
                        on_submit={(cmd)=> {
                            set_log((prev) => {
                                return [...prev,cmd]
                            })
                            logs_ref.scrollTop = logs_ref.scrollHeight;
                        }}/>
                </div>
            </div>
        </div>
    </div>
}

export default Console;