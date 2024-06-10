import Header from "@components/headers/in_game/ArenaHeader";
import Footer from "@components/footers/DefaultFooter";
import Editor from "@components/editor/Editor";
import Todo from "@components/utils/Todo";
import Control from "@components/editor/Control";
import { createSignal } from "solid-js";
import { C1, P1, Te_Cursor } from "@utils/player.type";
import Console from "@components/editor/Console";
import {ciphel_io} from "@assets/api/game/ciphel_io";
import { createWebSocket } from "@utils/websocket/com";
const {StdIn,StdErr,StdInRequest,StdIO,StdOut,SrcCode,Command,PlayerSide} = ciphel_io;

function test_send(socket:WebSocket,msg:string) {
    const compile_cmd = StdIO.encode({
        command : {
            cmd:"compile",
            src:{content:msg,side:PlayerSide.P1}
        }
    }).finish();
    socket.send(compile_cmd)

    
    const commit_cmd = StdIO.encode({
        command : {
            cmd:"commit",
        }
    }).finish();
    socket.send(commit_cmd)

    
    const push_cmd = StdIO.encode({
        command : {
            cmd:"push",
        }
    }).finish();
    socket.send(push_cmd)
}

function Arena() {
    const [get_cursor,set_cursor] = createSignal<Te_Cursor>(C1);
    const socket = createWebSocket();
    const editor_api = {};

    return <div class="flex flex-col h-screen max-h-screen">
        <Header />
        <main class="flex-grow w-full overflow-hidden grid grid-cols-2 grid-flow-row">
            {/* <Todo> Editor</Todo> */}
            <section class="flex flex-col overflow-hidden">
                <div class="flex w-full flex-grow max-h-100 overflow-hidden">
                    <Control active={get_cursor()} change_cursor={(cursor) => {
                        set_cursor(cursor)
                    }}/>
                    <Editor e_cursor={get_cursor()} api={editor_api}/>
                </div>
                <Console 
                    class="flex-grow-0 max-h-[50%] overflow-hidden"
                    editor_api={editor_api}
                    socket={socket}
                    side={P1}
                    />
            </section>
            <section class="bg-night-600">
                <Todo> Game</Todo>
            </section>
        </main>
        <Footer/>
    </div>
}

export default Arena;