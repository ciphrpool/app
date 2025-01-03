import { useNotifications } from "@components/notifications/notifications.context";
import { useNavigate } from "@solidjs/router";
import { useProtectedData, useUserData } from "@utils/auth/auth.context";
import { Component, createEffect, JSXElement, onMount, Show, Suspense } from "solid-js";
import LandingPage from "src/pages/home/landing.page";


interface ProtectedProps {
	fallback?: JSXElement;
	redirect?: string;
	children?: JSXElement;
}

const Protected: Component<ProtectedProps> = (props) => {
	const redirect_to = props.redirect ?? "/";
	const navigate = useNavigate();
	const channel = useNotifications();

	const is_authenticated = useProtectedData();
	const user = useUserData();

	onMount(() => {
		channel.set_navigator(navigate);

	})

	createEffect(() => {
		if (is_authenticated() === false) {
			console.log("REDIRECTED TO WELCOLM");
			
			navigate(redirect_to, { replace: true });
		}
	});

	return (
		<Show
			when={is_authenticated() && user()}
			fallback={props.fallback ?? ""}
		>
			{props.children}
		</Show>
	);
};

export default Protected;
