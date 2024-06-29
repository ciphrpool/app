import { onCleanup, onMount } from "solid-js";
import { useCamera, useCanva, useContainer } from "./context";
import { Grid, init_grid_render_pipeline } from "./wireframe.utils";
import { PanningHandler } from "./interaction/panning";
import { ZoomingHandler } from "./interaction/zooming";

type WireframeProps = {};

function Wireframe(props: WireframeProps) {
	const parent = useContainer();
	const app = useCanva();
	const camera = useCamera();


	const grid = new Grid({
		size: 32,
		cell_width : 32,
		camera,
	});

	onMount(() => {
		if (!parent) return;
		parent.addChild(grid);

		// let t = 0;
		app?.ticker.add((time) => {
			// t+= time.deltaTime;
			// grid.global_zoom_offset += 0.001;
			// grid.global_y_offset = 30*Math.cos(0.05*(t + time.deltaTime));
			// grid.global_x_offset +=time.deltaTime;
		});
	});

	onCleanup(() => {
		if (!parent) return;
		parent?.removeChild();
	});

	return <></>;
}

export default Wireframe;
