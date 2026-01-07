import {
	C1,
	C2,
	C3,
	C4,
	P1,
	P2,
	Te_Cursor,
	Te_Player,
} from "@utils/player.type";
import { JSX } from "solid-js";

type ControlCursorProps = {
	class?: string;
	classList?: {
		[k: string]: boolean | undefined;
	};
	on_click?: JSX.EventHandlerUnion<SVGSVGElement, MouseEvent>;
	e_cursor: Te_Cursor;
	e_player?: Te_Player;
};

function ControlCursor(props: ControlCursorProps) {
	let color: string;

	switch (props.e_player) {
		case P1:
			color = "#32687D";
			break;
		case P2:
			color = "#835221";
			break;
		default:
			color = "#474747";
			break;
	}

	switch (props.e_cursor) {
		case C1:
			return (
				<svg
					onClick={props.on_click}
					class={props.class}
					classList={props.classList}
					width="32"
					height="32"
					viewBox="0 0 32 32"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path d="M0 0H32V32H0V0Z" fill={color} />
					<path
						fill-rule="evenodd"
						clip-rule="evenodd"
						d="M29 3H3V29H29V3ZM0 0V32H32V0H0Z"
						fill="#F8F4E3"
					/>
					<path d="M12 12H20V20H12V12Z" fill="#F8F4E3" />
				</svg>
			);
		case C2:
			return (
				<svg
					onClick={props.on_click}
					class={props.class}
					classList={props.classList}
					width="32"
					height="32"
					viewBox="0 0 32 32"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path d="M0 0H32V32H0V0Z" fill={color} />
					<path
						fill-rule="evenodd"
						clip-rule="evenodd"
						d="M29 3H3V29H29V3ZM0 0V32H32V0H0Z"
						fill="#F8F4E3"
					/>
					<path d="M6 6H26V14H6V6Z" fill="#F8F4E3" />
					<path d="M6 18H26V26H6V18Z" fill="#F8F4E3" />
				</svg>
			);
		case C3:
			return (
				<svg
					onClick={props.on_click}
					class={props.class}
					classList={props.classList}
					width="32"
					height="32"
					viewBox="0 0 32 32"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path d="M0 0H32V32H0V0Z" fill={color} />
					<path
						fill-rule="evenodd"
						clip-rule="evenodd"
						d="M29 3H3V29H29V3ZM0 0V32H32V0H0Z"
						fill="#F8F4E3"
					/>
					<path d="M6 6H14V14H6V6Z" fill="#F8F4E3" />
					<path d="M18 6H26V14H18V6Z" fill="#F8F4E3" />
					<path d="M6 18H26V26H6V18Z" fill="#F8F4E3" />
				</svg>
			);
		case C4:
			return (
				<svg
					onClick={props.on_click}
					class={props.class}
					classList={props.classList}
					width="32"
					height="32"
					viewBox="0 0 32 32"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path d="M0 0H32V32H0V0Z" fill={color} />
					<path
						fill-rule="evenodd"
						clip-rule="evenodd"
						d="M29 3H3V29H29V3ZM0 0V32H32V0H0Z"
						fill="#F8F4E3"
					/>
					<path d="M18 18H26V26H18V18Z" fill="#F8F4E3" />
					<path d="M6 6H14V14H6V6Z" fill="#F8F4E3" />
					<path d="M6 18H14V26H6V18Z" fill="#F8F4E3" />
					<path d="M18 6H26V14H18V6Z" fill="#F8F4E3" />
				</svg>
			);
		default:
			break;
	}
}

export default ControlCursor;
