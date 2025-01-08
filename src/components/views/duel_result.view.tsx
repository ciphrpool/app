import { useFault } from "@components/errors/fault";
import Avatar from "@components/utils/avatar";
import { DuelResultData, WinningMethod } from "@utils/api.type";
import { api } from "@utils/auth/auth";
import { format_time_min } from "@utils/time";
import { AxiosError } from "axios";
import {
	createResource,
	JSXElement,
	Match,
	Show,
	Suspense,
	Switch,
} from "solid-js";
import ClockIcon from "@assets/icons/clock.svg";
import EnergyIcon from "@assets/icons/energy.svg";
import EgoIcon from "@assets/icons/ego";
import CorruptedDataIcon from "@assets/icons/corrupted_data.svg";
import EmotionalDataIcon from "@assets/icons/emotional_data.svg";
import LogicalDataIcon from "@assets/icons/logical_data.svg";
import QuantumIcon from "@assets/icons/quantum_data.svg";
import { P1, P2, Te_Player } from "@utils/player.type";
import { A } from "@solidjs/router";

function format_winning_method(winning_method: WinningMethod) {
	switch (winning_method) {
		case "draw":
			return "draw";
		case "ego":
			return "most ego claimed";
		case "forfeit":
			return "forfeit";
		case "neuron":
			return "neuron taken";
		default:
			break;
	}
}

interface PlayerStatisticProps {
	username: string;
	EgoCount: number;
	Energy: number;
	CorruptedData: number;
	EmotionalData: number;
	QuantumData: number;
	LogicalData: number;
	player: Te_Player;
}

function PlayerStatistic(props: PlayerStatisticProps) {
	return (
		<div class="flex flex-col gap-4 select-none">
			<span class="text-xl tracking-widest ">
				&gt&gt {props.username} statistics
			</span>
			<ul class="flex flex-col gap-4">
				<li>
					<div class="flex flex-row gap-4 items-center">
						<EnergyIcon /> energy : {props.Energy}
					</div>
				</li>
				<li>
					<div class="flex flex-row gap-4 items-center">
						<EgoIcon forced_color={props.player} /> nb of claimed
						ego : {props.EgoCount}
					</div>
				</li>
				<li>
					<div class="flex flex-row gap-4 items-center">
						<CorruptedDataIcon /> Corrupted data :{" "}
						{props.CorruptedData}
					</div>
				</li>
				<li>
					<div class="flex flex-row gap-4 items-center">
						<EmotionalDataIcon /> Emotional data :{" "}
						{props.EmotionalData}
					</div>
				</li>
				<li>
					<div class="flex flex-row gap-4 items-center">
						<QuantumIcon /> Quantum data : {props.QuantumData}
					</div>
				</li>
				<li>
					<div class="flex flex-row gap-4 items-center">
						<LogicalDataIcon /> Logical data : {props.LogicalData}
					</div>
				</li>
			</ul>
		</div>
	);
}
interface ResultStatisticProps {
	result: DuelResultData;
	winner?: string;
}

function ResultStatistic(props: ResultStatisticProps) {
	const fault = useFault();
	return (
		<div class="flex flex-col gap-4">
			<Show when={props.result.winningMethod !== "draw"}>
				<div class="text-center ">
					<span class="text-xl dm-mono-medium tracking-widest">
						{props.winner}
					</span>{" "}
					won by : {format_winning_method(props.result.winningMethod)}
				</div>
			</Show>
			<div class="text-center capitalize">
				{props.result.duelType} duel lasted for:{" "}
				{format_time_min(props.result.duration)}
			</div>
			<ResultEloPlayers
				p1_elo={props.result.p1Elo}
				p1_elo_change={props.result.p1EloDelta}
				p1_username={props.result.p1Username}
				p2_elo={props.result.p2Elo}
				p2_elo_change={props.result.p2EloDelta}
				p2_username={props.result.p2Username}
			/>
			<div class="flex flex-col items-center gap-4">
				{/* Home button */}
				<Show when={props.result.duelType === "friendly"}>
					<button
						title="Request for a duel again..."
						class="w-fit bg-ego-dark text-moon dm-mono-medium text-xl px-4 py-2 border-4 border-moon "
						onclick={async () => {
							try {
								await api.post("/duel/friendly/challenge", {
									opponent_tag: props.result.isP1
										? props.result.p2Tag
										: props.result.p1Tag,
								});
							} catch (error) {
								fault.major({
									message: `Error while challenging ${props.result.isP1 ? props.result.p2Username : props.result.p1Username} to a friendly duel`,
								});
							}
						}}
					>
						Request for a duel again
					</button>
				</Show>
				<A
					href="/"
					title="Go back home"
					class="w-fit bg-moon text-night-900 dm-mono-medium px-4 py-2 border-4 border-night-900"
				>
					Go back home
				</A>
			</div>
			<section class="flex flex-row gap-4 h-full">
				<PlayerStatistic
					username={props.result.p1Username}
					CorruptedData={props.result.p1CorruptedData}
					EgoCount={props.result.p1EgoCount}
					EmotionalData={props.result.p1EmotionalData}
					LogicalData={props.result.p1LogicalData}
					Energy={props.result.p1Energy}
					QuantumData={props.result.p1QuantumData}
					player={P1}
				/>
				<div class="bg-night-300 h-full w-1"></div>
				<PlayerStatistic
					username={props.result.p2Username}
					CorruptedData={props.result.p2CorruptedData}
					EgoCount={props.result.p2EgoCount}
					EmotionalData={props.result.p2EmotionalData}
					LogicalData={props.result.p2LogicalData}
					Energy={props.result.p2Energy}
					QuantumData={props.result.p2QuantumData}
					player={P2}
				/>
			</section>
		</div>
	);
}

interface ResultHeaderProps {
	username: string;
	tag: string;
	profile_picture_url?: string;
	bg_color: string;
	border_color: string;
}

function ResultHeader(props: ResultHeaderProps) {
	return (
		<div class="flex flex-col text-xl dm-mono-medium tracking-widest">
			<div
				class={`flex gap-8 items-center p-4 ${props.bg_color} border-4 ${props.border_color}`}
			>
				<Avatar class="w-16" />
				<h1 title={`tag : #${props.tag}`} class="text-2xl">
					{props.username} won!
				</h1>
			</div>
		</div>
	);
}

interface ResultEloProps {
	username: string;
	elo: number;
	elo_change: number;
}

function ResultElo(props: ResultEloProps) {
	let elo_change = "";
	if (props.elo_change > 0) {
		elo_change = " + " + props.elo_change.toString();
	} else if (props.elo_change < 0) {
		elo_change = " - " + props.elo_change.toString();
	}
	return (
		<div class="grow dm-sans-800 tracking-widest text-center">
			{props.elo - props.elo_change} {elo_change}
		</div>
	);
}

interface ResultEloPlayersProps {
	p1_username: string;
	p1_elo: number;
	p1_elo_change: number;
	p2_username: string;
	p2_elo: number;
	p2_elo_change: number;
}
function ResultEloPlayers(props: ResultEloPlayersProps) {
	return (
		<div class="flex flex-row gap-4 w-full">
			<ResultElo
				username={props.p1_username}
				elo={props.p1_elo}
				elo_change={props.p1_elo_change}
			/>
			<div class="bg-night-300 h-full w-1"></div>
			<ResultElo
				username={props.p2_username}
				elo={props.p2_elo}
				elo_change={props.p2_elo_change}
			/>
		</div>
	);
}

interface FrameProps {
	children?: JSXElement;
}

function Frame(props: FrameProps) {
	return (
		<section class="bg-night-600 border-4 border-night-300 p-4 flex flex-col gap-4">
			{props.children}
		</section>
	);
}

interface DuelResultViewProps {
	duel_session_id: string;
}

export function DuelResultView(props: DuelResultViewProps) {
	const fault = useFault();
	const [result] = createResource(async () => {
		while (true) {
			try {
				const res = await api.get("/duel/result", {
					params: {
						duel_session_id: props.duel_session_id,
					},
				});
				const data: DuelResultData = res.data.result;
				return data;
			} catch (error) {
				if (
					(error as AxiosError).response?.status === 500 &&
					(
						(error as AxiosError).response?.data as
							| { error: string }
							| undefined
					)?.error === "invalid duel session"
				) {
					await new Promise((r) => setTimeout(r, 1000)); // Sleep 1 seconds
					continue;
				}
				fault.major({
					message: "Failed to retrieve the result the duel",
				});
				return null;
			}
		}
	});

	return (
		<section class="w-full h-full p-4 flex flex-col items-center">
			<Suspense fallback={"loading"}>
				<Switch>
					<Match
						when={
							result()?.isP1 && result()?.duelOutcome === "P1_WON"
						}
					>
						<Frame>
							<ResultHeader
								bg_color="bg-pl1-600"
								border_color="border-pl1-400"
								tag={result()?.p1Tag!}
								username={result()?.p1Username!}
								profile_picture_url={
									result()?.p1ProfilePictureUrl!
								}
							/>
							<ResultStatistic
								winner={result()?.p1Username!}
								result={result()!}
							/>
						</Frame>
					</Match>
					<Match
						when={
							result()?.isP1 && result()?.duelOutcome === "P2_WON"
						}
					>
						<Frame>
							<ResultHeader
								bg_color="bg-pl2-600"
								border_color="border-pl2-400"
								tag={result()?.p2Tag!}
								username={result()?.p2Username!}
								profile_picture_url={
									result()?.p2ProfilePictureUrl!
								}
							/>
							<ResultStatistic
								winner={result()?.p2Username!}
								result={result()!}
							/>
						</Frame>
					</Match>
					<Match
						when={
							!result()?.isP1 &&
							result()?.duelOutcome === "P1_WON"
						}
					>
						<Frame>
							<ResultHeader
								bg_color="bg-pl1-600"
								border_color="border-pl1-400"
								tag={result()?.p1Tag!}
								username={result()?.p1Username!}
								profile_picture_url={
									result()?.p1ProfilePictureUrl!
								}
							/>
							<ResultStatistic
								winner={result()?.p1Username!}
								result={result()!}
							/>
						</Frame>
					</Match>
					<Match
						when={
							!result()?.isP1 &&
							result()?.duelOutcome === "P2_WON"
						}
					>
						<Frame>
							<ResultHeader
								bg_color="bg-pl2-600"
								border_color="border-pl2-400"
								tag={result()?.p2Tag!}
								username={result()?.p2Username!}
								profile_picture_url={
									result()?.p2ProfilePictureUrl!
								}
							/>
							<ResultStatistic
								winner={result()?.p2Username!}
								result={result()!}
							/>
						</Frame>
					</Match>
					<Match when={result()?.duelOutcome === "draw"}>
						<Frame>
							<div
								class="bg-ego-dark p-4 border-4 border-ego
                            text-xl dm-mono-medium tracking-widest text-center"
							>
								Duel ended in draw
							</div>
							<ResultStatistic result={result()!} />
						</Frame>
					</Match>
				</Switch>
			</Suspense>
		</section>
	);
}
interface DuelResultUnexpectedViewProps {}

export function DuelResultUnexpectedView(props: DuelResultUnexpectedViewProps) {
	return <></>;
}
