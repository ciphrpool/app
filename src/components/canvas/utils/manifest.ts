// AUTO GENERATED FILE 
// generated 30/06/2024 by gen_texture_manifest.py
import ATTACK_P1 from "@assets/shaders/textures/w64_png/attacks/attack_P1.png";
import ATTACK_P2 from "@assets/shaders/textures/w64_png/attacks/attack_P2.png";
import CHANNEL_P1 from "@assets/shaders/textures/w64_png/channels/channel_P1.png";
import CHANNEL_P2 from "@assets/shaders/textures/w64_png/channels/channel_P2.png";
import CURSOR_1_P1 from "@assets/shaders/textures/w64_png/cursors/cursor_1_P1.png";
import CURSOR_1_P2 from "@assets/shaders/textures/w64_png/cursors/cursor_1_P2.png";
import CURSOR_2_P1 from "@assets/shaders/textures/w64_png/cursors/cursor_2_P1.png";
import CURSOR_2_P2 from "@assets/shaders/textures/w64_png/cursors/cursor_2_P2.png";
import CURSOR_3_P1 from "@assets/shaders/textures/w64_png/cursors/cursor_3_P1.png";
import CURSOR_3_P2 from "@assets/shaders/textures/w64_png/cursors/cursor_3_P2.png";
import CURSOR_4_P1 from "@assets/shaders/textures/w64_png/cursors/cursor_4_P1.png";
import CURSOR_4_P2 from "@assets/shaders/textures/w64_png/cursors/cursor_4_P2.png";
import DEFENSE_P1 from "@assets/shaders/textures/w64_png/defenses/defense_P1.png";
import DEFENSE_P2 from "@assets/shaders/textures/w64_png/defenses/defense_P2.png";
import SERVICE_P1 from "@assets/shaders/textures/w64_png/services/service_P1.png";
import SERVICE_P2 from "@assets/shaders/textures/w64_png/services/service_P2.png";
import STORAGE_P1 from "@assets/shaders/textures/w64_png/storages/storage_P1.png";
import STORAGE_P2 from "@assets/shaders/textures/w64_png/storages/storage_P2.png";
import CURSOR_FULL from "@assets/shaders/textures/w32_png/cursors/cursor_full.png";
import CURSOR_FULL_P2 from "@assets/shaders/textures/w32_png/cursors/cursor_full_P2.png";

const manifest = {
    bundles: [
        {
            name: "cursors",
            assets: [
                { alias: "cursor_full", src: CURSOR_FULL },
                { alias: "cursor_full_p2", src: CURSOR_FULL_P2 },
            ]
        },
    ]
};

export function find_texture(texture_id:number): [number,number]{
    return [0,0];
}

export default manifest;
