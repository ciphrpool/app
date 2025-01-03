import Header from "@components/headers/HomeHeader";
import Footer from "@components/footers/DefaultFooter";
import { DuelResultView } from "@components/views/duel_result.view";
import { useParams } from "@solidjs/router";

function DuelResultPage() {
	const params = useParams();
	
	return (
		<div class="flex flex-col h-screen max-h-screen">
			<Header />
			<main class="flex-grow w-full overflow-hidden grid-flow-row bg-night-600 ">
				<DuelResultView duel_session_id={params.duel_session_id}/>
			</main>
			<Footer />
		</div>
	);
}

export default DuelResultPage;
