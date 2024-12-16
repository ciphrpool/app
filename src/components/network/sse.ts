import { createContext, useContext } from "solid-js";
import { ciphel_io } from "ts_proto_api";
import { FaultTarget } from "@components/errors/fault";
import { Notification } from "@utils/DB/db";

const { FrameData } = ciphel_io;

export const SSE_FrameContext = createContext<SSE_FrameChannel>();
export function useSSE_Frame<T = SSE_FrameChannel>() {
	return useContext(SSE_FrameContext) as T;
}

export class SSE_FrameChannel {
	event_source: EventSource | undefined;
	latest_frame: ciphel_io.IFrameData | undefined;
	handlers: ((frame: ciphel_io.IFrameData) => void)[] = [];

	connect(url: string, fault: FaultTarget) {
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
					fault.minor({ message: "Error while handling the frame" });
				}
			} catch (err) {
				console.error("Error decoding frame:", err);
				fault.minor({ message: "Error decoding frame" });
			}
		};
	}
	on_frame(handle: (frame: ciphel_io.IFrameData) => void) {
		this.handlers.push(handle);
	}
}

export const SSE_NotificationsContext = createContext<SSE_FrameChannel>();
export function useSSE_Notifications<T = SSE_NotificationsChannel>() {
	return useContext(SSE_NotificationsContext) as T;
}

export class SSE_NotificationsChannel {
	event_source: EventSource | undefined;
	handlers: ((notification: Notification) => void)[] = [];

	connect(url: string, fault: FaultTarget) {
		// this.event_source = new EventSource(url,{withCredentials: true});
		this.event_source = new EventSource(url);

		this.event_source.onmessage = (event) => {
			try {
				const buffer = event.data;

				const notification: Notification = JSON.parse(buffer);

				const handlers = this.handlers;
				try {
					for (let i = 0, len = handlers.length; i < len; i++) {
						handlers[i](notification);
					}
				} catch (err) {
					console.error(err);
					fault.minor({
						message: "Error while handling the notification",
					});
				}
			} catch (err) {
				console.error("Error receiving notification :", err);
				fault.minor({ message: "Error receiving notification" });
			}
		};
	}
	on_frame(handle: (frame: Notification) => void) {
		this.handlers.push(handle);
	}
}
