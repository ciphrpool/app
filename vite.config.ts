import { defineConfig } from "vite";
import solid from "vite-plugin-solid";
import solid_svg from "vite-plugin-solid-svg";
import glsl from "vite-plugin-glsl";
import path from "path";
import { ViteImageOptimizer } from "vite-plugin-image-optimizer";
import mdx from "@mdx-js/rollup";
import type { Plugin } from "vite";
import remarkGfm from "remark-gfm";
import rehypePrism from "rehype-prism-plus";
import rehypeRaw from "rehype-raw";

export default defineConfig({
	plugins: [
		solid(),
		mdx({
			jsxImportSource: "solid-jsx",
			remarkPlugins: [remarkGfm],
			rehypePlugins: [
				rehypeRaw,
				[rehypePrism, { ignoreMissing: true }], // ignoreMissing prevents errors for unknown languages
			],
		}),
		solid_svg({
			defaultAsComponent: true,
		}),
		glsl(),
		ViteImageOptimizer({
			test: /\.(jpe?g|png|gif|tiff|webp|svg|avif)$/i,
			includePublic: true,
		}),
		protobufPatch(),
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
		include: ["solid-js", "ts_textures"],
	},
});

function protobufPatch(): Plugin {
	return {
		name: "protobuf-patch",
		transform(code, id) {
			// https://github.com/protobufjs/protobuf.js/issues/1754
			if (id.endsWith("@protobufjs/inquire/index.js")) {
				return {
					code: code.replace(
						`eval("quire".replace(/^/,"re"))`,
						"require"
					),
					map: null,
				};
			}
		},
	};
}
