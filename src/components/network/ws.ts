import { ciphel_io } from "ts_proto_api";

const { API_Signal, API_IO } = ciphel_io;

import { FaultTarget } from "@components/errors/fault";
import { createContext, useContext } from "solid-js";

export const SocketContext = createContext<WebSocketCom>();
export function useSocket<T = WebSocketCom>() {
	return useContext(SocketContext) as T;
}

export class WebSocketCom {
	socket: WebSocket | undefined;

	on_stderr_handlers: ((msg: string) => void)[] = [];
	on_stdout_handlers: ((msg: string) => void)[] = [];
	on_signal_handlers: ((req: ciphel_io.API_Signal) => void)[] = [];

	constructor() {}

	connect(path: string, fault: FaultTarget, callback: () => void) {
		this.socket = new WebSocket(path);

		this.socket.binaryType = "arraybuffer";

		this.socket.onopen = () => {
			console.debug(`websocket connection to : ${path} succeeded`);
			callback();
		};
		this.socket.onerror = () => {
			fault.major({
				message:
					"Communication with the cipherpool server had an unexpected error",
			});
		};
		this.socket.onclose = () => {
			// fault.info({
			// 	message:
			// 		"Communication with the cipherpool server is now closed",
			// });
		};
		this.socket.onmessage = (event) => {
			const data = new Uint8Array(event.data);
			const message = API_IO.decode(data);
			let msg: string;
			let request: ciphel_io.API_Signal;

			let handlers;
			switch (message.IO_TYPE) {
				case "err":
					if (!message.err?.content) return;
					msg = message.err.content;

					handlers = this.on_stderr_handlers;
					for (let i = 0, len = handlers.length; i < len; i++) {
						handlers[i](msg);
					}
					break;
				case "out":
					if (!message.out?.content) return;
					msg = message.out.content;

					handlers = this.on_stdout_handlers;
					for (let i = 0, len = handlers.length; i < len; i++) {
						handlers[i](msg);
					}
					break;
				case "request":
					if (!message.request) return;
					request = new ciphel_io.API_Signal(message.request);

					handlers = this.on_signal_handlers;
					for (let i = 0, len = handlers.length; i < len; i++) {
						handlers[i](request);
					}
					break;
				default:
					break;
			}
		};
	}

	disconnect() {
		this.socket?.close();
	}

	send(msg: ciphel_io.IAPI_IO) {
		if (!this.socket) return;

		const bin_msg = API_IO.encode(msg).finish();
		if (this.socket.readyState === WebSocket.OPEN) {
			this.socket.send(bin_msg);
		} else {
			console.error(
				"websocket is not open, current state:",
				this.socket.readyState
			);
		}
	}

	on_request(handler: (req: ciphel_io.API_Signal) => void) {
		this.on_signal_handlers.push(handler);
	}
	on_stderr(handler: (msg: string) => void) {
		this.on_stderr_handlers.push(handler);
	}
	on_stdout(handler: (msg: string) => void) {
		this.on_stdout_handlers.push(handler);
	}
}
