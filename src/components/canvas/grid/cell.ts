import {
	Buffer,
	BufferUsage,
	Geometry,
} from "pixi.js";
import { Te_Player } from "@utils/player.type";

export type CellCoordinate = {
	x: number;
	y: number;
};

export type CellOptions = {
    player : Te_Player,
    texture_id : number,
};

export type CellData = {
    texture_idx : number;

	width: number;
	height: number;
};


export type CellAttributes = {
	x: number;
	y: number;

	u: number;
	v: number;

	frame_x: number;
	frame_y: number;

	frame_width: number;
	frame_height: number;

	texture_idx : number;

    corruption_level: number;
};

export class Cell extends Geometry {
	static STRIDE = 4 * 10;
	static NB_VERTICES = 6;
	buffer: Buffer;
	constructor(index_buffer: Buffer, nb_cells: number) {
		const data_length = nb_cells * Cell.STRIDE;
		const cell_buffer = new Buffer({
			label: "cell_vertex_buffer",
			data: new Float32Array(data_length),
			usage: BufferUsage.VERTEX | BufferUsage.COPY_DST,
		});

		super({
			indexBuffer: index_buffer,
			attributes: {
				// [x : f32,y : f32] | size : 8
				a_vertex_position: {
					format: "float32x2",
					buffer: cell_buffer,
					offset: 0,
					stride: Cell.STRIDE,
				},
				a_texture_position: {
					format: "float32x2",
					buffer: cell_buffer,
					offset: 2 * 4, // sizeof(float32x2)
					stride: Cell.STRIDE,
				},
				a_frame_position: {
					format: "float32x2",
					buffer: cell_buffer,
					offset: (2 * 4)*2 , // sizeof(float32x2)
					stride: Cell.STRIDE,
				},
				a_frame_size: {
					format: "float32x2",
					buffer: cell_buffer,
					offset: (2 * 4)*3 , // sizeof(float32x2)
					stride: Cell.STRIDE,
				},
				a_texture_idx: {
					format: "float32",
					buffer: cell_buffer,
					offset: (2 * 4)*4, 
					stride: Cell.STRIDE,
				},
                a_corruption_level: {
                    format: "float32",
                    buffer: cell_buffer,
                    offset: (2 * 4) * 4 + 4,
                    stride: Cell.STRIDE,
                },
			},
		});
		this.buffer = cell_buffer;
	}

	offset() {
		return 10;
	}

	update(idx: number, data: CellAttributes) {
		this.buffer.data[idx + 0] = data.x;
		this.buffer.data[idx + 1] = data.y;
		
		this.buffer.data[idx + 2] = data.u;
		this.buffer.data[idx + 3] = data.v;

		this.buffer.data[idx + 4] = data.frame_x;
		this.buffer.data[idx + 5] = data.frame_y;

		this.buffer.data[idx + 6] = data.frame_width;
		this.buffer.data[idx + 7] = data.frame_height;
		
		this.buffer.data[idx + 8] = data.texture_idx;
		
        this.buffer.data[idx + 9] = data.corruption_level;
	}
}
