precision mediump float;

#define NB_TEXTURES

in vec2 v_vertex_position;
in vec2 v_texture_position;
in vec4 v_frame;
in float v_texture_idx;

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

        if (v_micro_cell > 50.0) {
            float micro_cell_size = mix(0.2, 0.8, clamp((v_micro_cell - 50.0) / 150.0, 0.0, 1.0));
            vec2 cell_center = vec2(0.5, 0.5);
            vec2 micro_cell_min = cell_center - vec2(micro_cell_size) * 0.5;
            vec2 micro_cell_max = cell_center + vec2(micro_cell_size) * 0.5;
            
            if (normalized.x >= micro_cell_min.x && normalized.x <= micro_cell_max.x &&
                normalized.y >= micro_cell_min.y && normalized.y <= micro_cell_max.y) {
                gl_FragColor = vec4(0.0, 0.0, 1.0, 1.0); // Blue micro cell
            }
        }

    } else {
        gl_FragColor = SAMPLER_FN(index,v_texture_position);
    }



}