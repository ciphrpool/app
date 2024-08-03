import { ciphel_io } from "ts_proto_api";


export const P1 = Symbol("P1");
export const P2 = Symbol("P2");
export type Te_Player = typeof P1 | typeof P2;

export function side_of(player: Te_Player): ciphel_io.PlayerSide {
	switch (player) {
		case P1:
			return ciphel_io.PlayerSide.P1;
		case P2:
			return ciphel_io.PlayerSide.P2;
		default:
			return ciphel_io.PlayerSide.DEFAULT;
	}
}

export const C1 = Symbol("C1");
export const C2 = Symbol("C2");
export const C3 = Symbol("C3");
export const C4 = Symbol("C4");
export type Te_Cursor = typeof C1 | typeof C2 | typeof C3 | typeof C4;

export function cursor_from(id: number): Te_Cursor | undefined {
	switch (id) {
		case 0:
			return C1;
		case 1:
			return C2;
		case 2:
			return C3;
		case 3:
			return C4;
		default:
			return undefined;
	}
}
