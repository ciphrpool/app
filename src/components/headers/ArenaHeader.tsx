import { A } from "@solidjs/router";
import HomeIcon from "@assets/icons/home.svg?component-solid";
import SettingsIcon from "@assets/icons/settings.svg?component-solid";
import UserIcon from "@assets/icons/user.svg?component-solid";

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
	return (
		<header class="w-full grid grid-flow-row grid-cols-3">
			<Info class="col-span-2 p-4 bg-night-700 px-8" />
			<nav class="col-span-1 bg-moon p-4 flex justify-end gap-8 px-8">
				<A href="/">
					<HomeIcon />
				</A>
			</nav>
		</header>
	);
}

export default ArenaHeader;
