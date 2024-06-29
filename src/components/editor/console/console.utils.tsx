import { Te_Player, side_of } from "@utils/player.type";
import { WebSocketCom } from "@utils/websocket/com";
import { Accessor, Setter, onCleanup } from "solid-js";
import { SetStoreFunction, createStore, produce } from "solid-js/store";
import { EditorApi } from "../Editor";
import { preprocess_cmd } from "../editor.utils";
import { ciphel_io } from "@assets/api/game/ciphel_io";

export const In = Symbol("In");
export const Out = Symbol("Out");
export type Te_IOstate = typeof In | typeof Out;

export type LineData = {
	username: string;
	file?: string;
	content: string;
	editable: boolean;
	in_out: Te_IOstate;
};

export function setup_socket_events(
	socket: WebSocketCom,
	set_lines: SetStoreFunction<LineData[]>,
	set_waiting_input: Setter<boolean>,
	focus: (force?: boolean) => void
) {
	socket.on_request((req: ciphel_io.CiphelRequest) => {
		switch (req.requestType) {
			case "input":
				console.debug("request for std in");
				set_waiting_input(true);
				set_lines(
					produce((draft) => {
						if (
							draft.length > 0 &&
							draft[draft.length - 1].in_out === In &&
							draft[draft.length - 1].content === ""
						) {
							draft.pop();
						}
						if (draft.length > 0) {
							draft[draft.length - 1].editable = true;
							draft[draft.length - 1].in_out = Out;
						}
					})
				);
				focus(true);
				break;
			default:
				break;
		}
	});
	socket.on_stderr((msg: string) => {
		console.debug("err >> " + msg);
		set_lines(
			produce((draft) => {
				if (draft.length > 0 && draft[draft.length - 1].editable) {
					draft[draft.length - 1].editable = false;
					if (
						draft[draft.length - 1].in_out === In &&
						draft[draft.length - 1].content === ""
					) {
						draft.pop();
					}
				}
				draft.push({
					content: msg,
					username: "user",
					editable: false,
					in_out: Out,
				});
			})
		);
		focus();
	});
	socket.on_stdout((msg: string) => {
		console.debug("out >> " + msg);
		set_lines(
			produce((draft) => {
				if (draft.length > 0 && draft[draft.length - 1].editable) {
					draft[draft.length - 1].editable = false;
					if (
						draft[draft.length - 1].in_out === In &&
						draft[draft.length - 1].content === ""
					) {
						draft.pop();
					}
				}
				draft.push({
					content: msg,
					username: "user",
					editable: false,
					in_out: Out,
				});
			})
		);
		focus();
	});
}

export function createSubmitHandler(
	editor_api: EditorApi,
	side: Te_Player,
	socket: WebSocketCom,
	set_lines: SetStoreFunction<LineData[]>,
	set_waiting_input: Setter<boolean>,
	add_command: (cmd: string) => void,
	focus: (force?: boolean) => void
) {
	return function handle_submit(
		player: number,
		cursor: number,
		line: string,
		is_cmd: boolean
	) {
		if (!line) return;

		if (is_cmd) {
			const [cmd_id, ...args] = preprocess_cmd(line);
			if (!cmd_id) return;
			if (cmd_id === "clear") {
				set_lines([]);
				add_command(line);
				return;
			}
			set_lines(
				produce((draft) => {
					if (draft.length > 0 && draft[draft.length - 1].editable) {
						draft[draft.length - 1].editable = false;
						if (
							draft[draft.length - 1].in_out === In &&
							draft[draft.length - 1].content === ""
						) {
							draft.pop();
						}
					}
					draft.push({
						content: line,
						username: "user",
						file: "cmd",
						editable: false,
						in_out: In,
					});
				})
			);
			add_command(line);
			focus();
			if (cmd_id === "compile" && editor_api.snapshot) {
				const res = editor_api.snapshot();
				if (!res) return;
				socket.send({
					command: {
						cursor,
						player,
						cmd: cmd_id,
						args,
						src: {
							content: res,
							side: side_of(side),
						},
					},
				});
				return;
			}

			socket.send({
				command: {
					cursor,
					player,
					cmd: cmd_id,
					args,
				},
			});
		} else {
			set_waiting_input(false);
			set_lines(
				produce((draft) => {
					if (draft.length > 0 && draft[draft.length - 1].editable) {
						draft[draft.length - 1].editable = false;
						draft[draft.length - 1].content += line;
					}
				})
			);
			socket.send({
				in: {
					content: line,
				},
			});
		}
		return;
	};
}

export function createCommandHistory(): [string[], (cmd: string) => void] {
	const MAX_HISTORY_SIZE = 20;
	const [history, set_history] = createStore<string[]>(
		JSON.parse(localStorage.getItem("command_history") || "[]")
	);

	function update_history(line: string) {
		const command = line.trim();
		if (history.includes(command)) return;

		set_history(
			produce((draft) => {
				if (draft.length >= MAX_HISTORY_SIZE) {
					draft.pop();
				}
				draft.unshift(command);
			})
		);
		localStorage.setItem("command_history", JSON.stringify(history));
	}
	return [history, update_history];
}

export function setup_history_events(
	default_input_ref: HTMLInputElement,
	is_focus: Accessor<boolean>,
	history: string[],
	set_cmd: Setter<string>
): () => void {
	let idx = -1;
	function on_key(e: KeyboardEvent) {
		let cmd: string;
		switch (e.key) {
			case "ArrowUp":
				e.preventDefault();
				cmd = history[++idx % history.length];
				if (idx >= history.length) {
					idx = -1;
					cmd = "";
				}
				if (default_input_ref && is_focus()) {
					default_input_ref.value = cmd;
					set_cmd(cmd);
				}
				break;
			case "ArrowDown":
				e.preventDefault();
				idx--;

				cmd = idx < 0 ? "" : history[idx % history.length];
				if (default_input_ref && is_focus()) {
					default_input_ref.value = cmd;
					set_cmd(cmd);
				}
				if (idx < 0) {
					idx = -1;
					default_input_ref.value = "";
					set_cmd("");
				}
				break;
			default:
				break;
		}
	}
	window.addEventListener("keydown", on_key);
	onCleanup(() => {
		window.removeEventListener("keydown", on_key);
	});
	return () => {
		idx = -1;
	};
}
