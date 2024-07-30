import { ciphel_io } from "@assets/api/game/ciphel_io";
import { FaultTarget, useFault } from "@components/errors/fault";
import { createContext, useContext } from "solid-js";
const {
	CiphelRequest,
	StdIO,
} = ciphel_io;

export const SocketContext = createContext<WebSocketCom>();
export function useSocket<T = WebSocketCom>() {
	return useContext(SocketContext) as T;
}

export class WebSocketCom {
	socket: WebSocket | undefined;
	
	on_stderr_handlers: ((msg: string) => void)[] = [];
	on_stdout_handlers: ((msg: string) => void)[] = [];
	on_request_handlers: ((req: ciphel_io.CiphelRequest) => void)[] = [];

	constructor() {
	}

	connect(path:string,fault:FaultTarget,callback:()=>void) {
		this.socket = new WebSocket(path);
	
		this.socket.binaryType = "arraybuffer";

		this.socket.onopen = () => {
			console.debug(`websocket connection to : ${path} succeeded`);
			callback();
		};
		this.socket.onerror = () => {
			fault.major({message:"Communication with the cipherpool server had an unexpected error"})
		};
		this.socket.onclose = () => {
			fault.info({message:"Communication with the cipherpool server is now closed"})
		};
		this.socket.onmessage = (event) => {
			const data = new Uint8Array(event.data);
			const message = StdIO.decode(data);
			let msg: string;
			let request : ciphel_io.CiphelRequest;
			switch (message.stdType) {
				case "err":
					if (!message.err?.content) return;
					msg = message.err.content;
					this.on_stderr_handlers?.forEach((handle) => {
						handle(msg);
					});
					break;
				case "out":
					if (!message.out?.content) return;
					msg = message.out.content;
					this.on_stdout_handlers?.forEach((handle) => {
						handle(msg);
					});
					break;
				case "request":
					if (!message.request) return;
					request = new ciphel_io.CiphelRequest(message.request);
					this.on_request_handlers?.forEach((handle) => {
						handle(request);
					});
					break;
				default:
					break;
			}
		};
	}

	send(msg: ciphel_io.IStdIO) {
		if (!this.socket) return;

		const bin_msg = StdIO.encode(msg).finish();
		if (this.socket.readyState === WebSocket.OPEN) {
			this.socket.send(bin_msg);
		} else {
			console.error(
				"websocket is not open, current state:",
				this.socket.readyState
			);
		}
	}

	on_request(handler: (req: ciphel_io.CiphelRequest) => void) {
		this.on_request_handlers.push(handler);
	}
	on_stderr(handler: (msg: string) => void) {
		this.on_stderr_handlers.push(handler);
	}
	on_stdout(handler: (msg: string) => void) {
		this.on_stdout_handlers.push(handler);
	}
};

