import gsap from "gsap";
import { Point, Restrained } from "./interaction.utils";
import { Container } from "pixi.js";
import { Grid } from "../grid/grid";

export interface InteractionPlanner {
	on_start?: (zoom:number,position:Point) => void;
	on_update?: () => void;
	on_complete?: (zoom:number) => void;
}

export class ZoomingHandler {
	static MAX = 4;
	static MIN = 1;
	tween: gsap.core.Tween | undefined;
	container : Container | undefined;
    grid: Grid | undefined;

	
	public get offset() : number {
		return this.container?.scale.x ?? 1;
	}
	
	
	public set offset(zoom : number) {
		this.container?.scale.set(zoom);
	}
	

	constructor() {}

	restrain(handler: Restrained) {
		handler.on_restrain = () => {
			return this.offset !== ZoomingHandler.MIN;
		};
	}

	subscribe(container: Container, planner: InteractionPlanner) {
		this.container = container;
		container.onwheel = (e) => {
			let position = {x:e.screenX,y:e.screenY};
			// console.log(position);
			
			if (e.deltaY <= 0) {
				this.up(planner,position);
			} else {
				this.down(planner,position);
			}
		};
	}

	up(planner: InteractionPlanner,position:Point) {
		if (!this.container) return;
		if (this.tween && this.tween.isActive()) return;
		const to = Math.min(ZoomingHandler.MAX, Math.floor(this.offset) * 2);

		this.tween = gsap.to(this, {
			offset: to,
			onUpdate: planner.on_update,
			onStart: () => planner.on_start && planner.on_start(to,position),
			onComplete: () => planner.on_complete && planner.on_complete(to),
		});
	}

	down(planner: InteractionPlanner,position:Point) {
		if (!this.container) return;
		if (this.tween && this.tween.isActive()) return;
		const to = Math.max(ZoomingHandler.MIN, Math.floor(this.offset) / 2);
		this.tween = gsap.to(this, {
			offset: to,
			onUpdate: planner.on_update,
			onStart: () => planner.on_start && planner.on_start(to,position),
			onComplete: () => planner.on_complete && planner.on_complete(to),
		});
	}

	pin(grid:Grid) {
		this.grid = grid;
	}
}
