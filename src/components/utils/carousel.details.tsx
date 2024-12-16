import { children, createSignal, For, JSX } from "solid-js";

interface CarouselDetailsProps {
	children: JSX.Element;
	default_open_index?: number;
	on_open?: (index: number) => void;
	always_open?: boolean;
}

function CarouselDetails(props: CarouselDetailsProps) {
	const resolved = children(() => props.children);

	const [current_open_index, set_current_open_index] = createSignal<
		number | null
	>(props.default_open_index ?? 0);
	const all_details = resolved.toArray().filter(Boolean) as HTMLDivElement[];

	return (
		<For each={all_details}>
			{(child, index) => {
				if (!child) return;
				const div_block = child as HTMLDivElement;

				const details = div_block.children[0] as HTMLDetailsElement;
				details.ontoggle = (e) => {
					if (!e.isTrusted) return;
					if ((e as ToggleEvent).newState === "open") {
						set_current_open_index(index());
						props.on_open?.(index());
						// close all the other details
						for (let j = 0; j < all_details.length; j++) {
							if (j !== index()) {
								(
									all_details[j]
										.children[0] as HTMLDetailsElement
								).open = false;
							}
						}
					} else {
						set_current_open_index(null);
					}

					if (
						props.always_open &&
						all_details.every(
							(c) =>
								(c.children[0] as HTMLDetailsElement).open ===
								false
						)
					) {
						(
							all_details[props.default_open_index ?? 0]
								.children[0] as HTMLDetailsElement
						).open = true;
						set_current_open_index(props.default_open_index ?? 0);
					}
				};
				details.open = index() === current_open_index();
				return child;
			}}
		</For>
	);
}

export default CarouselDetails;
