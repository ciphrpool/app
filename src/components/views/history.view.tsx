import { useFault } from "@components/errors/fault";
import { createInfiniteScroll } from "@solid-primitives/pagination";
import { useNavigate } from "@solidjs/router";
import { DuelHistoryResult, DuelHistoryRow } from "@utils/api.type";
import { api } from "@utils/auth/auth";
import {
	batch,
	createComputed,
	createResource,
	createSignal,
	For,
	Match,
	onCleanup,
	onMount,
	Show,
	Switch,
} from "solid-js";

interface HistoryViewProps {
	full?: boolean;
	against?: {
		username: string;
		tag: string;
	};
}

function HistoryView(props: HistoryViewProps) {
	const fault = useFault();
	const navigate = useNavigate();
	const [cursor, setCursor] = createSignal("");
	const [end, set_end] = createSignal(false);
	const [duels, set_duels] = createSignal<DuelHistoryRow[]>([]);
	const [page, { refetch }] = createResource(async () => {
		try {
			const res = await api.get("/duel/history", {
				params: {
					limit: props.full ? 5 : 10,
					tag: props.against?.tag,
					cursor: cursor(),
				},
			});
			const data: DuelHistoryResult = res.data;

			setCursor(data.nextCursor);
			if (!data.hasMore) {
				set_end(true);
			}
			return data.duels;
		} catch (error) {
			fault.major({ message: "Failed to retrieve duel history" });
			return [];
		}
	});
	createComputed(() => {
		const content = page.latest;
		if (!content) return;
		batch(() => {
			if (content.length === 0) set_end(true);
			set_duels((p) => [...p, ...content]);
		});
	});

	let observer_target: HTMLButtonElement | undefined;
	onMount(() => {
		const observer = new IntersectionObserver((entries) => {
			if (entries[0].isIntersecting && cursor()) {
				refetch();
			}
		});
		if (observer_target) {
			observer.observe(observer_target);
		}
		onCleanup(() => observer.disconnect());
	});

	return (
		<section class="grow border-4 border-night-400 p-4 overflow-hidden select-none">
			{/* History */}
			<div class="block select-none text-xl tracking-widest text-night-100">
				{">>"} Duel History{" "}
				{props.against ? "against " + props.against.username : ""}
			</div>

			<div class="max-h-p95 max-w-full overflow-y-auto overflow-x-hidden">
				<table class="w-full text-sm text-night-100">
					<thead class="sticky top-0 bg-night-700">
						<Show
							when={props.full}
							fallback={
								<tr class="text-xs uppercase tracking-wider">
									<th class="px-8 py-4 text-left">Result</th>
									<th class="px-8 py-4 text-left">Date</th>
								</tr>
							}
						>
							<tr class="text-xs uppercase tracking-wider">
								<th class="px-8 py-4 text-left">VS</th>
								<th class="px-8 py-4 text-left">Result</th>
								<th class="px-8 py-4 text-left">Type</th>
								<th class="px-8 py-4 text-left">Date</th>
							</tr>
						</Show>
					</thead>
					<tbody class="divide-y  divide-night-800">
						<For each={duels()}>
							{(duel) => (
								<tr
									class="hover:bg-night-600 hover:text-moon transition-bg ease-in-out"
									onclick={() => {
										navigate(
											`/duel/history/${duel.sessionId}`
										);
									}}
								>
									<Show when={props.full}>
										<td class="px-8 py-4 hover:text-pl1-200 transition-colors ease-in-out">
											<Switch>
												<Match when={duel.isP1}>
													<span
														title={
															"tag = #" +
															duel.p2Tag +
															", elo :" +
															duel.p2Elo
														}
														class="select-none"
													>
														{duel.p2Username}
													</span>
												</Match>
												<Match when={!duel.isP1}>
													<span
														title={
															"tag = #" +
															duel.p1Tag +
															", elo :" +
															duel.p1Elo
														}
														class="select-none"
													>
														{duel.p1Username}
													</span>
												</Match>
											</Switch>
										</td>
									</Show>
									<td class="px-8 py-4 hover:text-pl1-200 transition-colors ease-in-out">
										<Switch>
											<Match
												when={
													duel.isP1 &&
													duel.duelOutcome ===
														"P1_WON"
												}
											>
												W
											</Match>
											<Match
												when={
													duel.isP1 &&
													duel.duelOutcome ===
														"P2_WON"
												}
											>
												L
											</Match>
											<Match
												when={
													!duel.isP1 &&
													duel.duelOutcome ===
														"P1_WON"
												}
											>
												L
											</Match>
											<Match
												when={
													!duel.isP1 &&
													duel.duelOutcome ===
														"P2_WON"
												}
											>
												W
											</Match>
											<Match
												when={
													duel.duelOutcome === "draw"
												}
											>
												=
											</Match>
										</Switch>
									</td>
									<Show when={props.full}>
										<td class="px-8 py-4 hover:text-pl1-200 transition-colors ease-in-out">
											{duel.duelType}
										</td>
									</Show>
									<td class="px-8 py-4 hover:text-pl1-200 transition-colors ease-in-out">
										{new Date(
											duel.date
										).toLocaleDateString()}
									</td>
								</tr>
							)}
						</For>
					</tbody>
				</table>
				<Show when={!end()}>
					<button
						ref={observer_target}
						title="Load more duels from history"
						class="w-full py-2 text-night-100 hover:text-moon"
					>
						more duels...{end().toString()}
					</button>
				</Show>
			</div>
		</section>
	);
}

export default HistoryView;
