import { ciphel_io } from "ts_proto_api";

import { useFault } from "@components/errors/fault";
import { createSignal, JSXElement, onMount, Show } from "solid-js";
import { SocketContext, WebSocketCom } from "./ws";
import { SSECom, SSEContext } from "./sse";

type SocketComProps<S> = {
	children?: JSXElement;
    connexion_url : string
	socket_url : (session:S) => string
	sse_url : (session:S) => string
}

type ArenaSession = {
	url : string,
	session_id : string,
}

export function Network<Session>(props:SocketComProps<Session>) {
	const fault = useFault();
	const ws = new WebSocketCom();
	const sse = new SSECom();
    const [is_connected,set_connected] = createSignal<boolean>(false);

	onMount(async () => {
		try {
			const response = await fetch(props.connexion_url, {
				method: 'GET',
			});
			if (!response.ok) {			
				fault.major({message:"The Arena session could not be created"})
			}
			
			const session: Session = await response.json(); // TODO : validate the json ?

			ws.connect(props.socket_url(session),
                fault,
                () => set_connected(true)
            )
			ws.on_request((req: ciphel_io.API_Signal) => {
				if (req.SignalType == "sseReady") {
					sse.connect(props.sse_url(session),fault)
				}
			})
		} catch (error) {
			fault.major({message:"The Arena session could not be created"})
		}
	})

	return <SocketContext.Provider value={ws}>
		<Show when={is_connected()} fallback={<SocketComFallback/>}>
			<SSEContext.Provider value={sse}>
            	{props.children}
			</SSEContext.Provider>
		</Show>
	</SocketContext.Provider>
}

function SocketComFallback() {
    return <p>loading</p>
}