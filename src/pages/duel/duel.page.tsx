import Header from "@components/headers/DuelHeader";
import Footer from "@components/footers/DefaultFooter";
import Editor, { EditorErrorFallback } from "@components/editor/Editor";
import Control from "@components/editor/Control";
import { P1, P2, side_from_number, Te_Player } from "@utils/player.type";
import Console from "@components/editor/console/Console";
import { CursorMetadataProvider } from "@components/editor/editor.utils";
import { createStore } from "solid-js/store";
import Pool from "@components/canvas/Pool";
import { Game, GameState } from "@components/game/game";
import { Barrier } from "@components/errors/barrier";
import {
	createEffect,
	createResource,
	createSignal,
	onMount,
	Show,
	Suspense,
} from "solid-js";
import { useFault } from "@components/errors/fault";
import {
	Network,
	STAGE_NORMAL_END,
	STAGE_UNEXPECTED_END,
	Te_GameStage,
} from "@components/network/Network";
import { useParams } from "@solidjs/router";
import { api } from "@utils/auth/auth";
import { DuelSessionContext } from "@utils/api.type";
import { useUserData } from "@utils/auth/auth.context";
import {
	DuelResultUnexpectedView,
	DuelResultView,
} from "@components/views/duel_result.view";

type DuelSession = {
	ws_url: string;
	sse_url: string;
	encrypted_session_context: string;
};

function DuelManager() {
	const params = useParams();
	const fault = useFault();
	const user = useUserData();
	let pool_container!: HTMLDivElement;

	onMount(() => {
		localStorage.removeItem("duel_url");
	});

	const [duel_data] = createResource(async () => {
		try {
			const res = await api.get("/duel/session", {
				params: { duel_session_id: params.duel_session_id },
			});
			const data: DuelSessionContext = res.data;
			return data;
		} catch (error) {
			fault.major({ message: "Failed to retrieve duel context" });
		}
	});
	const editor_api = {};

	return (
		<Network
			connexion_url={`/duel/${params.duel_type}/prepare/?duel_session_id=${params.duel_session_id}`}
			socket_url={(session: DuelSession) => {
				return `${session?.ws_url}?encrypted_session_context=${session?.encrypted_session_context}`;
			}}
			sse_url={(session: DuelSession) => {
				return `${session?.sse_url}?encrypted_session_context=${session?.encrypted_session_context}`;
			}}
			after={(stage: Te_GameStage) => {
				switch (stage) {
					case STAGE_NORMAL_END:
						return (
							<DuelResultView
								duel_session_id={params.duel_session_id}
							/>
						);
					case STAGE_UNEXPECTED_END:
						return <DuelResultUnexpectedView />;
					default:
						break;
				}
				return null;
			}}
		>
			<Suspense>
				<CursorMetadataProvider>
					<section class="flex flex-col overflow-hidden">
						<div class="flex w-full flex-grow max-h-100 overflow-hidden">
							<Control
								editor_api={editor_api}
								side={side_from_number(duel_data()?.side ?? 0)!}
							/>
							<Barrier fallback={<EditorErrorFallback />}>
								<Editor api={editor_api} />
							</Barrier>
						</div>
						<Console
							class="flex-grow-0 max-h-[50%] overflow-hidden"
							user_data={(pid: Te_Player) => {
								console.log({
									pid,
									data: duel_data()?.context,
								});

								switch (pid) {
									case P1:
										return duel_data()?.context.p1!;
									case P2:
										return duel_data()?.context.p2!;
									default:
										return duel_data()?.context.p1!;
								}
							}}
							editor_api={editor_api}
							side={side_from_number(duel_data()?.side ?? 0)!}
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
			</Suspense>
		</Network>
	);
}

function DuelPage() {
	return (
		<div class="flex flex-col h-screen max-h-screen">
			<Header />
			<main class="flex-grow w-full overflow-hidden grid grid-cols-2 grid-flow-row">
				<DuelManager />
			</main>
			<Footer />
		</div>
	);
}

export default DuelPage;
