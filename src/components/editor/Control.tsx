import ControlCursor from "@assets/icons/control_cursor";
import { C1, C2, C3, C4, P1, Te_Cursor } from "@utils/player.type";
import { CursorMetadata, useCursorMetadata } from "./editor.utils";
import { Show } from "solid-js";
import { useFault } from "@components/errors/fault";

type ControlProps = {

};

function Control(props: ControlProps) {
	const cursor_metadata = useCursorMetadata();
	const fault = useFault();

	return (
		<aside class="h-full w-fit p-4 bg-night-900">
			<nav class="flex flex-col gap-8">
				<Show when={cursor_metadata.info[C1].active} fallback={<ControlCursor e_cursor={C1}/>}>
					<ControlCursor
						on_click={() => cursor_metadata.change_cursor(C1)}
						class="cursor-pointer"
						classList={{
							"opacity-60": cursor_metadata.current_cursor !== C1,
						}}
						e_player={P1}
						e_cursor={C1}
					/>
				</Show>
				<Show when={cursor_metadata.info[C2].active}>
					<ControlCursor
						on_click={() => cursor_metadata.change_cursor(C2)}
						class="cursor-pointer"
						classList={{
							"opacity-60": cursor_metadata.current_cursor !== C2,
						}}
						e_player={P1}
						e_cursor={C2}
					/>
				</Show>
				<Show when={cursor_metadata.info[C3].active}>
					<ControlCursor
						on_click={() => cursor_metadata.change_cursor(C3)}
						class="cursor-pointer"
						classList={{
							"opacity-60": cursor_metadata.current_cursor !== C3,
						}}
						e_player={P1}
						e_cursor={C3}
					/>
				</Show>
				<Show when={cursor_metadata.info[C4].active}>
					<ControlCursor
						on_click={() => cursor_metadata.change_cursor(C4)}
						class="cursor-pointer"
						classList={{
							"opacity-60": cursor_metadata.current_cursor !== C4,
						}}
						e_player={P1}
						e_cursor={C4}
					/>
				</Show>
			</nav>
		</aside>
	);
}

export default Control;
