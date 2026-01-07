import {
	createContext,
	createEffect,
	createSignal,
	For,
	JSXElement,
	Match,
	onMount,
	Show,
	Switch,
	useContext,
} from "solid-js";

import MDX_Ciphel from "@assets/docs/ciphel/ciphel.mdx";
import MDX_Basics from "@assets/docs/ciphel/basics.mdx";
import MDX_Expressions from "@assets/docs/ciphel/expressions.mdx";
import MDX_ControlFlow from "@assets/docs/ciphel/control_flow.mdx";
import MDX_Functions from "@assets/docs/ciphel/functions.mdx";
import MDX_Advanced from "@assets/docs/ciphel/advanced.mdx";
import MDX_Stdlib from "@assets/docs/ciphel/stdlib.mdx";
import MDX_Modules from "@assets/docs/ciphel/modules.mdx";

import MDX_Binaries from "@assets/docs/cipherpool/binaries.mdx";
import MDX_Data from "@assets/docs/cipherpool/data.mdx";
import MDX_Machines from "@assets/docs/cipherpool/machines.mdx";
import MDX_Mechanics from "@assets/docs/cipherpool/mechanics.mdx";
import MDX_Universe from "@assets/docs/cipherpool/universe.mdx";

import MiniSearch from "minisearch";
import { debounce } from "@utils/time";
import { useNavigate, useParams } from "@solidjs/router";
import BackButton from "@components/utils/back.button";
import Prism from "prismjs";

export const docs = [
	{
		url: "/documentation/ciphel",
		title: "The Ciphel Programming Language",
		overview: "",
		MDX: MDX_Ciphel,
		content: import("@assets/docs/ciphel/ciphel.mdx?raw").then(
			(mod) => mod.default
		),
		subsections: [
			{
				title: "Basic Language Elements",
				content: import("@assets/docs/ciphel/basics.mdx?raw").then(
					(mod) => mod.default
				),
				url: "/documentation/basics",
				overview: "",
				MDX: MDX_Basics,
			},
			{
				title: "Control Flow",
				content: import(
					"@assets/docs/ciphel/control_flow.mdx?raw"
				).then((mod) => mod.default),
				url: "/documentation/control_flow",
				overview: "",
				MDX: MDX_ControlFlow,
			},
			{
				title: "Expressions",
				content: import("@assets/docs/ciphel/expressions.mdx?raw").then(
					(mod) => mod.default
				),
				url: "/documentation/expressions",
				overview: "",
				MDX: MDX_Expressions,
			},
			{
				title: "Functions",
				content: import("@assets/docs/ciphel/functions.mdx?raw").then(
					(mod) => mod.default
				),
				url: "/documentation/functions",
				overview: "",
				MDX: MDX_Functions,
			},
			{
				title: "Advanced Concepts",
				content: import("@assets/docs/ciphel/advanced.mdx?raw").then(
					(mod) => mod.default
				),
				url: "/documentation/advanced",
				overview: "",
				MDX: MDX_Advanced,
			},
			{
				title: "Modules",
				content: import("@assets/docs/ciphel/modules.mdx?raw").then(
					(mod) => mod.default
				),
				url: "/documentation/modules",
				overview: "",
				MDX: MDX_Modules,
			},
			{
				title: "Standard Library",
				content: import("@assets/docs/ciphel/stdlib.mdx?raw").then(
					(mod) => mod.default
				),
				url: "/documentation/stdlib",
				overview: "",
				MDX: MDX_Stdlib,
			},
		],
	},
	{
		url: "/documentation/cipherpool",
		title: "Cipherpool",
		overview: "",
		MDX: MDX_Universe,
		content: import("@assets/docs/cipherpool/universe.mdx?raw").then(
			(mod) => mod.default
		),
		subsections: [
			{
				title: "Data & Consciousness",
				content: import("@assets/docs/cipherpool/data.mdx?raw").then(
					(mod) => mod.default
				),
				url: "/documentation/data",
				overview: "",
				MDX: MDX_Data,
			},
			{
				title: "Game Mechanics",
				content: import(
					"@assets/docs/cipherpool/mechanics.mdx?raw"
				).then((mod) => mod.default),
				url: "/documentation/mechanics",
				overview: "",
				MDX: MDX_Mechanics,
			},
			{
				title: "Machines & Grid Control",
				content: import(
					"@assets/docs/cipherpool/machines.mdx?raw"
				).then((mod) => mod.default),
				url: "/documentation/machines",
				overview: "",
				MDX: MDX_Machines,
			},
			{
				title: "Binary System",
				content: import(
					"@assets/docs/cipherpool/binaries.mdx?raw"
				).then((mod) => mod.default),
				url: "/documentation/binaries",
				overview: "",
				MDX: MDX_Binaries,
			},
		],
	},
];

let discarded = new Set(["and", "or", "to", "in", "a", "the", "is", "are"]);

export type MiniSearchResult = {
	title: string;
	overview: string;
	url: string;
};

export const searcher = new MiniSearch({
	fields: ["text"],
	storeFields: ["title", "overview", "url"],
	processTerm: (term, _fieldName) =>
		discarded.has(term) ? null : term.toLowerCase(),
});

(async () => {
	const awaited_docs = await Promise.all(
		docs.map(async (doc) => {
			// Resolve the main content
			const resolvedContent = await doc.content;

			// Resolve all subsection content
			const resolvedSubsections = await Promise.all(
				doc.subsections.map(async (subsection) => ({
					...subsection,
					content: await subsection.content,
				}))
			);

			return {
				...doc,
				content: resolvedContent,
				subsections: resolvedSubsections,
			};
		})
	);

	searcher.addAll(
		awaited_docs
			.flatMap((doc) => [
				{
					id: 0,
					title: doc.title,
					text: doc.content,
					url: doc.url,
					overview: doc.overview,
				},
				...doc.subsections.map((subsection) => ({
					id: 0,
					title: subsection.title,
					text: subsection.content,
					url: subsection.url,
					overview: subsection.overview,
				})),
			])
			.map((d, i) => {
				d.id = i;
				return d;
			})
	);
})();

interface SearchDocProps {
	close: () => void;
	with_navigation?: boolean;
}

export function SearchDoc(props: SearchDocProps) {
	const selector = useDocSelector();
	const [search_input, update_search_input] = createSignal("");
	const [results, set_results] = createSignal<MiniSearchResult[]>([]);
	const navigate = useNavigate();

	const debounced_call = debounce(async (value: string) => {
		if (!value || value.length <= 4) return;
		let results = searcher.search(value.toLocaleLowerCase(), {
			prefix: true,
			fuzzy: 0.2,
		});
		set_results(results as any[] as MiniSearchResult[]);
	}, 500);

	return (
		<>
			<div class="flex flex-row gap-4 items-center">
				<button
					title="Close the documention"
					class="w-fit text-nowrap h-full border-4 text-night-100 border-night-200 px-2 hover:text-moon hover:border-moon"
					onclick={() => props.close()}
				>
					cd ..
				</button>
				<input
					class="placeholder:text-night-300 bg-night-800 
                    outline-none px-4 py-2
                    w-full"
					placeholder="Search documentation ..."
					autofocus
					value={search_input()}
					onInput={(e: InputEvent) => {
						if (!e.isTrusted) return;
						if (!(e.currentTarget as HTMLInputElement).value)
							return;
						const value = (e.currentTarget as HTMLInputElement)
							.value;

						update_search_input(value);
						debounced_call(value);
					}}
				/>
			</div>
			<div class="flex flex-col gap-4 overflow-y-auto">
				<Show when={results().length > 0}>
					<div class="flex flex-row justify-between">
						<p class="text-night-200 text-sm">Found in ...</p>
						<button
							title="clear search bar"
							onclick={() => {
								update_search_input("");
								set_results([]);
							}}
							class="select-none hover:underline hover:underline-offset-4 hover:text-ego"
						>
							X
						</button>
					</div>
				</Show>
				<For each={results()}>
					{(res) => {
						return (
							<button
								title="See this page"
								class="py-2 px-4 flex flex-col
                            border-l-4 border-night-500
                            bg-night-700
                            items-start hover:border-night-200
                            hover:transition-colors hover:duration-200
                            hover:ease-in-out"
								onclick={() => {
									if (props.with_navigation) {
										navigate(res.url);
									} else {
										selector.set_section(
											res.url.split("/").pop() ?? ""
										);
									}
								}}
							>
								<h3 class="hover:text-pl1-200 transition-colors ease-in-out duration-200">
									{res.title}
								</h3>
								<p class="text-night-100 pl-4">
									{res.overview}
								</p>
							</button>
						);
					}}
				</For>
			</div>
		</>
	);
}

export interface DocsSummaryProps {
	with_navigation?: boolean;
}

export function DocsSummary(props: DocsSummaryProps) {
	const selector = useDocSelector();
	const navigate = useNavigate();
	return (
		<ol class="grow w-full list-decimal list-inside">
			<For each={docs}>
				{(section) => {
					return (
						<li>
							<button
								onclick={() => {
									if (props.with_navigation) {
										navigate(section.url);
									} else {
										selector.set_section(
											section.url.split("/").pop() ?? ""
										);
									}
								}}
								class="text-lg font-bold"
								title={section.overview}
								classList={{
									"text-ego":
										selector.section() ===
										section.url.split("/").pop(),
								}}
							>
								{" "}
								{section.title}
							</button>
							<ul class="list-disc list-inside pl-8">
								<For each={section.subsections}>
									{(subsection) => (
										<li>
											<button
												onclick={() => {
													if (props.with_navigation) {
														navigate(
															subsection.url
														);
													} else {
														selector.set_section(
															subsection.url
																.split("/")
																.pop() ?? ""
														);
													}
												}}
												title={subsection.overview}
												classList={{
													"text-ego":
														selector.section() ===
														subsection.url
															.split("/")
															.pop(),
												}}
											>
												{subsection.title}
											</button>
										</li>
									)}
								</For>
							</ul>
						</li>
					);
				}}
			</For>
		</ol>
	);
}
interface DocSelectorProviderProps {
	with_navigation?: boolean;
	children?: JSXElement;
	default: string;
}

type DocSelector = {
	section: () => string;
	set_section: (section: string) => void;
};
const DocSelectorContext = createContext<DocSelector>();
function useDocSelector<T = DocSelector>() {
	return useContext(DocSelectorContext) as T;
}
export function DocSelectorProvider(props: DocSelectorProviderProps) {
	let selector: DocSelector;
	if (props.with_navigation) {
		const params = useParams();
		selector = {
			section() {
				return params.section;
			},
			set_section(section) {
				return;
			},
		};
	} else {
		const [section, set_section] = createSignal<string>(props.default);
		selector = {
			section() {
				return section();
			},
			set_section(section) {
				if (section.length === 0) {
					set_section(props.default);
				} else {
					set_section(section);
				}
			},
		};
	}

	return (
		<DocSelectorContext.Provider value={selector}>
			{props.children}
		</DocSelectorContext.Provider>
	);
}

interface DocProps {
	with_navigation?: boolean;
}

export function Doc(props: DocProps) {
	const selector = useDocSelector();

	createEffect(() => {
		if (selector.section()) {
			Prism.highlightAll();
		}
	});

	return (
		<section
			class="prose prose-invert p-4 col-span-2 bg-night-700 overflow-auto min-h-0"
			style={{ overflow: "auto" }}
		>
			<Switch fallback={docs[0].MDX({})}>
				<For
					each={docs.flatMap((section) => [
						{
							section: section.url.split("/").pop(),
							Component: section.MDX,
						},
						...section.subsections.map((subsection) => ({
							section: subsection.url.split("/").pop(),
							Component: subsection.MDX,
						})),
					])}
				>
					{(doc) => (
						<Match when={doc.section === selector.section()}>
							<doc.Component />
						</Match>
					)}
				</For>
			</Switch>
		</section>
	);
}

interface DocsViewProps {
	close: () => void;
}

function DocsView(props: DocsViewProps) {
	return (
		<section class="w-full h-full bg-night-700 grid grid-cols-3 gap-4">
			<DocSelectorProvider with_navigation={false} default="stdlib">
				<section class="border-4 border-night-400 bg-night-600 p-4 flex flex-col gap-4  overflow-hidden h-full">
					<SearchDoc close={props.close} />
					<div class="w-full h-1 bg-night-400"></div>
					<DocsSummary />
				</section>
				<Doc />
			</DocSelectorProvider>
		</section>
	);
}

export default DocsView;
