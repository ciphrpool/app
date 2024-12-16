import { JSXElement, onCleanup, onMount } from "solid-js";
import {
	GridContext,
	useCamera,
	useCanva,
	useContainer,
} from "./utils/context";
import { PanningHandler } from "./interaction/panning";
import { ZoomingHandler } from "./interaction/zooming";
import { Grid } from "./grid/grid";

type WireframeProps = {
	children?: JSXElement;
};

function Wireframe(props: WireframeProps) {
	const parent = useContainer();
	const camera = useCamera();

	const grid = new Grid({
		size: 32,
		frame_width: 32,
		camera,
	});

	onMount(() => {
		if (!parent) return;
		parent.addChild(grid);
	});

	onCleanup(() => {
		if (!parent) return;
		parent?.removeChild();
	});

	return (
		<GridContext.Provider value={grid}>
			{props.children}
		</GridContext.Provider>
	);
}

export default Wireframe;
