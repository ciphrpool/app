import HomeHeader from "../../components/headers/HomeHeader";
import Footer from "@components/footers/DefaultFooter";
import Todo from "@components/utils/Todo";
import { useNavigate } from "@solidjs/router";
import { onCleanup, onMount } from "solid-js";

function WaitingPage() {
	const navigate = useNavigate();
	onMount(() => {
		const interval = setInterval(async () => {
			const saved_duel_url = localStorage.getItem('duel_url');
			if (!saved_duel_url) return;

			localStorage.removeItem('duel_url');
			navigate(saved_duel_url);
		},1000);
		const timeout = setTimeout(()=> {
			clearInterval(interval);
		}, 10*1000);
		
		onCleanup(() => {
			clearInterval(interval);
			clearTimeout(timeout);
		});
	})
	return (
		<div class="flex flex-col h-screen max-h-screen bg-night-600">
			<HomeHeader />
			<main class=" h-full justify-items-center p-4 dm-mono-medium flex-grow grid overflow-hidden">
				<Todo dbg>Waiting Room coming soon...</Todo>
			</main>
			<Footer />
		</div>
	);
}

export default WaitingPage;
