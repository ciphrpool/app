precision mediump float;

#define NB_TEXTURES

in vec2 v_vertex_position;
in vec2 v_texture_position;
in vec4 v_frame;
in float v_texture_idx;
in float v_corruption_level;

uniform sampler2D u_textures[NB_TEXTURES];

#define SAMPLER_FN

void main(void)
{
    int index=int(v_texture_idx);
    vec2 normalized = v_texture_position;
    if (index < 0) {
        if (normalized.x >= 0.95 || normalized.y <= 0.05 ) {
            gl_FragColor = vec4(0.2, 0.2, 0.2, 1.0); // draw the cell border lines
        } // else do nothing the cell background is the same as the canvas

        if (v_corruption_level > 50.0) {
            float corruption_level_size = mix(0.2, 0.7, clamp((v_corruption_level - 50.0) / 150.0, 0.0, 1.0));
            vec2 cell_center = vec2(0.5, 0.5);
            vec2 corruption_level_min = cell_center - vec2(corruption_level_size) * 0.5;
            vec2 corruption_level_max = cell_center + vec2(corruption_level_size) * 0.5;
            vec2 adjusted_normalized = vec2(
                mix(0.0, 1.0, (normalized.x - 0.05) / 0.9),
                mix(0.0, 1.0, (normalized.y - 0.05) / 0.9)
            );
            if (adjusted_normalized.x >= corruption_level_min.x && adjusted_normalized.x <= corruption_level_max.x &&
                adjusted_normalized.y >= corruption_level_min.y && adjusted_normalized.y <= corruption_level_max.y) {
                gl_FragColor = vec4(0.3, 0.3, 0.3, 1.0);
            }
        }

    } else {
        gl_FragColor = SAMPLER_FN(index,v_texture_position);
    }



}