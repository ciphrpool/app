import { JSXElement, onMount } from "solid-js";
import Camera from "./interaction/Camera";
import Scene from "./Scene";
import Wireframe from "./Wireframe";

type PoolProps = {
	container_ref : HTMLDivElement
	children?: JSXElement;
};

function Pool(props: PoolProps) {

	return (
		<Scene resizeTo={props.container_ref}>
			<Camera>
				<Wireframe>
					{props.children}
				</Wireframe>
			</Camera>
		</Scene>
	);
}

export default Pool;
