import { createContext, useContext } from "solid-js";
import { ciphel_io } from "ts_proto_api";
import { FaultTarget } from "@components/errors/fault";
import { Notification } from "@utils/DB/db";
import { api } from "@utils/auth/auth";

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

export class SSE_NotificationsChannel {
	handlers: ((notification: Notification) => void)[] = [];
	private abortController: AbortController | undefined;

	async connect(fault: FaultTarget) {
		try {
			this.abortController = new AbortController();

			const response = await api.get("/notify/session", {
				headers: {
					Accept: "text/event-stream",
					"Cache-Control": "no-cache",
				},
				responseType: "stream",
				signal: this.abortController.signal,
			});

			const stream = response.data;
			const reader = stream
				.pipeThrough(new TextDecoderStream())
				.getReader();

			setInterval(
				async () => {
					// Refresh the Notification session
					try {
						await api.get("/notify/refresh");
					} catch (error) {
						fault.major({
							message: "Cannot refresh the notifications",
						});
					}
				},
				14 * 60 * 1000
			); // 14 minutes

			while (true) {
				const { value, done } = await reader.read();
				if (done) {
					break;
				}

				// Split the chunk into individual SSE messages
				const messages = value
					.split("\n\n")
					.filter((msg: string) => msg.trim());

				for (const message of messages) {
					try {
						// Extract the data field from the SSE message
						const dataField = message
							.split("\n")
							.find((line: string) => line.startsWith("data: "));

						if (dataField) {
							const jsonData = dataField.slice(6); // Remove 'data: ' prefix
							const notification: Notification =
								JSON.parse(jsonData);
							delete (notification as { user_id?: string })
								.user_id;
							if (notification.type === "connected") continue;
							console.debug(notification);

							// Call all handlers
							const handlers = this.handlers;
							for (
								let i = 0, len = handlers.length;
								i < len;
								i++
							) {
								try {
									handlers[i](notification);
								} catch (err) {
									fault.minor({
										message:
											"Error in notification handler",
									});
								}
							}
						}
					} catch (err) {
						fault.minor({
							message: "Error parsing SSE message",
						});
					}
				}
			}
		} catch (err) {
			if ((err as Error).name === "AbortError") {
				console.warn("SSE connection closed");
			}
			try {
				await api.post("/notify/close");
			} catch (error) {
				fault.major({ message: "Cannot close the notifiactions" });
			}
		} finally {
			try {
				await api.post("/notify/close");
			} catch (error) {
				fault.major({ message: "Cannot close the notifiactions" });
			}
		}
	}

	async disconnect(fault: FaultTarget) {
		try {
			await api.post("/notify/close");
		} catch (error) {
			fault.major({ message: "Cannot close the notifiactions" });
		}
	}
	on_notification(handle: (notification: Notification) => void): () => void {
		this.handlers.push(handle);
		return () => {
			const index = this.handlers.indexOf(handle);
			if (index > -1) {
				this.handlers.splice(index, 1);
			}
		};
	}
}
