
import {ciphel_io} from "@assets/api/game/ciphel_io";
const {StdIn,StdErr,CiphelRequest,StdIO,StdOut,SrcCode,Command,PlayerSide} = ciphel_io;

export type WebSocketCom = {
    socket : WebSocket,
    send : (msg:ciphel_io.IStdIO) => void,
    on_stderr_handlers : ((msg:string) => void)[],
    on_stdout_handlers : ((msg:string) => void)[],
    on_request_handlers : ((req:ciphel_io.CiphelRequest) => void)[],
    on_request : (handler:(req:ciphel_io.CiphelRequest) => void) => void,
    on_stderr : (handler:((msg:string) => void)) => void,
    on_stdout : (handler:((msg:string) => void)) => void,
}

export function createWebSocket() {
    const path = 'ws://localhost:3000/ws/arena';
    const socket = new WebSocket(path);
    socket.binaryType = 'arraybuffer';

    const com : WebSocketCom = {
        socket,        
        send(msg:ciphel_io.IStdIO) {
            const bin_msg = StdIO.encode(msg).finish();
            if (this.socket.readyState === WebSocket.OPEN) {
                this.socket.send(bin_msg)
            } else {
                console.error("websocket is not open, current state:", this.socket.readyState);
            }
        },
        on_request_handlers : [],
        on_stderr_handlers : [],
        on_stdout_handlers : [],

        on_request(handler : (req:ciphel_io.CiphelRequest) => void) {
            this.on_request_handlers.push(handler);
        },
        on_stderr(handler : (msg:string) => void) {
            this.on_stderr_handlers.push(handler);
        },
        on_stdout(handler : (msg:string) => void) {
            this.on_stdout_handlers.push(handler);
        }
    }

    com.socket.onopen = () => {
        console.debug(`websocket connection to : ${path} succeeded`);
    };
    com.socket.onerror = (error) => {
        console.error('websocket error:', error);
    }; 
    com.socket.onclose = () => {
        console.debug(`websocket ${path} is closed`);
    };
    com.socket.onmessage = (event) => {
        const data = new Uint8Array(event.data);
        const message = StdIO.decode(data);
        let msg : string;
        switch (message.stdType) {
          case "err":
                if(!message.err?.content) return;
                msg = message.err.content;
                com.on_stderr_handlers?.forEach(handle => {
                    handle(msg);
                });
                break;
          case "out":
                if(!message.out?.content) return;
                msg = message.out.content;
                com.on_stdout_handlers?.forEach(handle => {
                    handle(msg);
                });
                break;
          case "request":
                if(!(message.request)) return;
                console.log(message.request);
                const request = new ciphel_io.CiphelRequest(message.request);
                com.on_request_handlers?.forEach(handle => {
                    handle(request);
                });
                break;
          default:
              break;
        }
    };
    
    return com;
}