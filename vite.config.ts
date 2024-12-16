import { defineConfig } from "vite";
import solid from "vite-plugin-solid";
import solid_svg from "vite-plugin-solid-svg";
import glsl from "vite-plugin-glsl";
import path from "path";
import { ViteImageOptimizer } from "vite-plugin-image-optimizer";

export default defineConfig({
	plugins: [
		solid(),
		solid_svg({
			defaultAsComponent: true,
		}),
		glsl(),
		ViteImageOptimizer({
			test: /\.(jpe?g|png|gif|tiff|webp|svg|avif)$/i,
			includePublic: true,
		}),
	],
	resolve: {
		alias: {
			"@": path.resolve(__dirname, "./src"),
			"@assets": path.resolve(__dirname, "./src/assets"),
			"@components": path.resolve(__dirname, "./src/components"),
			"@utils": path.resolve(__dirname, "./src/utils"),
			ts_proto_api: path.resolve(__dirname, "./api-pool/ts_proto_api"),
		},
	},
	optimizeDeps: {
		include: ["ts_textures"],
	},
});
