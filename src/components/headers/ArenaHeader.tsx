import { A, useNavigate } from "@solidjs/router";
import HomeIcon from "@assets/icons/home.svg?component-solid";
import SettingsIcon from "@assets/icons/settings.svg?component-solid";
import UserIcon from "@assets/icons/user.svg?component-solid";
import { createSignal, Show } from "solid-js";

type InfoProps = {
	class: string;
};

function Info(props: InfoProps) {
	return (
		<div class={props.class}>
			<h2 class="tracking-[0.5rem] dm-sans-400">Cipherpool</h2>
		</div>
	);
}

function ArenaHeader() {
	const [confirmation, show_confirmation] = createSignal(false);
	const navigate = useNavigate();
	
	return (
		<header class="w-full grid grid-flow-row grid-cols-3">
			<Info class="col-span-2 p-4 bg-night-700 px-8" />
			<nav class="col-span-1 bg-moon p-4 flex justify-end gap-8 px-8">
				<Show when={confirmation()}
					fallback={
						<button title="Go to the home page"
							onclick={() => {
								show_confirmation(true);
							}}
						>
							<HomeIcon />
						</button>
					}
				>
				<div class="grow flex flex-row gap-4">					
					<span class="text-night-800 whitespace-nowrap select-none">
						Are you sure you want to leave the arena?
					</span>
					<button
						class="text-night-800 hover:underline hover:underline-offset-4"
						title="Go to the home page"
						onclick={() => {
							navigate('/');
						}}
					>
						yes
					</button>
					<p class="text-night-800 select-none">/</p>
					<button
						class="text-night-800 hover:underline hover:underline-offset-4"
						title="Stay here"
						onclick={() => {
							show_confirmation(false);
						}}
					>
						no
					</button>

				</div>
				
				</Show>
			</nav>
		</header>
	);
}

export default ArenaHeader;
