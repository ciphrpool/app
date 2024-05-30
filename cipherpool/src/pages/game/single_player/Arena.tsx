import Header from "@components/headers/in_game/ArenaHeader";
import Footer from "@components/footers/DefaultFooter";
import Editor from "@components/editor/Editor";
import Todo from "@components/utils/Todo";
import Control from "@components/editor/Control";
import { createSignal } from "solid-js";
import { C1, Te_Cursor } from "@utils/player.type";
import Console from "@components/editor/Console";

function Arena() {
    const [get_cursor,set_cursor] = createSignal<Te_Cursor>(C1);

    return <div class="flex flex-col h-screen max-h-screen">
        <Header />
        <main class="flex-grow w-full overflow-hidden grid grid-cols-2 grid-flow-row">
            {/* <Todo> Editor</Todo> */}
            <section class="flex flex-col overflow-hidden">
                <div class="flex w-full flex-grow max-h-100 overflow-hidden">
                    <Control active={get_cursor()} change_cursor={(cursor) => {
                        set_cursor(cursor)
                    }}/>
                    <Editor e_cursor={get_cursor()}/>
                </div>
                <Console class="flex-grow-0 max-h-[50%] overflow-hidden"/>
            </section>
            <section class="bg-night-600">
                <Todo> Game</Todo>
            </section>
        </main>
        <Footer/>
    </div>
}

export default Arena;