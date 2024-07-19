import { Application, Container } from "pixi.js";
import { createContext, useContext } from "solid-js";
import { CameraHandler } from "../interaction/Camera";
import { Grid } from "../grid/grid";

export const CanvaContext = createContext<Application>();
// export const useCanva = () => useContext(CanvaContext);
export function useCanva<T = Application>() {
	return useContext(CanvaContext) as T;
}

export const ContainerContext = createContext<Container>();
export function useContainer<T = Container>() {
	return useContext(ContainerContext) as T;
}


export const CameraContext = createContext<CameraHandler>();
export function useCamera<T = CameraHandler>() {
	return useContext(CameraContext) as T;
}


export const GridContext = createContext<Grid>();
export function useGrid<T = Grid>() {
	return useContext(GridContext) as T;
}