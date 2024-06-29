
in vec2 a_vertex_position;
in vec2 a_texture_position;

uniform mat3 u_proj_trans;
uniform vec2 u_cell_size;

out vec2 v_vertex_position;
out vec2 v_texture_position;
out vec4 v_frame;

void main(void)
{
    vec2 projected=(u_proj_trans*vec3(a_vertex_position,1.)).xy;
    
    gl_Position=vec4(projected,0.,1.);
    
    v_vertex_position=a_vertex_position;
    v_texture_position=(a_texture_position)/u_cell_size;
    v_frame=vec4(a_texture_position,a_texture_position);
}