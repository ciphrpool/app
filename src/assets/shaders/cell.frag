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
    // float norm_x = (v_vertex_position.x)/100.0;
    // float norm_x = (v_texture_position.x)/100.0;
    // float norm_y = (v_texture_position.y)/100.0;
    int index=int(v_texture_idx);
    vec2 normalized = v_texture_position;
    if (index < 0) {
        vec2 normalized = v_texture_position;
        if (normalized.x >= 0.95 || normalized.y <= 0.05 ) {
            gl_FragColor = vec4(0.2, 0.2, 0.2, 1.0);
        }
    } else {
        gl_FragColor = SAMPLER_FN(index,v_texture_position);
    }
    // vec2 coord = clamp(v_texture_position, v_frame.xy, v_frame.zw);
}