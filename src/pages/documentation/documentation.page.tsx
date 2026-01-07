import HomeHeader from "../../components/headers/HomeHeader";
import Footer from "@components/footers/DefaultFooter";
import Prism from "prismjs";
import {
	createEffect,
	createResource,
	createSignal,
	For,
	JSXElement,
	Match,
	onMount,
	Show,
	Switch,
} from "solid-js";
import { A, useNavigate, useParams } from "@solidjs/router";
import { debounce } from "@utils/time";

import DefaultHeader from "@components/headers/DefaultHeader";
import { useProtectedData } from "@utils/auth/auth.context";
import {
	Doc,
	docs,
	DocSelectorProvider,
	DocsSummary,
	MiniSearchResult,
	SearchDoc,
	searcher,
} from "@components/views/docs.view";

function DocumentationPage() {
	const is_authenticated = useProtectedData();
	const navigate = useNavigate();

	return (
		<div class="flex flex-col h-screen max-h-screen bg-night-600">
			<Show when={is_authenticated()} fallback={<DefaultHeader />}>
				<HomeHeader />
			</Show>

			<main class=" h-full justify-items-center p-4 dm-mono-medium flex-grow grid overflow-hidden">
				<div class="w-3/4 h-full grid grid-cols-3 gap-4  overflow-hidden ">
					<DocSelectorProvider
						with_navigation={true}
						default="stdlib"
					>
						<section class="border-4 border-night-400 bg-night-600 p-4 flex flex-col gap-4  overflow-hidden h-full">
							<SearchDoc
								with_navigation={true}
								close={() => navigate(-1)}
							/>
							<div class="w-full h-1 bg-night-400"></div>
							<DocsSummary with_navigation={true} />
						</section>
						<Doc with_navigation={true} />
					</DocSelectorProvider>
				</div>
			</main>
			<Footer />
		</div>
	);
}

export default DocumentationPage;
