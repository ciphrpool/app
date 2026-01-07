import { Assets } from "pixi.js";
import { manifest } from "ts_textures";

export function gen_textures_info_placeholders(): [number[], number[]] {
	const texturs_aliases = manifest.bundles.flatMap((bundle) => {
		return bundle.assets.map(({ alias }) => {
			return alias;
		});
	});
	const textures_indexes = texturs_aliases.map((_, i) => i);
	const textures_sizes = texturs_aliases.flatMap((_) => [
		32,
		32,
		1 / 32,
		1 / 32,
	]);
	return [textures_indexes, textures_sizes];
}

export async function gl_bind() {
	const bundle_promises = manifest.bundles.map(async (bundle) => {
		const textures = await Assets.loadBundle(bundle.name);
		return bundle.assets.map(({ alias }) => {
			return textures[alias];
		});
	});

	const results = await Promise.all(bundle_promises);

	const flattened_results = results.flat();

	return flattened_results;
}
