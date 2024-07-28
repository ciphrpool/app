import { ciphel_io } from "@assets/api/game/ciphel_io";
import { useFault } from "@components/errors/fault";
const {
	CiphelRequest,
	StdIO,
} = ciphel_io;

export type WebSocketCom = {
	socket: WebSocket;
	send: (msg: ciphel_io.IStdIO) => void;
	on_stderr_handlers: ((msg: string) => void)[];
	on_stdout_handlers: ((msg: string) => void)[];
	on_request_handlers: ((req: ciphel_io.CiphelRequest) => void)[];
	on_request: (handler: (req: ciphel_io.CiphelRequest) => void) => void;
	on_stderr: (handler: (msg: string) => void) => void;
	on_stdout: (handler: (msg: string) => void) => void;
};

export function createWebSocket(path:string) {
    const fault = useFault();

	const socket = new WebSocket(path);

	socket.binaryType = "arraybuffer";

	const com: WebSocketCom = {
		socket,
		send(msg: ciphel_io.IStdIO) {
			const bin_msg = StdIO.encode(msg).finish();
			if (this.socket.readyState === WebSocket.OPEN) {
				this.socket.send(bin_msg);
			} else {
				console.error(
					"websocket is not open, current state:",
					this.socket.readyState
				);
			}
		},
		on_request_handlers: [],
		on_stderr_handlers: [],
		on_stdout_handlers: [],

		on_request(handler: (req: ciphel_io.CiphelRequest) => void) {
			this.on_request_handlers.push(handler);
		},
		on_stderr(handler: (msg: string) => void) {
			this.on_stderr_handlers.push(handler);
		},
		on_stdout(handler: (msg: string) => void) {
			this.on_stdout_handlers.push(handler);
		},
	};

	com.socket.onopen = () => {
		console.debug(`websocket connection to : ${path} succeeded`);
	};
	com.socket.onerror = () => {
		fault.major({message:"Communication with the cipherpool server had an unexpected error"})
	};
	com.socket.onclose = () => {
		fault.info({message:"Communication with the cipherpool server is now closed"})
	};
	com.socket.onmessage = (event) => {
		const data = new Uint8Array(event.data);
		const message = StdIO.decode(data);
		let msg: string;
		let request : ciphel_io.CiphelRequest;
		switch (message.stdType) {
			case "err":
				if (!message.err?.content) return;
				msg = message.err.content;
				com.on_stderr_handlers?.forEach((handle) => {
					handle(msg);
				});
				break;
			case "out":
				if (!message.out?.content) return;
				msg = message.out.content;
				com.on_stdout_handlers?.forEach((handle) => {
					handle(msg);
				});
				break;
			case "request":
				if (!message.request) return;
				request = new ciphel_io.CiphelRequest(message.request);
				com.on_request_handlers?.forEach((handle) => {
					handle(request);
				});
				break;
			default:
				break;
		}
	};

	return com;
}
