import { useFault } from "@components/errors/fault";
import CarouselDetails from "@components/utils/carousel.details";
import { A } from "@solidjs/router";
import { api } from "@utils/auth/auth";
import { Match, Show, Switch } from "solid-js";

export const Friendly = Symbol("Friendly");
export const Ranked = Symbol("Ranked");
export const Tournaments = Symbol("Tournaments");
export type Te_DuelType = typeof Friendly | typeof Ranked | typeof Tournaments;

export type DuelPreview = {
	opponent_username: string;
	opponent_tag: string;
	opponent_elo: number;
	duel_type: Te_DuelType;
};

interface DuelPreviewProps {
	duel_preview: DuelPreview;
}

function DuelPreview(props: DuelPreviewProps) {
	return (
		<Switch fallback={<div>Not Found</div>}>
			{/* Friendly duel */}
			<Match when={props.duel_preview.duel_type === Friendly}>
				Friendly duel against {props.duel_preview.opponent_username} |
				{props.duel_preview.opponent_elo} !
			</Match>
			{/* Ranked duel */}
			<Match when={props.duel_preview.duel_type === Ranked}>
				Ranked duel against {props.duel_preview.opponent_username}|
				{props.duel_preview.opponent_elo} !
			</Match>
			{/* Tournament duel */}
			<Match when={props.duel_preview.duel_type === Tournaments}>
				Tournament duel against {props.duel_preview.opponent_username}|
				{props.duel_preview.opponent_elo} !
			</Match>
		</Switch>
	);
}

interface StartViewProps {
	default_open_index?: number;
	duel_preview?: DuelPreview;
}

function StartView(props: StartViewProps) {
	const fault = useFault();

	return (
		<section class="grow h-1/3 max-h-1/2 bg-moon text-night-800 p-4">
			{/* Duel */}
			<div class="flex flex-col">
				<CarouselDetails
					default_open_index={props.default_open_index ?? 0}
					always_open
				>
					<div class="overflow-hidden">
						<details class="cursor-pointer on ">
							<summary class="block select-none text-xl tracking-widest text-night-800 transition-colors  list-none">
								&gt&gt Duel
							</summary>
							<div class="w-full flex flex-col py-4">
								<Show
									when={
										props.duel_preview &&
										props.duel_preview.duel_type ===
											Friendly
									}
								>
									<DuelPreview
										duel_preview={props.duel_preview!}
									/>
								</Show>
								<button
									title="Start a duel"
									class="bg-pl2-600 self-center-center text-moon py-2 px-16"
									onclick={async () => {
										switch (props.duel_preview?.duel_type) {
											case Friendly:
												try {
													await api.post(
														"/duel/friendly/challenge",
														{
															opponent_tag:
																props
																	.duel_preview
																	.opponent_tag,
														}
													);
												} catch (error) {
													fault.major({
														message: `Error while challenging ${props.duel_preview.opponent_username} to a friendly duel`,
													});
												}
												break;
											case Ranked:
												break;
											default:
												break;
										}
									}}
								>
									RUN
								</button>
							</div>
						</details>
					</div>
					<div class="overflow-hidden">
						<details class="cursor-pointer ">
							<summary class="block select-none text-xl tracking-widest text-night-800 transition-colors  list-none">
								&gt&gt Arena
							</summary>
							<div class="w-full flex flex-col py-4 gap-4">
								<p class="text-night-700">
									Play solo to improve your skills !
								</p>
								<A
									title="Start an arena"
									href="/arena"
									class="bg-pl1-600 text-center self-center-center text-moon py-2 px-16"
								>
									RUN
								</A>
							</div>
						</details>
					</div>
					<div class="overflow-hidden">
						<details class="cursor-pointer ">
							<summary class="block select-none text-xl tracking-widest text-night-800 transition-colors  list-none">
								&gt&gt Tournament
							</summary>
							<div class="w-full flex flex-col py-4">
								<Show
									when={
										props.duel_preview &&
										props.duel_preview.duel_type ===
											Tournaments
									}
								>
									<DuelPreview
										duel_preview={props.duel_preview!}
									/>
								</Show>
								<button
									title="Start a duel in this tournament"
									class="bg-ego-dark self-center-center text-moon py-2 px-16"
								>
									RUN
								</button>
							</div>
						</details>
					</div>
				</CarouselDetails>
			</div>
		</section>
	);
}

export default StartView;
