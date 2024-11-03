import { useCanva, useGrid } from "@components/canvas/utils/context";
import { useSSE } from "@components/io_com/sse";
import { P1 } from "@utils/player.type";
import { format_time } from "@utils/time";
import { createSignal, onMount } from "solid-js";
import ClockIcon from "@assets/icons/clock.svg";
import EnergyIcon from "@assets/icons/energy.svg";
import { GridRenderPipe } from "@components/canvas/grid/pipeline";


export type GameStateProps = {

};

type Ratio = {
    current : number,
    max : number,
};

export function GameState(params:GameStateProps) {
    const [get_minute,set_minute] = createSignal<number>();
    const [get_second,set_second] = createSignal<number>();
    const [get_energy,set_energy] = createSignal<number>();
    const [get_corruption_data,set_corruption_data] = createSignal<Ratio>({current:0,max:0});
    const [get_emotional_data,set_emotional_data] = createSignal<Ratio>({current:0,max:0});
    const [get_logical_data,set_logical_data] = createSignal<Ratio>({current:0,max:0});
    const [get_quantum_data,set_quantum_data] = createSignal<Ratio>({current:0,max:0});

    const sse = useSSE();
    sse.on_frame((frame) => {
        set_minute(frame.timeM!);
        set_second(frame.timeS!);
        set_energy(frame.energy!);
        set_corruption_data({current:frame.corruptedDataCurrent!,max:frame.corruptedDataMax!});
        set_emotional_data({current:frame.emotionalDataCurrent!,max:frame.emotionalDataMax!});
        set_logical_data({current:frame.logicalDataCurrent!,max:frame.logicalDataMax!});
        set_quantum_data({current:frame.quantumDataCurrent!,max:frame.quantumDataMax!});
    });

    return <div class="w-full flex flex-row justify-between p-4">
        <span class="flex flex-row gap-4 align-middle items-center">
            <EnergyIcon />
            {get_energy()}
        </span>
        <span class="flex flex-row gap-4 align-middle items-center">
            <EnergyIcon />
            {get_corruption_data().current}/{get_corruption_data().max}
        </span>
        <span class="flex flex-row gap-4 align-middle items-center">
            <EnergyIcon />
            {get_emotional_data().current}/{get_emotional_data().max}
        </span>
        <span class="flex flex-row gap-4 align-middle items-center">
            <EnergyIcon />
            {get_logical_data().current}/{get_logical_data().max}
        </span>
        <span class="flex flex-row gap-4 align-middle items-center">
            <EnergyIcon />
            {get_quantum_data().current}/{get_quantum_data().max}
        </span>
        <span class="flex flex-row gap-4 align-middle items-center">
            {format_time(get_minute(),get_second())}
            <ClockIcon />
        </span>
    </div>
}
export type GameProps = {

};

export function Game(params:GameProps) {
    const app = useCanva();
    const grid = useGrid();
    const sse = useSSE();
    sse.on_frame((frame) => {
        if (!frame.grid) return;
        grid.clear();
        grid.batch_modify_cells(frame.grid)
    });

    onMount(() => {
        let elapsed_time = 0;
        app.ticker.add((time) => {
            // update time uniform in shaders
            elapsed_time += 0.1 * time.deltaTime;
            grid.u_time = elapsed_time;
        })
    })

    return <>
    </>
}
