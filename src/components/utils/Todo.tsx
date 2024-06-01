import { ParentProps } from 'solid-js';
type TodoProps = ParentProps  & {
    dbg ?: boolean,
}

function Todo(props:TodoProps) {
    return <div class='w-full h-full' classList={{"dbg-1":props.dbg}}>
        TODO : {props.children}
    </div>
}

export default Todo;