import Header from "@components/headers/in_game/ArenaHeader";
import Footer from "@components/footers/DefaultFooter";
import Editor, { EditorErrorFallback } from "@components/editor/Editor";
import Control from "@components/editor/Control";
import { P1 } from "@utils/player.type";
import Console from "@components/editor/console/Console";
import { createWebSocket, WebSocketCom } from "@utils/websocket/com";
import {
	CursorMetadata,
	default_cursor_metadata,
} from "@components/editor/editor.utils";
import { createStore } from "solid-js/store";
import Pool from "@components/canvas/Pool";
import Game from "@components/game/game";
import { Barrier } from "@components/errors/barrier";
import { createEffect, createSignal, onMount, Show } from "solid-js";
import { useFault } from "@components/errors/fault";

type ArenaSession = {
	url : string,
	session_id : string,
}

function Arena() {
	const fault = useFault();
	const [cursor_data, set_cursor_data] = createStore<CursorMetadata>(
		default_cursor_metadata()
	);
	const [get_arena_session,set_arena_session] = createSignal<ArenaSession>()
	let socket : WebSocketCom | undefined;
	onMount(async () => {
		try {
			const response = await fetch('http://127.0.0.1:3000/arena/unregistered', {
				method: 'GET',
			});
			if (!response.ok) {			
				fault.major({message:"The Arena session could not be created"})
			}
			const data: ArenaSession = await response.json();
			set_arena_session(data);
		} catch (error) {
			fault.major({message:"The Arena session could not be created"})
		}
	})
	createEffect(() => {
		const arena_session = get_arena_session()
		if (!arena_session) return;
		socket = createWebSocket(`${arena_session?.url}/?session_id=${arena_session?.session_id}`);
	})
	let pool_container !: HTMLDivElement;
	const editor_api = {};

	return (
		<div class="flex flex-col h-screen max-h-screen">
			<Header />
			<main class="flex-grow w-full overflow-hidden grid grid-cols-2 grid-flow-row">
				<Show when={!socket}>
					<section class="flex flex-col overflow-hidden">
						<div class="flex w-full flex-grow max-h-100 overflow-hidden">
							<Control
								active={cursor_data.current_cursor}
								change_cursor={(cursor) => {
									set_cursor_data("current_cursor", cursor);
								}}
								cursor_data={cursor_data}
							/>
							<Barrier fallback={<EditorErrorFallback/>}>
								<Editor
									socket={socket!}
									cursor_data={cursor_data}
									set_cursor_data={set_cursor_data}
									api={editor_api}
								/>
							</Barrier>
						</div>
						<Console
							class="flex-grow-0 max-h-[50%] overflow-hidden"
							editor_api={editor_api}
							socket={socket!}
							side={P1}
							cursor_data={cursor_data}
						/>
					</section>
					<section class="bg-night-600 flex flex-col gap-4 justify-between items-center">
						{/* <Todo> Game</Todo> */}
						<div class="dbg-1 w-full"></div>
						<div class="w-[512px] h-[512px] max-w-[512px] max-h-[512px]" ref={pool_container}>
							<Pool container_ref={pool_container}>
								<Game/>
							</Pool>
						</div>
						<div class="dbg-2 w-full"></div>
					</section>
				</Show>
			</main>
			<Footer />
		</div>
	);
}

export default Arena;
