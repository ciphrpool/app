import { useCanva, useGrid } from "@components/canvas/utils/context";
import { useSSE } from "@components/io_com/sse";
import { P1 } from "@utils/player.type";
import { format_time } from "@utils/time";
import { createSignal, onMount } from "solid-js";


export type GameStateProps = {

};

export function GameState(params:GameStateProps) {
    const [get_minute,set_minute] = createSignal<number>();
    const [get_second,set_second] = createSignal<number>();

    const sse = useSSE();
    sse.on_frame((frame) => {
        set_minute(frame.timeM!);
        set_second(frame.timeS!);
    });

    return <div>
        {format_time(get_minute(),get_second())}
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
        // grid.modify_cell({x:16,y:16},{
        //     player:P1,
        //     texture_id:0,
        // })
        // let delay = 1000;
        // app.ticker.add((time) => {
        //     delay -= time.elapsedMS;
        //     console.log(time.elapsedMS);
            
        //     if ( delay <= 0 ) {
        //         delay = 1000;
        //         grid.modify_cell({x:x,y:16},{
        //         })
        //         x = (x + 1) % grid.size; 
        //         grid.modify_cell({x:x,y:16},{
        //             player:P1,
        //         })
        //     }
        // })
    })

    return <>
    </>
}
