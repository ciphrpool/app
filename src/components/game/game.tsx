import { useCanva, useGrid } from "@components/canvas/utils/context";
import { P1 } from "@utils/player.type";
import { onMount } from "solid-js";


export type GameProps = {

};

function Game(params:GameProps) {
    const app = useCanva();
    const grid = useGrid();

    onMount(() => {
        grid.modify_cell({x:16,y:16},{
            player:P1,
            texture_id:0,
        })
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


export default Game;