import {
	Assets,
	Bounds,
	Buffer,
	BufferUsage,
	Container,
	DestroyOptions,
	ExtensionType,
	Geometry,
	GlProgram,
	GlobalUniformGroup,
	Instruction,
	InstructionPipe,
	InstructionSet,
	Matrix,
	RenderPipe,
	Renderer,
	Shader,
	State,
	Texture,
	UniformGroup,
	WebGLRenderer,
	extensions,
} from "pixi.js";
import cell_vertex from "@assets/shaders/cell.vert";
import cell_fragment from "@assets/shaders/cell.frag";
import gsap from "gsap";
import { PanningHandler } from "./interaction/panning";
import { Point } from "./interaction/interaction.utils";
import { ZoomingHandler } from "./interaction/zooming";
import { CameraHandler } from "./Camera";
import { gen_textures_info_placeholders, gl_bind } from "./textures_bundle";

type CellCoordinate = {
	x: number;
	y: number;
};

type CellOptions = {
	x_offset: number;
	y_offset: number;
};

type CellData = {
	x: number;
	y: number;

	u: number;
	v: number;

	width: number;
	height: number;
};

class Cell extends Geometry {
	static STRIDE = 4 * 4;
	static NB_VERTICES = 6;
	buffer: Buffer;
	constructor(index_buffer: Buffer, nb_cells: number) {
		const data_length = nb_cells * 4 * 4;
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
			},
		});
		this.buffer = cell_buffer;
	}

	offset() {
		return 4;
	}

	update(idx: number, data: CellData) {
		this.buffer.data[idx + 0] = data.x;
		this.buffer.data[idx + 1] = data.y;
		this.buffer.data[idx + 2] = data.u;
		this.buffer.data[idx + 3] = data.v;
	}
}

type GridConfig = {
	size?: number;
	cell_width?: number;
	camera ?: CameraHandler;
};

export class Grid extends Container {
	public readonly renderPipeId = "grid";
	public readonly canBundle = true;
	state = State.for2d();
	size: number = 32;
	cell_width: number = 32;
	
	public get grid_width() : number {
		return this.cell_width * this.size
	}

	cell_geometry: Cell | undefined = undefined;

	cells_data: (CellData & Partial<CellOptions>)[] = [];

	protected readonly grid_bounds = new Bounds();

	// current_zone = {
	// 	start_x : 0,
	// 	x_idx : 0,
	// 	start_y : 0,
	// 	y_idx : 0,
	// 	zone_size : this.cell_width * this.size,
	// 	zoom : 1,
	// }

	constructor(config: GridConfig) {
		super();
		if (config.size) this.size = config.size;
		if (config.cell_width) this.cell_width = config.cell_width;

		if(config.camera) {
			config.camera.pin(this);
		}

		for (let x = 0; x < this.size; x++) {
			for (let y = 0; y < this.size; y++) {
				this.cells_data[x * this.size + y] = {
					x: x * this.cell_width,
					y: y * this.cell_width,

					u: 0,
					v: 0,

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
		this.eventMode = "static";
		this.cursor = "pointer";
		let bind = this;

		this.hitArea = {
			contains(x, y): boolean {
				return bind.grid_bounds.containsPoint(x, y);
			},
		};
	}

	update_cell_width(width: number) {
		if (this.cell_width === width) return;
		this.cell_width = width;

		for (let x = 0; x < this.size; x++) {
			for (let y = 0; y < this.size; y++) {
				this.cells_data[x * this.size + y] = {
					x: x * this.cell_width,
					y: y * this.cell_width,

					u: 0,
					v: 0,

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
		const idx = x * this.size + y;
		if (idx >= this.cells_data.length || idx < 0) return;
		this.cells_data[idx] = {
			...this.cells_data[idx],
			...new_config,
		};
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
				width: this.cells_data[i].width,
				height: this.cells_data[i].height,
			});
			this.cell_geometry.update(buffer_idx + 1 * offset, {
				x: this.cells_data[i].x + this.cells_data[i].width,
				y: this.cells_data[i].y,
				u: this.cell_width,
				v: 0,
				width: this.cells_data[i].width,
				height: this.cells_data[i].height,
			});
			this.cell_geometry.update(buffer_idx + 2 * offset, {
				x: this.cells_data[i].x + this.cells_data[i].width,
				y: this.cells_data[i].y + this.cells_data[i].height,
				u: this.cell_width,
				v: this.cell_width,
				width: this.cells_data[i].width,
				height: this.cells_data[i].height,
			});
			this.cell_geometry.update(buffer_idx + 3 * offset, {
				x: this.cells_data[i].x,
				y: this.cells_data[i].y + this.cells_data[i].height,
				u: 0,
				v: this.cell_width,
				width: this.cells_data[i].width,
				height: this.cells_data[i].height,
			});
			this.cell_geometry.buffer.update();
		}
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

export abstract class GridAdaptor {
	abstract init(): void;
	abstract load(renderer: Renderer): void;
	abstract execute(pipeline: GridRenderPipe, grid: Grid): void;
	abstract destroy(): void;

	public pipe_uniforms = new UniformGroup({
		u_proj_trans: { value: new Matrix(), type: "mat3x3<f32>" },
		u_cell_size: { value: new Float32Array(2), type: "vec2<f32>" },
	});
}

export interface GridInstruction extends Instruction {
	renderPipeId: "grid";
	grid: Grid;
}

class GridRenderPipe
	implements RenderPipe<Grid>, InstructionPipe<GridInstruction>
{
	public static extension = {
		type: [ExtensionType.WebGLPipes, ExtensionType.WebGPUPipes],
		name: "grid",
	} as const;

	public readonly renderer: Renderer;
	private adaptor: GridAdaptor;
	grid_index_buffer: Buffer;

	constructor(renderer: Renderer, adaptor: GridAdaptor) {
		this.renderer = renderer;
		this.adaptor = adaptor;

		this.adaptor.init();

		this.grid_index_buffer = new Buffer({
			usage: BufferUsage.INDEX | BufferUsage.COPY_DST,
			label: "grid_index_buffer",
			data: new Uint16Array(32 * 32 * Cell.NB_VERTICES),
		});
	}

	build_cell(nb_cells: number): Cell {
		return new Cell(this.grid_index_buffer, nb_cells);
	}

	fill_index_buffer(grid_size: number) {
		if (
			grid_size * grid_size * Cell.NB_VERTICES !==
			this.grid_index_buffer.data.length
		) {
			this.grid_index_buffer.data = new Uint16Array(
				grid_size * grid_size * Cell.NB_VERTICES
			);
		}
		// Fill the grid index buffer data with the indices for 32*32 cells of 6 vertices
		for (
			let i = 0, j = 0;
			i < grid_size * grid_size * Cell.NB_VERTICES;
			i += Cell.NB_VERTICES, j += 4
		) {
			this.grid_index_buffer.data[i + 0] = j + 0;
			this.grid_index_buffer.data[i + 1] = j + 1;
			this.grid_index_buffer.data[i + 2] = j + 2;
			this.grid_index_buffer.data[i + 3] = j + 0;
			this.grid_index_buffer.data[i + 4] = j + 2;
			this.grid_index_buffer.data[i + 5] = j + 3;
		}
	}

	addRenderable(grid: Grid, instructionSet: InstructionSet): void {
		const batcher = this.renderer.renderPipes.batch;

		(async () => {
			await this.adaptor.load(this.renderer);
		})()

		// update grid buffers
		grid.update_cell_width(this.renderer.width / grid.size);
		grid.update(this);

		batcher.break(instructionSet);
		instructionSet.add(grid.get_instruction_set());
	}

	updateRenderable(
		grid: Grid,
		instructionSet?: InstructionSet | undefined
	): void {
		grid.update(this);
		grid.update_cell_width(this.renderer.width / grid.size);
	}
	destroyRenderable(grid: Grid): void {
		grid.destroy_geometry();
	}
	// validateRenderable?: ((renderable: Grid) => boolean) | undefined;

	public execute({ grid }: GridInstruction) {
		if (!grid.isRenderable) return;
		grid.state.blendMode = grid.groupBlendMode;

		const u_proj_trans = this.adaptor.pipe_uniforms.uniforms.u_proj_trans;

		// Retrieve the last GlobalUniformGroup of the renderer globalUniforms
		const u_global = (
			(this.renderer.globalUniforms as any)._activeUniforms.at(
				-1
			) as GlobalUniformGroup
		).uniforms;

		u_global.uProjectionMatrix
			.copyTo(u_proj_trans)
			.append(u_global.uWorldTransformMatrix)
			.append(grid.worldTransform);



		// console.log({scene_width:this.renderer.width,scene_height:this.renderer.height});
		this.adaptor.pipe_uniforms.uniforms.u_cell_size[0] = grid.cell_width;
		this.adaptor.pipe_uniforms.uniforms.u_cell_size[1] = grid.cell_width;

		this.adaptor.pipe_uniforms.update();

		this.adaptor.execute(this, grid);
	}
}

class Grid_WebGLAdaptor extends GridAdaptor {
	public static extension = {
		type: [ExtensionType.WebGLPipesAdaptor],
		name: "grid",
	} as const;

	shader: Shader | undefined;
	textures: Texture[] | undefined;

	init(): void {
		const [textures_indexes,textures_sizes] = gen_textures_info_placeholders();
		this.shader = new Shader({
			glProgram: GlProgram.from({
				vertex: cell_vertex,
				fragment: cell_fragment,
			}),
			resources: {
				pipe_uniforms: this.pipe_uniforms.uniformStructures,
				texture_uniforms: new UniformGroup({
					u_textures: {
						value: textures_indexes,
						type: 'i32',
						size: textures_indexes.length
					},
					u_texture_size: {
						value: textures_sizes,
						type: 'vec4<f32>',
						size: textures_sizes.length
					}
				}, { isStatic: true }),
			},
		});
	}
	async load(renderer: Renderer) {
		const gl_renderer = (renderer as WebGLRenderer);

		this.textures = await gl_bind();
		this.bind(gl_renderer);
	}

	bind(gl_renderer:WebGLRenderer) {
		if (!this.textures) return;
		for (let i = 0; i < this.textures.length; i++) {
			gl_renderer.texture.bind(this.textures[i],i);
		}

		if (this.shader) {
			const buffer = this.shader.resources.texture_uniforms.uniforms.u_texture_size;
			for (let i = 0; i < this.textures.length; i++) {
				buffer[(i *4 ) + 0] = this.textures[i].width;
				buffer[(i *4 ) + 1] = this.textures[i].height;
				buffer[(i *4 ) + 2] = 1.0 / this.textures[i].width;
				buffer[(i *4 ) + 3] = 1.0 / this.textures[i].height;
			}
			
			this.shader.resources.texture_uniforms.update();
		}
	}

	destroy(): void {
		this.shader?.destroy(true);
		this.shader = undefined;
	}
	execute(pipeline: GridRenderPipe, grid: Grid): void {
		if (!this.shader) return;
		if (!this.textures) return;
		if (!grid.cell_geometry) return;

		const renderer = pipeline.renderer as WebGLRenderer;
		const shader = this.shader;

		this.bind(renderer);
		
		renderer.encoder.draw({
			geometry: grid.cell_geometry,
			shader,
			state: grid.state,
			size: grid.size * grid.size * Cell.NB_VERTICES,
		});
	}
}

export function init_grid_render_pipeline() {
	extensions.add(GridRenderPipe);
	extensions.add(Grid_WebGLAdaptor);
}
