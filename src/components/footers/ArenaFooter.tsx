import { A } from "@solidjs/router";
import { createSignal, Show } from "solid-js";
import { Portal } from "solid-js/web";
import DocsView from "@components/views/docs.view";

function ArenaFooter() {
	const [is_docs_open, toggle_docs] = createSignal(false);
	return (
		<footer class="w-full bg-night-700 flex justify-center py-1 px-8">
			<ul class="flex p-0 m-0 list-none gap-4">
				<li class="mx-8">
					<button
						onclick={() => {
							toggle_docs(true);
						}}
					>
						Documentation
						<Show when={is_docs_open()}>
							<Portal>
								<section class="z-50 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-3/4 w-3/4 flex flex-col gap-4">
									<DocsView
										close={() => {
											toggle_docs(false);
										}}
									/>
								</section>
							</Portal>
						</Show>
					</button>
				</li>
				<li class="mx-8">
					<button>Help</button>
				</li>
			</ul>
		</footer>
	);
}

export default ArenaFooter;
