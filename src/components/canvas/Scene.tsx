import {
	JSXElement,
	Show,
	Suspense,
	createContext,
	createEffect,
	createResource,
	onCleanup,
	onMount,
	splitProps,
	useContext,
} from "solid-js";
import {
	Application,
	ApplicationOptions,
	Assets,
	Container,
	Filter,
	Geometry,
	GlProgram,
	Mesh,
	Shader,
} from "pixi.js";
import { CanvaContext, ContainerContext } from "./context";
import { init_grid_render_pipeline } from "./wireframe.utils";
import { manifest } from "./textures_bundle";

type SceneProps = {
	children?: JSXElement;
	fallback?: JSXElement;
} & Partial<ApplicationOptions>;

const DEFAULT_CONFIG = {
	backgroundColor: "#1F1F1F",
	eventMode: "static",
	eventFeatures: {
		click: true,
		globalMove: false,
		move: true,
		wheel: true,
	},
	// width: 512,
	// height: 512,
	antialias: true,
} as ApplicationOptions;

function Scene(props: SceneProps) {
	const [local, others] = splitProps(props, ["children", "fallback"]);

	const [get_app] = createResource([others], async ([config]) => {
		const app = new Application();
		init_grid_render_pipeline();
		
		await app.init({ ...DEFAULT_CONFIG, ...config });
		await Assets.init({manifest: manifest});
		Assets.backgroundLoadBundle(['cursors']);
		return app;
	});

	onMount(()=> {
		const app = get_app();
		if (!app) return;
		app.resize()
	})

	createEffect(() => {
		const app = get_app();
		if (!app) return;
	});

	onCleanup(() => {
		const app = get_app();
		if (!app) return;
		app.destroy(true, { children: true, texture: true });
	});

	return (
		<Suspense fallback={local.fallback}>
			<Show when={get_app()}>
				{(get_app) => {
					const app = get_app();
					return (
						<CanvaContext.Provider value={app}>
							<ContainerContext.Provider value={app.stage}>
								{local.children}
							</ContainerContext.Provider>
							{app.canvas}
						</CanvaContext.Provider>
					);
				}}
			</Show>
		</Suspense>
	);
}

export default Scene;
