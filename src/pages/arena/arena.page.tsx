import Header from "@components/headers/ArenaHeader";
import Footer from "@components/footers/DefaultFooter";
import Editor, { EditorErrorFallback } from "@components/editor/Editor";
import Control from "@components/editor/Control";
import { P1 } from "@utils/player.type";
import Console from "@components/editor/console/Console";
import { CursorMetadataProvider } from "@components/editor/editor.utils";
import { createStore } from "solid-js/store";
import Pool from "@components/canvas/Pool";
import { Game, GameState } from "@components/game/game";
import { Barrier } from "@components/errors/barrier";
import { createEffect, createSignal, onMount, Show } from "solid-js";
import { useFault } from "@components/errors/fault";
import { Network } from "@components/network/Network";

type ArenaSession = {
	ws_url: string;
	sse_url: string;
	session_id: string;
};

function ArenaManager() {
	let pool_container!: HTMLDivElement;

	const editor_api = {};

	return (
		<Network
			connexion_url={"http://127.0.0.1:3000/arena/unregistered"}
			socket_url={(session: ArenaSession) => {
				return `${session?.ws_url}?session_id=${session?.session_id}`;
			}}
			sse_url={(session: ArenaSession) => {
				return `${session?.sse_url}?session_id=${session?.session_id}`;
			}}
		>
			<CursorMetadataProvider>
				<section class="flex flex-col overflow-hidden">
					<div class="flex w-full flex-grow max-h-100 overflow-hidden">
						<Control editor_api={editor_api} side={P1} />
						<Barrier fallback={<EditorErrorFallback />}>
							<Editor api={editor_api} />
						</Barrier>
					</div>
					<Console
						class="flex-grow-0 max-h-[50%] overflow-hidden"
						editor_api={editor_api}
						side={P1}
					/>
				</section>
				<section class="bg-night-600  w-full h-full grid grid-cols-4 p-8">
					<GameState>
						<div
							class="w-[512px] h-[512px] max-w-[512px] max-h-[512px]"
							ref={pool_container}
						>
							<Pool container_ref={pool_container}>
								<Game />
							</Pool>
						</div>
					</GameState>
				</section>
			</CursorMetadataProvider>
		</Network>
	);
}

function ArenaPage() {
	const fault = useFault();

	return (
		<div class="flex flex-col h-screen max-h-screen">
			<Header />
			<main class="flex-grow w-full overflow-hidden grid grid-cols-2 grid-flow-row">
				<ArenaManager />
			</main>
			<Footer />
		</div>
	);
}

export default ArenaPage;
