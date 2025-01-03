import { ciphel_io } from "ts_proto_api";

import { useFault } from "@components/errors/fault";
import { createSignal, JSXElement, Match, onCleanup, onMount, Show, Switch } from "solid-js";
import { SocketContext, WebSocketCom } from "./ws";
import { SSE_FrameChannel, SSE_FrameContext } from "./sse";
import { api } from "@utils/auth/auth";

type SocketComProps<S> = {
	children?: JSXElement;
	after?: (stage : Te_GameStage) => JSXElement;
	connexion_url: string;
	socket_url: (session: S) => string;
	sse_url: (session: S) => string;
};


export const STAGE_PREPARATION = Symbol("STAGE_PREPARATION");
export const STAGE_DUEL = Symbol("STAGE_PREPARATION");
export const STAGE_NORMAL_END = Symbol("STAGE_PREPARATION");
export const STAGE_UNEXPECTED_END = Symbol("STAGE_PREPARATION");
export type Te_GameStage = typeof STAGE_PREPARATION | typeof STAGE_DUEL | typeof STAGE_NORMAL_END | typeof STAGE_UNEXPECTED_END;


export function Network<Session>(props: SocketComProps<Session>) {
	const fault = useFault();
	const ws = new WebSocketCom();
	const sse = new SSE_FrameChannel();
	const [is_connected, set_connected] = createSignal<boolean>(false);
	const [stage, set_stage] = createSignal<Te_GameStage>(STAGE_PREPARATION);

	onMount(async () => {
		try {
			const res = await api.get(props.connexion_url);

			const session: Session = await res.data;

			ws.connect(props.socket_url(session), fault, () =>
				set_connected(true)
			);
			ws.on_request((req: ciphel_io.API_Signal) => {
				console.log(req);
				
				if (req.SignalType === "sseReady") {
					sse.connect(props.sse_url(session), fault);
					set_stage(STAGE_DUEL);
					return;
				}
				if (req.SignalType === "exit") {
					if (req.exit?.exitDuel?.exitType === ciphel_io.API_DUEL_EXIT_TYPE.NORMAL_EXIT) {
						console.log("NORMAL EXIT received");
						ws.disconnect();
						sse.disconnect();
						set_stage(STAGE_NORMAL_END);
					}
					else if (req.exit?.exitDuel?.exitType === ciphel_io.API_DUEL_EXIT_TYPE.UNEXPECTED_EXIT) {
						console.warn("UNEXPECTED EXIT received");
						set_stage(STAGE_UNEXPECTED_END);
					}
					return;
				}
			});
		} catch (error) {
			fault.major({ message: "The duel could not be created" });
		}
	});

	onCleanup(() => {
		ws.disconnect();
		sse.disconnect();
	});

	return (
		<SocketContext.Provider value={ws}>
			<Show when={is_connected()} fallback={<SocketComFallback />}>
				<SSE_FrameContext.Provider value={sse}>
					<Switch>
						<Match when={stage() === STAGE_PREPARATION}>
							Loading preparation
						</Match>
						<Match when={stage() === STAGE_DUEL}>
							{props.children}
						</Match>
						<Match when={stage() === STAGE_NORMAL_END}>
							{props.after?.(STAGE_NORMAL_END)}
						</Match>
						<Match when={stage() === STAGE_UNEXPECTED_END}>
							{props.after?.(STAGE_UNEXPECTED_END)}
						</Match>
					</Switch>
				</SSE_FrameContext.Provider>
			</Show>
		</SocketContext.Provider>
	);
}

function SocketComFallback() {
	return <p>loading</p>;
}
