
import {ciphel_io} from "@assets/api/game/ciphel_io";
const {StdIn,StdErr,StdInRequest,StdIO,StdOut,SrcCode,Command,PlayerSide} = ciphel_io;

export type WebSocketCom = {
    socket : WebSocket,
    send : (msg:ciphel_io.IStdIO) => void,
    on_stderr ?: (msg:string) => void,
    on_stdout ?: (msg:string) => void,
    on_req_input ?: () => void,
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
        
        switch (message.stdType) {
          case "err":
                if(com.on_stderr && message.err?.content) com.on_stderr(message.err.content)
                break;
          case "out":
                if(com.on_stdout && message.out?.content) com.on_stdout(message.out.content)
                break;
          case "inReq":
                if(com.on_req_input) com.on_req_input()
                break;
          default:
              break;
        }
    };
    
    return com;
}