import { Show } from "solid-js";
import { UserSummaryData } from "./side.view";
import UserIcon from "@assets/icons/user.svg?component-solid";

interface UserViewProps {
	class?: string;
}

function UserView(props: UserViewProps) {
	const user: UserSummaryData = {
		description:
			"Lorem ipsum dolor sit amet consectetur, adipisicing elit.Reprehenderit nobis voluptate soluta rem vero ducimusblanditiis, ipsum aperiam nostrum dolores deleniti, quaeratmodi perspiciatis ipsam. Eum ab beatae unde ex ea mollitia,facere veniam pariatur ut vero exercitationem praesentium magni quis dolor.",
		elo: 1690,
		tag: "#89PO22WN",
		username: "TestFriend",
	};

	return (
		<section class={props.class}>
			{/* User */}
			<div class="flex gap-8 items-center">
				{/* User Header */}
				<Show
					when={user.avatar}
					fallback={<UserIcon class="min-w-16 w-16" />}
				>
					{(url) => <img src={url().toString()} />}
				</Show>
				<div class="grow flex flex-col gap-2">
					{/* User Info */}
					<h1 class="text-2xl tracking-widest transition-colors ease-in-out">
						{user.username}
					</h1>
					<h3 class="dm-sans-400 text-night-100 transition-colors ease-in-out">
						{user.tag}
					</h3>
					<h2 class="text-ego transition-colors ease-in-out">
						ELO : {user.elo}
					</h2>
				</div>
			</div>
			<div class="border-l-4 pl-4 border-l-night-500 text-night-100">
				{/* Description */}
				<p class="line-clamp-3">{user.description}</p>
			</div>
		</section>
	);
}

export default UserView;
