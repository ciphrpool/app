import { useCanva, useGrid } from "@components/canvas/utils/context";
import { useSSE_Frame } from "@components/network/sse";
import { P1, P2 } from "@utils/player.type";
import { format_time } from "@utils/time";
import { createSignal, JSXElement, onMount } from "solid-js";
import ClockIcon from "@assets/icons/clock.svg";
import EnergyIcon from "@assets/icons/energy.svg";
import EgoIcon from "@assets/icons/ego";
import CorruptedDataIcon from "@assets/icons/corrupted_data.svg";
import EmotionalDataIcon from "@assets/icons/emotional_data.svg";
import LogicalDataIcon from "@assets/icons/logical_data.svg";
import QuantumIcon from "@assets/icons/quantum_data.svg";
import { GridRenderPipe } from "@components/canvas/grid/pipeline";

export type GameStateProps = {
	children?: JSXElement;
};

type Ratio = {
	current: number;
	max: number;
};
type EgoCount = {
	p1: number;
	p2: number;
};

export function GameState(props: GameStateProps) {
	const [get_minute, set_minute] = createSignal<number>();
	const [get_second, set_second] = createSignal<number>();
	const [get_energy, set_energy] = createSignal<number>();
	const [get_ego_count, set_ego_count] = createSignal<EgoCount>({
		p1: 0,
		p2: 0,
	});
	const [get_corruption_data, set_corruption_data] = createSignal<Ratio>({
		current: 0,
		max: 0,
	});
	const [get_emotional_data, set_emotional_data] = createSignal<Ratio>({
		current: 0,
		max: 0,
	});
	const [get_logical_data, set_logical_data] = createSignal<Ratio>({
		current: 0,
		max: 0,
	});
	const [get_quantum_data, set_quantum_data] = createSignal<Ratio>({
		current: 0,
		max: 0,
	});

	const sse = useSSE_Frame();
	sse.on_frame((frame) => {
		set_minute(frame.timeM!);
		set_second(frame.timeS!);
		set_energy(frame.energy!);
		set_ego_count({ p1: frame.egoP1!, p2: frame.egoP2! });
		set_corruption_data({
			current: frame.corruptedDataCurrent!,
			max: frame.corruptedDataMax!,
		});
		set_emotional_data({
			current: frame.emotionalDataCurrent!,
			max: frame.emotionalDataMax!,
		});
		set_logical_data({
			current: frame.logicalDataCurrent!,
			max: frame.logicalDataMax!,
		});
		set_quantum_data({
			current: frame.quantumDataCurrent!,
			max: frame.quantumDataMax!,
		});
	});

	return (
		<>
			{/* Left column - Energy and Data stats */}
			<div class="flex flex-col h-full">
				{/* Energy at top */}
				<div class="flex flex-row gap-4 items-center mb-8">
					<EnergyIcon />
					<p>{get_energy()}</p>
				</div>

				<div class="flex-grow flex items-center">
					<div class="grid grid-cols-[24px_1fr] gap-x-4 gap-y-4">
						<CorruptedDataIcon />
						<p>
							{get_corruption_data().current} |{" "}
							{get_corruption_data().max}
						</p>
						<EmotionalDataIcon />
						<p>
							{get_emotional_data().current} |{" "}
							{get_emotional_data().max}
						</p>
						<LogicalDataIcon />
						<p>
							{get_logical_data().current} |{" "}
							{get_logical_data().max}
						</p>
						<QuantumIcon />
						<p>
							{get_quantum_data().current} |{" "}
							{get_quantum_data().max}
						</p>
					</div>
				</div>
			</div>

			{/* Center - Game and Ego count - spans 2 columns */}
			<div class="col-span-2 flex flex-col items-center gap-4 h-full">
				<div class="flex-grow flex flex-col justify-end">
					{props.children}
				</div>
				<span class="flex flex-row gap-4 items-center flex-grow-0">
					<EgoIcon get_ego_count={get_ego_count} />
					<p class="text-pl1-200">{get_ego_count().p1}</p> |{" "}
					<p class="text-pl2-200">{get_ego_count().p2}</p>
				</span>
			</div>

			{/* Right - Clock */}
			<span class="flex flex-row gap-4 items-center self-start justify-self-end">
				{format_time(get_minute(), get_second())}
				<ClockIcon />
			</span>
		</>
	);
}
export type GameProps = {};

export function Game(params: GameProps) {
	const app = useCanva();
	const grid = useGrid();
	const sse = useSSE_Frame();
	sse.on_frame((frame) => {
		if (!frame.grid) return;
		grid.clear();
		grid.batch_modify_cells(frame.grid);
	});

	onMount(() => {
		let elapsed_time = 0;
		app.ticker.add((time) => {
			// update time uniform in shaders
			elapsed_time += 0.1 * time.deltaTime;
			grid.u_time = elapsed_time;
		});
	});

	return <></>;
}
