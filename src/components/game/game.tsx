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

export function GameState(params:GameStateProps) {
    const [get_minute,set_minute] = createSignal<number>();
    const [get_second,set_second] = createSignal<number>();
    const [get_energy,set_energy] = createSignal<number>();

    const sse = useSSE();
    sse.on_frame((frame) => {
        set_minute(frame.timeM!);
        set_second(frame.timeS!);
        set_energy(frame.energy!);
    });

    return <div class="w-full flex flex-row justify-between p-4">
        <span class="flex flex-row gap-4 align-middle items-center">
            <EnergyIcon />
            {get_energy()}
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
