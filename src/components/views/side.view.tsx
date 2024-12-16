import UserIcon from "@assets/icons/user.svg?component-solid";
import CarouselDetails from "@components/utils/carousel.details";
import FriendsDetails from "@components/utils/friends.details";
import ModulesDetails from "@components/utils/modules.details";
import NotificationDetails from "@components/utils/notifications.details";
import { A } from "@solidjs/router";
import { Show } from "solid-js";

export type UserSummaryData = {
	username: string;
	tag: string;
	avatar?: string;
	elo: number;
	description: string;
};

interface SideViewProps {
	default_open_index?: number;
}

function SideView(props: SideViewProps) {
	const user: UserSummaryData = {
		description:
			"Lorem ipsum dolor sit amet consectetur, adipisicing elit.Reprehenderit nobis voluptate soluta rem vero ducimusblanditiis, ipsum aperiam nostrum dolores deleniti, quaeratmodi perspiciatis ipsam. Eum ab beatae unde ex ea mollitia,facere veniam pariatur ut vero exercitationem praesentium magni quis dolor.",
		elo: 1690,
		tag: "#89PO22WN",
		username: "TestMainUser",
	};

	return (
		<section class="border-4 border-night-400 p-4 flex flex-col gap-4  overflow-hidden h-full">
			{/* User */}
			<div class="flex gap-8 items-center">
				{/* User Header */}
				<Show
					when={user.avatar}
					fallback={<UserIcon class="min-w-16 w-1/4" />}
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
			<div class="border-l-4 pl-4 border-l-night-700 text-night-100">
				{/* Description */}
				<p class="line-clamp-3">{user.description}</p>
			</div>
			<div class="h-full overflow-hidden flex flex-col gap-4">
				<CarouselDetails
					default_open_index={props.default_open_index ?? 0}
				>
					<div class="overflow-hidden">
						<FriendsDetails />
					</div>
					<div class="overflow-hidden">
						<ModulesDetails />
					</div>
					<div class="overflow-hidden">
						<NotificationDetails />
					</div>
					<div class="overflow-hidden">
						<details class="cursor-pointer [&[open]>summary]:text-moon ">
							<summary class="block select-none text-xl tracking-widest text-night-100 hover:text-moon transition-colors  list-none [&:has(+*:open)]:text-moon">
								{">>"} Profile
							</summary>
							<nav class="pl-8 pt-4">
								<ul class="flex flex-col gap-4">
									<li class="text-night-100 hover:text-moon">
										<A href="/statistics">⮑ Statistics</A>
									</li>
									<li class="text-night-100 hover:text-moon">
										<A href="/preferences">⮑ Preferences</A>
									</li>
									<li class="text-night-100 hover:text-moon">
										<A href="/account">⮑ Account</A>
									</li>
								</ul>
							</nav>
						</details>
					</div>
				</CarouselDetails>
			</div>
		</section>
	);
}

export default SideView;
