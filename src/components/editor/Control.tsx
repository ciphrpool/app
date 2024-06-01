import ControlCursor from "@assets/icons/control_cursor";
import { C1, C2, C3, C4, P1, Te_Cursor } from "@utils/player.type";

type ControlProps = {
    active : Te_Cursor
    change_cursor : (cursor: Te_Cursor) => void
}

function Control(props:ControlProps) {
    return <div class="h-full w-fit p-4 bg-night-900">
        <div class="flex flex-col gap-8">
            <ControlCursor 
                on_click={() => props.change_cursor(C1)} 
                class="cursor-pointer"
                classList={{
                    "opacity-60" : props.active !== C1
                }}
                e_player={P1} 
                e_cursor={C1}/>
            <ControlCursor  
                on_click={() => props.change_cursor(C2)} 
                class="cursor-pointer"
                classList={{
                    "opacity-60" : props.active !== C2
                }}
                e_player={P1}
                e_cursor={C2}/>
            <ControlCursor  
                on_click={() => props.change_cursor(C3)} 
                class="cursor-pointer"
                classList={{
                    "opacity-60" : props.active !== C3
                }}
                e_player={P1} 
                e_cursor={C3}/>
            <ControlCursor  
                on_click={() => props.change_cursor(C4)} 
                class="cursor-pointer"
                classList={{
                    "opacity-60" : props.active !== C4
                }}
                e_player={P1} 
                e_cursor={C4}/>
        </div>
    </div>
}


export default Control;