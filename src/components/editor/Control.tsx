import ControlCursor from "@assets/icons/control_cursor";
import { C1, C2, C3, C4, P1, Te_Cursor } from "@utils/player.type";
import { CursorMetadata } from "./editor.utils";
import { Show } from "solid-js";

type ControlProps = {
	active: Te_Cursor;
	change_cursor: (cursor: Te_Cursor) => void;
	cursor_data: CursorMetadata;
};

function Control(props: ControlProps) {
	return (
		<aside class="h-full w-fit p-4 bg-night-900">
			<nav class="flex flex-col gap-8">
				<Show when={props.cursor_data.info[C1].active} fallback={<ControlCursor e_cursor={C1}/>}>
					<ControlCursor
						on_click={() => props.change_cursor(C1)}
						class="cursor-pointer"
						classList={{
							"opacity-60": props.active !== C1,
						}}
						e_player={P1}
						e_cursor={C1}
					/>
				</Show>
				<Show when={props.cursor_data.info[C2].active}>
					<ControlCursor
						on_click={() => props.change_cursor(C2)}
						class="cursor-pointer"
						classList={{
							"opacity-60": props.active !== C2,
						}}
						e_player={P1}
						e_cursor={C2}
					/>
				</Show>
				<Show when={props.cursor_data.info[C3].active}>
					<ControlCursor
						on_click={() => props.change_cursor(C3)}
						class="cursor-pointer"
						classList={{
							"opacity-60": props.active !== C3,
						}}
						e_player={P1}
						e_cursor={C3}
					/>
				</Show>
				<Show when={props.cursor_data.info[C4].active}>
					<ControlCursor
						on_click={() => props.change_cursor(C4)}
						class="cursor-pointer"
						classList={{
							"opacity-60": props.active !== C4,
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
