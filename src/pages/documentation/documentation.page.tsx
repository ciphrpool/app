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
import { A, useParams } from "@solidjs/router";
import MiniSearch from "minisearch";
import { debounce } from "@utils/time";

import MDX_Ciphel from "./ciphel/ciphel.mdx";
import MDX_Basics from "./ciphel/basics.mdx";
import MDX_Expressions from "./ciphel/expressions.mdx";
import MDX_ControlFlow from "./ciphel/control_flow.mdx";
import MDX_Functions from "./ciphel/functions.mdx";
import MDX_Advanced from "./ciphel/advanced.mdx";
import MDX_Stdlib from "./ciphel/stdlib.mdx";
import DefaultHeader from "@components/headers/DefaultHeader";
import { useProtectedData } from "@utils/auth/auth.context";

const docs = [
	{
		url: "/documentation/ciphel",
		title: "The Ciphel Programming Language",
		overview: "",
		MDX: MDX_Ciphel,
		content: await import("./ciphel/ciphel.mdx?raw").then(
			(mod) => mod.default
		),
		subsections: [
			{
				title: "Basic Language Elements",
				content: await import("./ciphel/basics.mdx?raw").then(
					(mod) => mod.default
				),
				url: "/documentation/basics",
				overview: "",
				MDX: MDX_Basics,
			},
			{
				title: "Control Flow",
				content: await import("./ciphel/control_flow.mdx?raw").then(
					(mod) => mod.default
				),
				url: "/documentation/control_flow",
				overview: "",
				MDX: MDX_ControlFlow,
			},
			{
				title: "Expressions",
				content: await import("./ciphel/expressions.mdx?raw").then(
					(mod) => mod.default
				),
				url: "/documentation/expressions",
				overview: "",
				MDX: MDX_Expressions,
			},
			{
				title: "Functions",
				content: await import("./ciphel/functions.mdx?raw").then(
					(mod) => mod.default
				),
				url: "/documentation/functions",
				overview: "",
				MDX: MDX_Functions,
			},
			{
				title: "Advanced Concepts",
				content: await import("./ciphel/advanced.mdx?raw").then(
					(mod) => mod.default
				),
				url: "/documentation/advanced",
				overview: "",
				MDX: MDX_Advanced,
			},
			{
				title: "Standard Library",
				content: await import("./ciphel/stdlib.mdx?raw").then(
					(mod) => mod.default
				),
				url: "/documentation/stdlib",
				overview: "",
				MDX: MDX_Stdlib,
			},
		],
	},
];

let discarded = new Set(["and", "or", "to", "in", "a", "the", "is", "are"]);

type Result = {
	title: string;
	overview: string;
	url: string;
};

let searcher = new MiniSearch({
	fields: ["text"],
	storeFields: ["title", "overview", "url"],
	processTerm: (term, _fieldName) =>
		discarded.has(term) ? null : term.toLowerCase(),
});
searcher.addAll(
	docs
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

function DocumentationPage() {
	const params = useParams();
	const is_authenticated = useProtectedData();

	createEffect(() => {
		if (params.section) {
			Prism.highlightAll();
		}
	});

	const [search_input, update_search_input] = createSignal("");
	const [results, set_results] = createSignal<Result[]>([]);

	const debounced_call = debounce(async (value: string) => {
		if (!value || value.length <= 4) return;
		let results = searcher.search(value.toLocaleLowerCase(), {
			prefix: true,
			fuzzy: 0.2,
		});
		console.log(results);
		
		set_results(results as any[] as Result[]);
	}, 500);

	return (
		<div class="flex flex-col h-screen max-h-screen bg-night-600">
			<Show when={is_authenticated()} fallback={<DefaultHeader />}>
				<HomeHeader />
			</Show>
			
			<main class=" h-full justify-items-center p-4 dm-mono-medium flex-grow grid overflow-hidden">
				<div class="w-3/4 h-full grid grid-cols-3 gap-4  overflow-hidden ">
					<section class="border-4 border-night-400 p-4 flex flex-col gap-4  overflow-hidden h-full">
						<input
							class="placeholder:text-night-300 bg-night-800 
									outline-none px-4 py-2
									w-full"
							placeholder="Search documentation ..."
							autofocus
							value={search_input()}
							onInput={(e: InputEvent) => {
								if (!e.isTrusted) return;
								if (
									!(e.currentTarget as HTMLInputElement).value
								)
									return;
								const value = (
									e.currentTarget as HTMLInputElement
								).value;
								update_search_input(value);
								debounced_call(value);
							}}
						/>
						<div class="flex flex-col gap-4 overflow-y-auto">
							<Show when={results().length > 0}>
								<p class="text-night-200 text-sm">Found in ...</p>
							</Show>
							<For each={results()}>
								{(res) => {
									return (
										<A
											title="See this page"
											class="py-2 px-4 flex flex-col
												border-l-4 border-night-500
												bg-night-700
												items-start hover:border-night-200
												hover:transition-colors hover:duration-200
												hover:ease-in-out"
											href={res.url}
										>
											<h3 class="hover:text-pl1-200 transition-colors ease-in-out duration-200">
												{res.title}
											</h3>
											<p class="text-night-100 pl-4">
												{res.overview}
											</p>
										</A>
									);
								}}
							</For>
						</div>
						<div class="w-full h-1 bg-night-400"></div>
						{/* Summary */}
						<ol class="grow w-full list-decimal list-inside">
							<li>
								<For each={docs}>
									{(section) => {
										return (
											<>
												<A href={section.url} class="text-lg font-bold" title={section.overview}
												classList={{
													"text-ego":params.section === section.url.split("/").pop(),
												}}
												> {section.title}</A>
												<ul class="list-disc list-inside pl-8">
													<For each={section.subsections}>
														{(subsection) => 
															<li>
																<A href={subsection.url} 
																title={subsection.overview}
																classList={{
																	"text-ego":params.section === subsection.url.split("/").pop(),
																}}
																>{subsection.title}</A>
															</li>
														}
													</For>
												</ul>
											</>
										);
									}}
								</For>
							</li>
						</ol>
					</section>
					<section class="prose prose-invert p-4 col-span-2 bg-night-700 overflow-auto min-h-0"
						style={{"overflow":"auto"}}
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
								{(doc) => <Match
										when={doc.section === params.section}
									>
										<doc.Component />
									</Match>}
							</For>
						</Switch> 
					</section>
				</div>
			</main>
			<Footer />
		</div>
	);
}

export default DocumentationPage;
