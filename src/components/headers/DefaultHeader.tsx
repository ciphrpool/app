import { A } from "@solidjs/router";
import HomeIcon from "@assets/icons/home.svg?component-solid";
import SettingsIcon from "@assets/icons/settings.svg?component-solid";
import UserIcon from "@assets/icons/user.svg?component-solid";
import { signIn } from "@utils/auth/auth";

type InfoProps = {
	class: string;
};

function Info(props: InfoProps) {
	return (
		<div class={props.class}>
			<A href="/">
				<h2 class="uppercase font-semibold tracking-[0.5rem] dm-sans-400">
					Cipherpool
				</h2>
			</A>
		</div>
	);
}

function DefaultHeader() {
	return (
		<header class="w-full grid grid-flow-row grid-cols-3">
			<Info class="col-span-2 p-4 bg-night-700 px-8" />
			<nav class="col-span-1 bg-moon p-4 flex justify-end px-8 gap-4">
				<div class="flex flex-row gap-4 items-center text-night-900 select-none">
					<button
						class="text-night-900 hover:underline hover:underline-offset-4"
						onclick={async () => {
							await signIn();
						}}
					>
						Sign up
					</button>
					/
					<button
						class="text-night-900 hover:underline hover:underline-offset-4"
						onclick={async () => {
							await signIn();
						}}
					>
						Log in
					</button>
					<UserIcon class="w-8 h-8" />
				</div>
			</nav>
		</header>
	);
}

export default DefaultHeader;
