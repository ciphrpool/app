import HomeHeader from "../../components/headers/HomeHeader";
import Footer from "@components/footers/DefaultFooter";
import Todo from "@components/utils/Todo";

function WaitingPage() {
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
