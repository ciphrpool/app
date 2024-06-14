import Header from "@components/headers/in_game/ArenaHeader";
import Footer from "@components/footers/DefaultFooter";
import Editor from "@components/editor/Editor";
import Todo from "@components/utils/Todo";
import Control from "@components/editor/Control";
import { createSignal } from "solid-js";
import { C1, C2, C3, C4, P1, Te_Cursor } from "@utils/player.type";
import Console from "@components/editor/console/Console";
import { createWebSocket } from "@utils/websocket/com";
import { CursorMetadata, default_cursor_metadata } from "@components/editor/editor.utils";
import { createStore } from "solid-js/store";

function Arena() {
    const [cursor_data,set_cursor_data] = createStore<CursorMetadata>(default_cursor_metadata());
    const socket = createWebSocket();
    const editor_api = {};

    return <div class="flex flex-col h-screen max-h-screen">
        <Header />
        <main class="flex-grow w-full overflow-hidden grid grid-cols-2 grid-flow-row">
            {/* <Todo> Editor</Todo> */}
            <section class="flex flex-col overflow-hidden">
                <div class="flex w-full flex-grow max-h-100 overflow-hidden">
                    <Control 
                        active={cursor_data.current_cursor} 
                        change_cursor={(cursor) => {
                            set_cursor_data('current_cursor',cursor);
                        }}
                        cursor_data={cursor_data}
                        />
                    <Editor 
                        socket={socket} 
                        cursor_data={cursor_data} 
                        set_cursor_data={set_cursor_data} 
                        api={editor_api}/>
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