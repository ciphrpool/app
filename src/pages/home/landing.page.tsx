import DefaultHeader from "@components/headers/DefaultHeader";
import Footer from "@components/footers/DefaultFooter";
import Todo from "@components/utils/Todo";
import { api, signIn } from "@utils/auth/auth";

function LandingPage() {
	return (
		<div class="flex flex-col h-screen max-h-screen bg-night-600">
			<DefaultHeader />
			<main class=" h-full justify-items-center p-4 dm-mono-medium flex-grow grid overflow-hidden">
				<Todo>
					Landing Page
					<button
						onclick={async () => {
							await signIn();
						}}
					>
						Log in
					</button>
				</Todo>
			</main>
			<Footer />
		</div>
	);
}

export default LandingPage;
