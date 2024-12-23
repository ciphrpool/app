import { useNavigate } from "@solidjs/router";
import { useProtectedData, useUserData } from "@utils/auth/auth.context";
import { Component, createEffect, JSXElement, onMount, Show } from "solid-js";

interface ProtectedProps {
	fallback?: Component;
	redirect?: string;
	children?: JSXElement;
}

const Protected: Component<ProtectedProps> = (props) => {
	const redirect_to = props.redirect ?? "/";
	const navigate = useNavigate();
	const protected_data = useProtectedData();
	const user = useUserData();

	onMount(() => {
		const is_auth = protected_data.is_authenticated();
		if (!is_auth) {
			if (props.fallback) {
				const Fallback = props.fallback;
				return <Fallback />;
			}
			navigate(redirect_to, { replace: true });
		}
		console.log(user());
	});
	console.log({ user: user() });

	return (
		<Show
			when={protected_data.is_authenticated() && user()}
			fallback={props.fallback?.({})}
		>
			{props.children}
		</Show>
	);
};

export default Protected;
