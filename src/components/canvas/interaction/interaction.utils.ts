export type Point = {
	x: number;
	y: number;
};

export function distance_of(from: Point, to: Point) {
	return Math.sqrt(Math.pow(to.x - from.x, 2) + Math.pow(to.y - from.y, 2));
}

export function angle_of(from: Point, to: Point) {
	return (
		(Math.atan2(to.y - from.y, to.x - from.x) + 2 * Math.PI) % (2 * Math.PI)
	);
}

export function to_deg(angle: number) {
	return (angle * 180) / Math.PI;
}

export interface Restrained {
	on_restrain: () => boolean;
}
