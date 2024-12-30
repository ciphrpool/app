import { ciphel_io } from "ts_proto_api";

import { useFault } from "@components/errors/fault";
import { createSignal, JSXElement, onCleanup, onMount, Show } from "solid-js";
import { SocketContext, WebSocketCom } from "./ws";
import { SSE_FrameChannel, SSE_FrameContext } from "./sse";
import { api } from "@utils/auth/auth";

type SocketComProps<S> = {
	children?: JSXElement;
	connexion_url: string;
	socket_url: (session: S) => string;
	sse_url: (session: S) => string;
};

export function Network<Session>(props: SocketComProps<Session>) {
	const fault = useFault();
	const ws = new WebSocketCom();
	const sse = new SSE_FrameChannel();
	const [is_connected, set_connected] = createSignal<boolean>(false);

	onMount(async () => {
		try {
			const res = await api.get(props.connexion_url);

			const session: Session = await res.data;

			ws.connect(props.socket_url(session), fault, () =>
				set_connected(true)
			);
			ws.on_request((req: ciphel_io.API_Signal) => {
				if (req.SignalType == "sseReady") {
					sse.connect(props.sse_url(session), fault);
				}
			});
		} catch (error) {
			fault.major({ message: "The Arena session could not be created" });
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
					{props.children}
				</SSE_FrameContext.Provider>
			</Show>
		</SocketContext.Provider>
	);
}

function SocketComFallback() {
	return <p>loading</p>;
}
