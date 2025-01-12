import { A } from "@solidjs/router";

type InfoProps = {
	class: string;
};

function Info(props: InfoProps) {
	return (
		<div class={props.class}>
			<A href="/">
				<h2 class="uppercase font-semibold tracking-[0.5rem] dm-sans-400">Cipherpool</h2>
			</A>
		</div>
	);
}

function HomeHeader() {
	return (
		<header class="w-full grid grid-flow-row grid-cols-3">
			<Info class="col-span-2 p-4 bg-night-700 px-8" />
			<nav class="col-span-1 bg-moon dm-mono-medium text-night-800 p-4 flex gap-4 justify-between px-8">
				<A href="/leaderbord">Leaderboard</A>
				<A href="/tournaments">Tournaments</A>
				<A href="/docs">Docs</A>
			</nav>
		</header>
	);
}

export default HomeHeader;
