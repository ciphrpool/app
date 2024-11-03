#define NB_TEXTURES

in vec2 a_vertex_position;
in vec2 a_texture_position;
in vec2 a_frame_position;
in vec2 a_frame_size;
in float a_texture_idx;
in float a_corruption_level;
in vec2 a_vertex_center;

uniform mat3 u_proj_trans;
uniform vec4 u_texture_size[NB_TEXTURES];
uniform vec2 u_cell_size;

out vec2 v_vertex_position;
out vec2 v_texture_position;
out vec2 v_frame_position;
out vec4 v_frame;
out float v_texture_idx;
out float v_corruption_level;

void main(void)
{
    int index = int(a_texture_idx);

    vec2 projected = (u_proj_trans * vec3(a_vertex_position, 1.0)).xy;
    gl_Position = vec4(projected, 0., 1.);
    
    v_vertex_position = a_vertex_position;
    v_texture_idx=a_texture_idx;
    v_corruption_level=a_corruption_level;

    
    if(index<0){
        v_texture_position=a_texture_position/a_frame_size;
    }else{
        v_texture_position = (a_texture_position + a_frame_position) / u_texture_size[index].xy;
    }
    
    v_frame=vec4(a_texture_position,a_texture_position);
}