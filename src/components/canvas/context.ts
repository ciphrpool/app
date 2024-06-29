import { Application, Container } from "pixi.js";
import { createContext, useContext } from "solid-js";
import { CameraHandler } from "./Camera";

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