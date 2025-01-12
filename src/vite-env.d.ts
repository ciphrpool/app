/// <reference types="vite/client" />
declare module "*.mdx" {
	import type { Component } from "solid-js";
	const component: Component;
	export default component;
}
