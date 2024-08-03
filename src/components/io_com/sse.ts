import { createContext, useContext } from "solid-js";
import { ciphel_io } from "ts_proto_api";
import { FaultTarget } from "@components/errors/fault";

const {
	ArenaFrameData,
} = ciphel_io;

export const SSEContext = createContext<SSECom>();
export function useSSE<T = SSECom>() {
	return useContext(SSEContext) as T;
}

export class SSECom {
    event_source : EventSource | undefined;
    latest_frame : ciphel_io.IArenaFrameData | undefined;

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
                const decoded_frame = ArenaFrameData.decode(array);
                this.latest_frame = decoded_frame;
                console.log(this.latest_frame.time);
                
            } catch (err) {
                console.error('Error decoding frame:', err);
                fault.minor({message:"Error decoding frame"})
            }
        };
    }
}