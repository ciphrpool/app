import ControlCursor from "@assets/icons/control_cursor";
import { C1, C2, C3, C4, cursor_from, cursor_to, P1, P2, Te_Cursor, Te_Player } from "@utils/player.type";
import { useCursorMetadata } from "./editor.utils";
import { createSignal, For, Show } from "solid-js";
import { useFault } from "@components/errors/fault";
import { useSocket } from "@components/io_com/ws";
import { ciphel_io } from "ts_proto_api";
import { EditorApi } from "./Editor";

type ControlProps = {
	editor_api: EditorApi;
	side: Te_Player;
};

const cursors:Te_Cursor[] = [C1, C2, C3, C4];


function Control(props: ControlProps) {
	const socket = useSocket();
	const cursor_metadata = useCursorMetadata();
	const fault = useFault();

	socket.on_request((request: ciphel_io.API_Signal) => {
		if (request.SignalType === "spawnThread") {
			if (
				!request.spawnThread ||
				request.spawnThread?.tid === undefined ||
				request.spawnThread?.tid === null
			) {
				return;
			} 
			const res = cursor_from(request.spawnThread?.tid);
			if (!res) return;
			const [cursor,player] = res;
			cursor_metadata.setInfo(cursor, { active: true });
			
			return;
		}
		if (request.SignalType === "closeThread") {
			if (
				!request.closeThread ||
				!request.closeThread?.tid
			) {
				return;
			}
			const res = cursor_from(request.closeThread?.tid);
			if (!res) return;
			const [cursor,player] = res;
			cursor_metadata.setInfo(cursor, { active: false });
			return;
		}
	});
	return (
		<aside class="h-full w-fit p-4 bg-night-900">
			<nav class="flex flex-col gap-8">
				<For each={cursors}>
					{(cursor) => (
						<Show when={cursor_metadata.info[cursor].active} fallback={<ControlCursor e_cursor={cursor} class="opacity-60"/>}>
						<ControlCursor
							on_click={() => {
								if (cursor === cursor_metadata.current_cursor) {
									// Commit the code
									if (!props.editor_api.snapshot) return;
									const snapshot = props.editor_api.snapshot();
									if (!snapshot || "" === snapshot.src.trim()) return;

									const res_cursor = cursor_to(props.side,cursor_metadata.current_cursor);
									if (!res_cursor) return;
									const [pid,tid] = res_cursor;

									const cmd = `run -l ${snapshot.first_line} -t ${tid} -s \`*${snapshot.src}*\``;
									console.debug({cmd:cmd});
									socket.send({
										command: {
											pid,
											tid,
											cmd,
										},
									});
									cursor_metadata.setInfo(cursor_metadata.current_cursor, {
										commited_line : snapshot.last_line,
									});
									return;
								} else {
									// Select the cursor
									cursor_metadata.current_cursor = cursor
								}
							}}
							class="cursor-pointer"
							classList={{
							"opacity-80": cursor_metadata.current_cursor !== cursor,
							}}
							e_player={P1}
							e_cursor={cursor}
						/>
						</Show>
					)}
				</For>
			</nav>
		</aside>
	);
}

export default Control;
