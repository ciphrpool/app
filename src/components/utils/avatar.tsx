import { Show } from "solid-js";
import UserIcon from "@assets/icons/user.svg?component-solid";

interface AvatarProps {
	url?: string;
	class?: string;
}

function Avatar(props: AvatarProps) {
	return (
		<Show when={props.url} fallback={<UserIcon class={props.class} />}>
			{(url) => <img src={url().toString()} class={props.class} />}
		</Show>
	);
}

export default Avatar;
