precision mediump float;

in vec2 v_vertex_position;
in vec2 v_texture_position;

in vec4 v_frame;


uniform vec4 u_texture_size[1];
uniform sampler2D u_textures[1];

void main(void)
{
    // float norm_x = (v_vertex_position.x)/100.0;
    // float norm_x = (v_texture_position.x)/100.0;
    // float norm_y = (v_texture_position.y)/100.0;

    vec2 normalized = v_texture_position;

    // if (normalized.x >= 0.95 || normalized.y <= 0.05 ) {
    //     gl_FragColor = vec4(0.2, 0.2, 0.2, 1.0);
    // }

    // vec2 coord = clamp(v_texture_position, v_frame.xy, v_frame.zw);
    gl_FragColor = texture(u_textures[0], v_texture_position );
    // gl_FragColor = vec4(1.0, 1.0, 1.0, 1.0);
    // gl_FragColor = vec4(norm_x, 1.0, 0.0, 1.0);
    // gl_FragColor = vec4(gl_FragCoord.x,0.0, 0.0, 1.0);
}