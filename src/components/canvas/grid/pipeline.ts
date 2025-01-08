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
import { PanningHandler } from "../interaction/panning";
import { Point } from "../interaction/interaction.utils";
import { ZoomingHandler } from "../interaction/zooming";
import { CameraHandler } from "../interaction/Camera";
import {
	gen_textures_info_placeholders,
	gl_bind,
} from "../utils/texture_bundle_helper";
import { Grid } from "./grid";
import { Cell } from "./cell";

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

export class GridRenderPipe
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
	validateRenderable(renderable: Grid): boolean {
		return true; // TBC
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

		this.adaptor.load(this.renderer);

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

		//this.adaptor.pipe_uniforms.update();

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
		const [textures_indexes, textures_sizes] =
			gen_textures_info_placeholders();
		this.shader = new Shader({
			glProgram: GlProgram.from({
				vertex: this.insert_constants(cell_vertex),
				fragment: this.insert_sampler(
					this.insert_constants(cell_fragment)
				),
			}),
			resources: {
				pipe_uniforms: this.pipe_uniforms.uniformStructures,
				texture_uniforms: new UniformGroup(
					{
						u_textures: {
							value: textures_indexes,
							type: "i32",
							size: textures_indexes.length,
						},
						u_texture_size: {
							value: textures_sizes,
							type: "vec4<f32>",
							size: textures_sizes.length,
						},
					},
					{ isStatic: true }
				),
			},
		});
	}
	load(renderer: Renderer) {
		(async () => {
			const gl_renderer = renderer as WebGLRenderer;

			this.textures = await gl_bind();
			this.bind(gl_renderer);
		})();
	}

	bind(gl_renderer: WebGLRenderer) {
		if (!this.textures) return;
		for (let i = 0; i < this.textures.length; i++) {
			gl_renderer.texture.bind(this.textures[i], i);
		}

		if (this.shader) {
			const buffer =
				this.shader.resources.texture_uniforms.uniforms.u_texture_size;

			for (let i = 0; i < this.textures.length; i++) {
				buffer[i * 4 + 0] = this.textures[i].width;
				buffer[i * 4 + 1] = this.textures[i].height;
				buffer[i * 4 + 2] = 1.0 / this.textures[i].width;
				buffer[i * 4 + 3] = 1.0 / this.textures[i].height;
			}

			this.shader.resources.texture_uniforms.update();
		}
	}

	insert_constants(src_shader: string) {
		const regex = new RegExp(`#define\\s+NB_TEXTURES\\s+\n`);
		const placeholders = gen_textures_info_placeholders();

		const nb_textures = placeholders[0].length;

		return src_shader.replace(
			regex,
			`#define NB_TEXTURES ${nb_textures}\n\n`
		);
	}

	insert_sampler(src_shader: string) {
		const regex = new RegExp(`#define\\s+SAMPLER_FN\\s+\n`);
		const placeholders = gen_textures_info_placeholders();

		const nb_textures = placeholders[0].length;

		const src: string[] = [];

		for (let i = 0; i < nb_textures; i++) {
			src.push(`if(idx == ${i}) return texture(u_textures[${i}],uv);`);
		}

		return src_shader.replace(
			regex,
			`
		vec4 SAMPLER_FN(int idx,vec2 uv) {
			${src.join("\n")}
			return texture(u_textures[0],uv);
		}
		`
		);
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
