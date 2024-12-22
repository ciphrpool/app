import { useNavigate } from "@solidjs/router";
import { useProtectedData } from "@utils/auth/auth.context";
import { Component, createEffect, JSXElement, Show } from "solid-js";

interface ProtectedProps {
	fallback?: Component;
	redirect?: string;
	children?: JSXElement;
}

const Protected: Component<ProtectedProps> = (props) => {
	const redirect_to = props.redirect ?? "/";
	const navigate = useNavigate();
	const protected_data = useProtectedData();

	createEffect(() => {
		const is_auth = protected_data.is_authenticated();
		if (!is_auth) {
			if (props.fallback) {
				const Fallback = props.fallback;
				return <Fallback />;
			}
			navigate(redirect_to, { replace: true });
		}
	});

	return (
		<Show
			when={protected_data.is_authenticated()}
			fallback={props.fallback?.({})}
		>
			{props.children}
		</Show>
	);
};

export default Protected;
