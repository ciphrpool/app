import { Te_Player, side_from_api, side_of } from "@utils/player.type";
import { Accessor, Setter, onCleanup } from "solid-js";
import { SetStoreFunction, createStore, produce } from "solid-js/store";
import { EditorApi } from "../Editor";
import { ciphel_io } from "ts_proto_api";
import { WebSocketCom } from "@components/network/ws";
import { DuelPlayerSummaryData } from "@utils/api.type";

export const In = Symbol("In");
export const Out = Symbol("Out");
export type Te_IOstate = typeof In | typeof Out;

export type LineData = {
	username: string;
	file?: string;
	content: string;
	editable: boolean;
	is_error: boolean;
	in_out: Te_IOstate;
};

export function setup_socket_events(
	socket: WebSocketCom,
	set_lines: SetStoreFunction<LineData[]>,
	set_waiting_input: Setter<boolean>,
	focus: (force?: boolean) => void,
	user_data: (pid: Te_Player) => DuelPlayerSummaryData
) {
	if (!socket) return;
	socket.on_request((req: ciphel_io.API_Signal) => {
		switch (req.SignalType) {
			case "listenInput":
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
				if (draft.length > 1 && msg === draft[draft.length - 1].content)
					return;
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
					is_error: true,
				});
			})
		);
		focus();
	});
	socket.on_stdout((msg: string, pid: ciphel_io.API_PID) => {
		console.debug("out >> " + msg, pid);

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
					username: user_data(side_from_api(pid)).username,
					editable: false,
					in_out: Out,
					is_error: false,
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
		pid: ciphel_io.API_PID,
		tid: ciphel_io.API_TID,
		command: string,
		is_cmd: boolean
	) {
		if (!command) return;

		if (is_cmd) {
			if ("clear" === command.trim()) {
				set_lines([]);
				add_command(command);
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
						content: command,
						username: "user",
						file: "cmd",
						editable: false,
						in_out: In,
						is_error: false,
					});
				})
			);
			add_command(command);
			focus();

			socket.send({
				command: {
					pid,
					tid,
					cmd: command,
				},
			});
		} else {
			set_waiting_input(false);
			set_lines(
				produce((draft) => {
					if (draft.length > 0 && draft[draft.length - 1].editable) {
						draft[draft.length - 1].editable = false;
						draft[draft.length - 1].content += command;
					}
				})
			);
			socket.send({
				in: {
					content: command,
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
