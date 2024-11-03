import TerminalIcon from "@assets/icons/terminal.svg?component-solid";

import {
	For,
	Setter,
	Show,
	createEffect,
	createSignal,
	on,
	onCleanup,
	onMount,
	splitProps,
} from "solid-js";
import { useCursorMetadata } from "../editor.utils";
import { EditorApi } from "../Editor";
import { C1, C2, C3, C4, P1, P2, Te_Player, side_of } from "@utils/player.type";
import { createStore, produce } from "solid-js/store";
import {
	In,
	LineData,
	Te_IOstate,
	createCommandHistory,
	createSubmitHandler,
	setup_history_events,
	setup_socket_events,
} from "./console.utils";
import { Line } from "./Line";
import { useSocket } from "@components/io_com/ws";

// choco <3
type ConsoleProps = {
	class?: string;
	classList?: {
		[k: string]: boolean | undefined;
	};
	editor_api: EditorApi;
	side: Te_Player;
};
function Console(props: ConsoleProps) {
	let input_ref!: HTMLInputElement;
	let default_input_ref!: HTMLInputElement;
	let outputs_ref!: HTMLDivElement;

	const socket = useSocket();
	const cursor_metadata = useCursorMetadata();
	
	const [lines, set_lines] = createStore<LineData[]>([]);
	const [is_waiting_input, set_waiting_input] = createSignal(false);
	const [is_focus, set_focus] = createSignal<boolean>(false);
	const [history, add_command] = createCommandHistory();

	let handle_submit: (line: string, is_cmd: boolean) => void;
	let update_command_from_history: Setter<string>;

	function focus(force?: boolean) {
		if ((is_focus() || force) && input_ref) {
			input_ref.focus();
			return;
		}
		if (default_input_ref && !is_waiting_input()) {
			default_input_ref.focus();
		}
		outputs_ref.scrollTop = outputs_ref.scrollHeight;
	}

	onMount(() => {
		const submit = createSubmitHandler(
			props.editor_api,
			props.side,
			socket,
			set_lines,
			set_waiting_input,
			add_command,
			focus
		);
		setup_socket_events(socket, set_lines, set_waiting_input, focus);
		const clear_history_idx = setup_history_events(
			default_input_ref,
			is_focus,
			history,
			update_command_from_history
		);
		handle_submit = (line: string, is_cmd: boolean) => {
			let player: number;
			switch (props.side) {
				case P1:
					player = 1;
					break;
				case P2:
					player = 2;
					break;
				default:
					return;
			}
			let cursor: number;
			switch (cursor_metadata.current_cursor) {
				case C1:
					cursor = 0;
					break;
				case C2:
					cursor = 1;
					break;
				case C3:
					cursor = 2;
					break;
				case C4:
					cursor = 3;
					break;
				default:
					return;
			}
			submit(player, cursor, line, is_cmd);
			clear_history_idx();
		};
	});

	return (
		<div class={props.class} classList={props.classList}>
			<div
				class="flex w-full h-full border-t overflow-hidden border-night-900"
				onFocusIn={() => {
					set_focus(true);
					if (default_input_ref && !is_waiting_input()) {
						default_input_ref.focus();
					}
					outputs_ref.scrollTop = outputs_ref.scrollHeight;
				}}
				onFocusOut={() => set_focus(false)}
				onClick={() => {
					if (!is_focus()) {
						set_focus(true);
						if (default_input_ref && !is_waiting_input()) {
							default_input_ref.focus();
						}
						outputs_ref.scrollTop = outputs_ref.scrollHeight;
					}
				}}
			>
				<div class="h-fit w-fit p-4 bg-night-900">
					<TerminalIcon class="cursor-pointer" />
				</div>
				<div class="flex flex-col p-4 w-full bg-night-800">
					<div
						class="flex-grow overflow-y-auto"
						ref={outputs_ref}
						classList={{
							"pb-4": lines.length > 0,
						}}
					>
						<For
							each={lines.flatMap((line) => {
								const lines = line.content.split("\n") ?? [];
								if (
									lines.length > 1 &&
									lines[lines.length - 1] === "" &&
									!line.editable
								) {
									lines.pop();
								}
								return lines.map((l, idx) => {
									return {
										username: line.username,
										content: l,
										file: line.file,
										in_out: line.in_out,
										editable:
											idx === lines.length - 1
												? line.editable
												: undefined,
										is_error : line.is_error
									} as LineData;
								});
							})}
						>
							{(line, _) => {
								return (
									<Line
										prefix={{
											username: line.username,
											file: line.file,
										}}
										is_error={line.is_error}
										readonly={line.content}
										editable={line.editable}
										on_submit={
											line.editable !== undefined
												? (content) =>
														handle_submit(
															content,
															line.in_out === In
														)
												: undefined
										}
										ref={
											line.editable
												? (e) => (input_ref = e)
												: undefined
										}
									/>
								);
							}}
						</For>
					</div>
					<div
						class="flex-grow"
						classList={{
							"pt-4 border-t border-night-600": lines.length > 0,
						}}
					>
						<Line
							is_error={false}
							prefix={{ username: "user", file: "cmd" }}
							readonly={""}
							editable={true}
							on_submit={(content) =>
								handle_submit(content, true)
							}
							ref={(e) => (default_input_ref = e)}
							set_msg_ref={(setter) =>
								(update_command_from_history = setter)
							}
						/>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Console;
