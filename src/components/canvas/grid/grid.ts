import {
	Bounds,
	Container,
	DestroyOptions,
	State,
} from "pixi.js";
import { CameraHandler } from "../interaction/Camera";
import { Cell, CellAttributes, CellCoordinate, CellData, CellOptions } from "./cell";
import { GridInstruction, GridRenderPipe } from "./pipeline";
import { P1 } from "@utils/player.type";
import { get_texture_position } from "ts_textures";
import { ciphel_io } from "ts_proto_api";

type GridConfig = {
	size?: number;
	cell_width?: number;
	frame_width?: number;
	camera ?: CameraHandler;
};

export class Grid extends Container {
	public readonly renderPipeId = "grid";
	public readonly canBundle = true;
	state = State.for2d();
	size: number = 32;
	cell_width: number = 32;
	frame_width: number = 32;
	
	public get grid_width() : number {
		return this.cell_width * this.size
	}

	cell_geometry: Cell | undefined = undefined;

	cells_data: (CellAttributes & CellData & Partial<CellOptions>)[] = [];

	protected readonly grid_bounds = new Bounds();

	constructor(config: GridConfig) {
		super();
		if (config.size) this.size = config.size;
		if (config.cell_width) this.cell_width = config.cell_width;
		if (config.frame_width) this.frame_width = config.frame_width;

		if(config.camera) {
			config.camera.pin(this);
		}

		for (let y = 0; y < this.size; y++) {
			for (let x = 0; x < this.size; x++) {
				this.cells_data[y * this.size + x] = {
					x: x * this.cell_width,
					y: y * this.cell_width,

					u: 0,
					v: 0,

					frame_x :0,
					frame_y :0,

					frame_width: this.frame_width,
					frame_height: this.frame_width,

					texture_idx : -1,

					width: this.cell_width,
					height: this.cell_width,

					corruption_level : 100,
				};
				this.grid_bounds.addFrame(
					x * this.cell_width,
					y * this.cell_width,
					(x + 1) * this.cell_width,
					(y + 1) * this.cell_width
				);
			}
		}
		this.eventMode = "static";
		this.cursor = "pointer";
		const bind = this;

		this.hitArea = {
			contains(x, y): boolean {
				return bind.grid_bounds.containsPoint(x, y);
			},
		};
	}

	update_cell_width(width: number) {
		if (this.cell_width === width) return;
		this.cell_width = width;

		for (let y = 0; y < this.size; y++) {
			for (let x = 0; x < this.size; x++) {
				this.cells_data[y * this.size + x] = {
					...this.cells_data[y * this.size + x],
					x: x * this.cell_width,
					y: y * this.cell_width,

					width: this.cell_width,
					height: this.cell_width,
				};
				this.grid_bounds.addFrame(
					x * this.cell_width,
					y * this.cell_width,
					(x + 1) * this.cell_width,
					(y + 1) * this.cell_width
				);
			}
		}
	}

	get_instruction_set(): GridInstruction {
		return {
			renderPipeId: this.renderPipeId,
			grid: this,
			canBundle: this.canBundle,
		};
	}

	getBounds(
		skipUpdate?: boolean | undefined,
		bounds?: Bounds | undefined
	): Bounds {
		return this.grid_bounds;
	}
	modify_cell({ x, y }: CellCoordinate, new_config: Partial<CellOptions>) {
		const idx = y * this.size + x;
		if (idx >= this.cells_data.length || idx < 0) return;

        if (new_config.player !== undefined) {
            this.cells_data[idx].texture_idx = new_config.player === P1 ? 0 : 1;
        } else {
            this.cells_data[idx].texture_idx = -1;
        }


        if (new_config.texture_id) {
            const [x,y] = get_texture_position(new_config.texture_id);
            this.cells_data[idx].frame_x = x;
            this.cells_data[idx].frame_y = y;
        }
		this.update_geometry();
	}

    batch_modify_cells(new_config: ciphel_io.ICellData[]) {
		
		if (new_config.length != this.cells_data.length) return;

        for (let idx = 0;idx < this.cells_data.length; idx++) {			
			this.cells_data[idx].texture_idx = new_config[idx].side! - 1;
			this.cells_data[idx].corruption_level = new_config[idx].corruptionLevel ?? 0;

            if (new_config[idx].texture !== -1) {
				const [x,y] = get_texture_position(new_config[idx].texture!);
				
                this.cells_data[idx].frame_x = x/32;
                this.cells_data[idx].frame_y = y/32;
            }
        }
		this.update_geometry();
	}

	clear() {
		for (let idx = 0;idx < this.cells_data.length; idx++) {
			this.cells_data[idx].texture_idx = -1
        }
		this.update_geometry();
	}


	update(pipeline: GridRenderPipe) {
		if (!this.cell_geometry) {
			this.cell_geometry = pipeline.build_cell(this.size * this.size);
		}

		pipeline.fill_index_buffer(this.size);
		this.update_geometry();
	}

	update_geometry() {
		if (!this.cell_geometry) return;
		const offset = this.cell_geometry.offset();

		for (
			let i = 0, buffer_idx = 0;
			i < this.cells_data.length;
			i++, buffer_idx += offset * 4
		) {
			this.cell_geometry.update(buffer_idx, {
				x: this.cells_data[i].x,
				y: this.cells_data[i].y,

				u: 0,
				v: 0,
				
				frame_x :this.cells_data[i].frame_x * this.frame_width,
				frame_y :this.cells_data[i].frame_y * this.frame_width,

				frame_width :this.cells_data[i].frame_width,
				frame_height :this.cells_data[i].frame_height,

				texture_idx :this.cells_data[i].texture_idx,

				corruption_level : this.cells_data[i].corruption_level,
			});
			this.cell_geometry.update(buffer_idx + 1 * offset, {
				x: this.cells_data[i].x + this.cells_data[i].width,
				y: this.cells_data[i].y,

				u: this.frame_width,
				v: 0,
				
				frame_x :this.cells_data[i].frame_x * this.frame_width,
				frame_y :this.cells_data[i].frame_y * this.frame_width,

				frame_width :this.cells_data[i].frame_width,
				frame_height :this.cells_data[i].frame_height,

				texture_idx :this.cells_data[i].texture_idx,
				corruption_level : this.cells_data[i].corruption_level,
			});
			this.cell_geometry.update(buffer_idx + 2 * offset, {
				x: this.cells_data[i].x + this.cells_data[i].width,
				y: this.cells_data[i].y + this.cells_data[i].height,

				u: this.frame_width,
				v: this.frame_width,
				
				frame_x :this.cells_data[i].frame_x * this.frame_width,
				frame_y :this.cells_data[i].frame_y * this.frame_width,

				frame_width :this.cells_data[i].frame_width,
				frame_height :this.cells_data[i].frame_height,

				texture_idx :this.cells_data[i].texture_idx,
				corruption_level : this.cells_data[i].corruption_level,
			});
			this.cell_geometry.update(buffer_idx + 3 * offset, {
				x: this.cells_data[i].x,
				y: this.cells_data[i].y + this.cells_data[i].height,

				u: 0,
				v: this.frame_width,
				
				frame_x :this.cells_data[i].frame_x * this.frame_width,
				frame_y :this.cells_data[i].frame_y * this.frame_width,

				frame_width :this.cells_data[i].frame_width,
				frame_height :this.cells_data[i].frame_height,

				texture_idx :this.cells_data[i].texture_idx,
				corruption_level : this.cells_data[i].corruption_level,
			});
		}
		this.cell_geometry.buffer.update();
	}

	destroy_geometry() {
		if (!this.cell_geometry) return;
		this.cell_geometry.destroy();
		this.cell_geometry = undefined;
	}
	destroy(options?: DestroyOptions | undefined): void {
		super.destroy(options);
		this.destroy_geometry();
	}
}
