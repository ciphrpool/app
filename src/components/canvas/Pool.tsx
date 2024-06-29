import { onMount } from "solid-js";
import Camera from "./Camera";
import Scene from "./Scene";
import Wireframe from "./Wireframe";

type PoolProps = {
	container_ref : HTMLDivElement
};

function Pool(props: PoolProps) {
	
	return (
		<Scene resizeTo={props.container_ref}>
			<Camera>
				<Wireframe></Wireframe>
			</Camera>
		</Scene>
	);
}

export default Pool;
