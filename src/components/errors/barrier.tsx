import { ErrorBoundary, JSXElement, Show, createContext, createSignal, useContext } from "solid-js"
import { ErrorMsg, useFault } from "./fault";


class BarrierEvent extends Event {
    detail?: ErrorMsg;
    private constructor(type:string,detail?:ErrorMsg) {
        super(type);
        this.detail = detail;
    }
    static UP(error:ErrorMsg) {
        return new BarrierEvent("barrier-up",error);
    }
    static DOWN() {
        return new BarrierEvent("barrier-down");
    }
}

export class BarrierTarget extends EventTarget {
    constructor() {
        super();
    }
    raise(error:ErrorMsg) {
        this.dispatchEvent(BarrierEvent.UP(error));
    }
    reset() {
        this.dispatchEvent(BarrierEvent.DOWN());
    }
}

export const BarrierContext = createContext<BarrierTarget>();
export function useBarrier<T = BarrierTarget>() {
	return useContext(BarrierContext) as T;
}


export type BarrierProps = {
    fallback ?: JSXElement
    children ?: JSXElement
}

export class HandledError extends Error {
    fault:string
    constructor(fault:string) {
        super(fault);
        this.fault = fault;
    }
}

export function Barrier(props:BarrierProps) {
    const [is_alive,set_alive] = createSignal<boolean>(true); 
	const fault = useFault();
    const barrier = new BarrierTarget();
    barrier.addEventListener("barrier-up",(event) => {
        set_alive(false);
        fault.critical((event as BarrierEvent).detail!);
    })
    barrier.addEventListener("barrier-down",() => {
        if (!is_alive()) set_alive(true);
    })
    return <ErrorBoundary fallback={(err) => {
        if (err instanceof HandledError) {
            fault.critical({message:(err as HandledError).fault});
        }
        return props.fallback
    }}>
        <BarrierContext.Provider value={barrier}>
            <Show when={is_alive()} fallback={props.fallback}>
                {props.children}
            </Show>
        </BarrierContext.Provider>
    </ErrorBoundary>
}


export function safe(fn : () => void) : () => void {
    const barrier = useBarrier();
    barrier.reset();
    return () => {
        try {
            fn()
        } catch (error) {
            if (error instanceof HandledError) {
                barrier.raise({message:(error as HandledError).fault});
            } else {
                barrier.raise({message:"Unexpected error !"});
            }
        }
    }
}

export function async_safe(fn : () => Promise<void>) {
    const barrier = useBarrier();
    barrier.reset();
    return async () => {
        try {
            await fn();
        } catch (error) {
            if (error instanceof HandledError) {
                barrier.raise({message:(error as HandledError).fault});
            } else {
                barrier.raise({message:"Unexpected error !"});
            }
        }
    }
}