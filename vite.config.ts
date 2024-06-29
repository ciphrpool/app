import { defineConfig } from "vite";
import solid from "vite-plugin-solid";
import solid_svg from "vite-plugin-solid-svg";
import glsl from "vite-plugin-glsl";
import path from "path";

export default defineConfig({
	plugins: [
		solid(),
		solid_svg({
			defaultAsComponent: true,
		}),
		glsl(),
	],
	resolve: {
		alias: {
			"@": path.resolve(__dirname, "./src"),
			"@assets": path.resolve(__dirname, "./src/assets"),
			"@components": path.resolve(__dirname, "./src/components"),
			"@utils": path.resolve(__dirname, "./src/utils"),
		},
	},
});
