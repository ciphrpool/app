import gsap from "gsap";
import { Point, angle_of, distance_of } from "./interaction.utils";
import { Container } from "pixi.js";
import { Grid } from "../grid/grid";

export class PanningHandler {
	static PANNING_RADIUS_RATE = 0.3;
	tween: gsap.core.Tween | undefined;

	zone_size: number = 1;
	zone_idx_x: number = 0;
	zone_idx_y: number = 0;

	starting_point: Point | undefined;
	touch_starting_point: Point | undefined;
	container: Container | undefined;
	grid: Grid | undefined;

	restrictions: (() => boolean)[] = [];

	public set zoom(zoom: number) {
		this.zone_idx_x = Math.floor((this.zone_idx_x / this.zone_size) * zoom);
		this.zone_idx_y = Math.floor((this.zone_idx_y / this.zone_size) * zoom);
		this.zone_size = zoom;
		this.translate(this.zone_idx_x, this.zone_idx_y);
	}

	focus(position: Point, zoom: number) {
		if (!this.grid) return;
		if (zoom > this.zone_size) {
			let next_zone_idx_x =
				this.zone_idx_x * this.zone_size +
				Math.floor((position.x / this.grid.grid_width) * 2);
			let next_zone_idx_y =
				this.zone_idx_y * this.zone_size +
				Math.floor((position.y / this.grid.grid_width) * 2);
			this.zone_size = zoom;
			this.translate(next_zone_idx_x, next_zone_idx_y);
		} else {
			this.zone_idx_x = Math.floor(
				(this.zone_idx_x / this.zone_size) * zoom
			);
			this.zone_idx_y = Math.floor(
				(this.zone_idx_y / this.zone_size) * zoom
			);
			this.zone_size = zoom;
			this.translate(this.zone_idx_x, this.zone_idx_y);
		}
	}

	is_playing: boolean = false;

	constructor() {}

	public set on_restrain(restrain_fn: () => boolean) {
		this.restrictions.push(restrain_fn);
	}

	is_active() {
		return this.restrictions
			.map((restrain_fn) => restrain_fn())
			.reduce((is_active, active) => is_active && active, true);
	}

	subscribe(src: Container) {
		this.container = src;
		src.onpointerdown = (e) => {
			if (!this.is_active()) return;
			this.is_playing = true;

			this.touch_starting_point = {
				x: e.x,
				y: e.y,
			};
			this.starting_point = {
				x: src.x,
				y: src.y,
			};
		};
		src.onpointermove = (e) => {
			if (!this.grid) return;
			const container = src;

			this.hold({
				x: e.x,
				y: e.y,
			});
		};
		src.onpointerup = (e) => {
			if (!this.starting_point) return;
			if (!this.touch_starting_point) return;
			if (!this.container) return;
			if (!this.grid) return;

			const position = { x: e.x, y: e.y };
			const dx = position.x - this.touch_starting_point.x;
			const dy = position.y - this.touch_starting_point.y;
			if (dx === 0 && dy === 0) {
				this.release();
				return;
			}

			const angle = angle_of({ x: 1, y: 0 }, { x: dx, y: dy });

			this.is_playing = false;
			this.starting_point = undefined;
			this.touch_starting_point = undefined;

			let direction_x = 0;
			let direction_y = 0;

			if (angle >= (2 * Math.PI) / 3 && angle <= (4 * Math.PI) / 3) {
				// swipe left => go right
				direction_x = 1;
			} else if (
				angle >= (4 * Math.PI) / 3 &&
				angle <= (5 * Math.PI) / 3
			) {
				// swipe up => go down
				direction_y = 1;
			} else if (angle <= Math.PI / 3 || angle >= (5 * Math.PI) / 3) {
				// swipe right => go left
				direction_x = -1;
			} else if (angle >= Math.PI / 3 && angle <= (2 * Math.PI) / 3) {
				// swipe down => go up
				direction_y = -1;
			}

			const next_x_idx = Math.max(
				Math.min(this.zone_idx_x + direction_x, this.zone_size - 1),
				0
			);
			const next_y_idx = Math.max(
				Math.min(this.zone_idx_y + direction_y, this.zone_size - 1),
				0
			);

			this.translate(next_x_idx, next_y_idx);
		};

		src.onpointerleave = (e) => {
			if (!this.is_playing) return;
			this.release();
		};
	}

	hold(to: Point) {
		if (!this.starting_point) return;
		if (!this.touch_starting_point) return;
		if (!this.container) return;
		if (!this.grid) return;
		const distance = distance_of(this.touch_starting_point, to);
		const angle = angle_of(this.touch_starting_point, to);

		const max_distance =
			this.grid.grid_width * PanningHandler.PANNING_RADIUS_RATE;

		this.container.x =
			this.starting_point.x +
			Math.cos(angle) * Math.min(distance, max_distance);
		this.container.y =
			this.starting_point.y +
			Math.sin(angle) * Math.min(distance, max_distance);
	}

	release() {
		if (!this.container) return;
		if (!this.grid) return;
		this.is_playing = false;
		this.starting_point = undefined;

		if (this.tween) {
			this.tween.kill();
		}
		this.tween = gsap.to(this.container, {
			x: -this.zone_idx_x * this.grid.grid_width,
			y: -this.zone_idx_y * this.grid.grid_width,
		});
	}

	translate(zone_x: number, zone_y: number) {
		if (!this.container) return;
		if (!this.grid) return;

		this.tween = gsap.to(this.container, {
			x: -zone_x * this.grid.grid_width,
			y: -zone_y * this.grid.grid_width,
		});

		this.zone_idx_x = zone_x;
		this.zone_idx_y = zone_y;
	}

	pin(grid: Grid) {
		this.grid = grid;
		this.zone_size = 1;
		this.zone_idx_x = 0;
		this.zone_idx_y = 0;
	}
}
