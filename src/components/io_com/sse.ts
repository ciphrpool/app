import { createContext, useContext } from "solid-js";
import { ciphel_io } from "ts_proto_api";
import { FaultTarget } from "@components/errors/fault";

const {
	FrameData,
} = ciphel_io;

export const SSEContext = createContext<SSECom>();
export function useSSE<T = SSECom>() {
	return useContext(SSEContext) as T;
}

export class SSECom {
    event_source : EventSource | undefined;
    latest_frame : ciphel_io.IFrameData | undefined;
    handlers : ((frame : ciphel_io.IFrameData) => void)[] = []

    connect(url: string,fault:FaultTarget) {
        // this.event_source = new EventSource(url,{withCredentials: true});
        this.event_source = new EventSource(url);

        this.event_source.onmessage = (event) => {
            try {
                // Assuming the data is sent as raw binary
                const buffer = event.data;
                
                const bin = atob(buffer);

                const array = new Uint8Array(bin.length);
                for (let i = 0; i < bin.length; i++) {
                    array[i] = bin.charCodeAt(i);
                }

                const decoded_frame = FrameData.decode(array);
                this.latest_frame = decoded_frame;

                const handlers = this.handlers;
                try {
                    for (let i = 0, len = handlers.length; i < len; i++) {
                        handlers[i](decoded_frame);
                    }
                } catch (err) {
                    console.error(err);
                    fault.minor({message:"Error while handling the frame"})
                }
                
            } catch (err) {
                console.error('Error decoding frame:', err);
                fault.minor({message:"Error decoding frame"})
            }
        };
    }
    on_frame(handle:(frame:ciphel_io.IFrameData)=>void) {
        this.handlers.push(handle)
    }
}