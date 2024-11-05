import { ciphel_io } from "ts_proto_api";


export const P1 = Symbol("P1");
export const P2 = Symbol("P2");
export type Te_Player = typeof P1 | typeof P2;

export function side_of(player: Te_Player): ciphel_io.API_PID {
	switch (player) {
		case P1:
			return ciphel_io.API_PID.P1;
		case P2:
			return ciphel_io.API_PID.P2;
		default:
			return ciphel_io.API_PID.DEFAULT;
	}
}

export const C1 = Symbol("C1");
export const C2 = Symbol("C2");
export const C3 = Symbol("C3");
export const C4 = Symbol("C4");
export type Te_Cursor = typeof C1 | typeof C2 | typeof C3 | typeof C4;

export function cursor_from(id: number): [Te_Cursor,Te_Player] | undefined {
	switch (id) {
		case 1:
			return [C1,P1];
		case 2:
			return [C2,P1];
		case 3:
			return [C3,P1];
		case 4:
			return [C4,P1];
		case 5:
			return [C1,P2];
		case 6:
			return [C2,P2];
		case 7:
			return [C3,P2];
		case 8:
			return [C4,P2];
		default:
			return undefined;
	}
}

export function cursor_to(player:Te_Player,cursor:Te_Cursor): [number,number] | undefined {
	const player_offset = P1 === player ? 0 : 4;
	const player_id = P1 === player ? 1 : 2;
	switch (cursor) {
		case C1:
			return [player_id,1 + player_offset];
		case C2:
			return [player_id,2 + player_offset];
		case C3:
			return [player_id,3 + player_offset];
		case C4:
			return [player_id,4 + player_offset];
		default:
			return undefined;
	}
}