import ControlCursor from "@assets/icons/control_cursor";
import { C1, C2, C3, C4, cursor_from, P1, Te_Cursor } from "@utils/player.type";
import { useCursorMetadata } from "./editor.utils";
import { createSignal, For, Show } from "solid-js";
import { useFault } from "@components/errors/fault";
import { useSocket } from "@components/io_com/ws";
import { ciphel_io } from "ts_proto_api";

type ControlProps = {

};

const cursors:Te_Cursor[] = [C1, C2, C3, C4];


function Control(props: ControlProps) {
	const socket = useSocket();
	const cursor_metadata = useCursorMetadata();
	const fault = useFault();

	socket.on_request((request: ciphel_io.CiphelRequest) => {
		if (request.requestType === "spawnThread") {
			if (
				!request.spawnThread ||
				request.spawnThread?.cursor === undefined ||
				request.spawnThread?.cursor === null
			)
				return;
			const cursor = cursor_from(request.spawnThread?.cursor);
			if (!cursor) return;
			cursor_metadata.setInfo(cursor, { active: true });
			
			return;
		}
		if (request.requestType === "closeThread") {
			if (
				!request.closeThread ||
				!request.closeThread?.cursor
			)
				return;
			const cursor = cursor_from(request.closeThread?.cursor);
			if (!cursor) return;
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
							on_click={() => cursor_metadata.current_cursor = cursor}
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
