import { JSXElement, onCleanup, onMount, splitProps } from "solid-js";
import { CameraContext, ContainerContext, useCanva, useContainer } from "./context";
import { Grid, init_grid_render_pipeline } from "./wireframe.utils";
import { PanningHandler } from "./interaction/panning";
import { ZoomingHandler } from "./interaction/zooming";
import { Container } from "pixi.js";
export class CameraHandler {
    panning_handler:PanningHandler;
    zooming_handler:ZoomingHandler;

    constructor(camera:Container) {
        this.panning_handler = new PanningHandler();
        this.zooming_handler = new ZoomingHandler();
        this.zooming_handler.restrain(this.panning_handler);
        this.zooming_handler.subscribe(camera,{
            on_start : (zoom,position) => {
                this.panning_handler.focus(position,zoom);
            }
        });
        this.panning_handler.subscribe(camera);
    }
    pin(grid:Grid) {
        this.panning_handler.pin(grid);
        this.zooming_handler.pin(grid);
    }
}

type CameraProps = {
	children?: JSXElement;
};

function Camera(props: CameraProps) {
	const parent = useContainer();
	const app = useCanva();
    const camera = new Container();
    
    camera.eventMode = "static";
    
    camera.width = app.screen.width;
    camera.height = app.screen.height;
    camera.x = 0;
    camera.y = 0;
    
    const camera_handler = new CameraHandler(camera);
    
	onMount(() => {
		if (!parent) return;
		parent.addChild(camera);
	});
	onCleanup(() => {
		if (!parent) return;
		parent?.removeChild();
	});

	return <ContainerContext.Provider value={camera}>
        <CameraContext.Provider value={camera_handler}>
            {props.children}
        </CameraContext.Provider>
    </ContainerContext.Provider>;
}

export default Camera;