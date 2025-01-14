import Avatar from "@components/utils/avatar";
import CarouselDetails from "@components/utils/carousel.details";
import FriendsDetails from "@components/utils/friends.details";
import ModulesDetails from "@components/utils/modules.details";
import NotificationDetails from "@components/notifications/notifications.details";
import { A } from "@solidjs/router";
import { useUserData } from "@utils/auth/auth.context";
import { Show } from "solid-js";
import { logOut } from "@utils/auth/auth";
import { useDatabase } from "@utils/DB/db.context";

interface SideViewProps {
	default_open_index?: number;
}

function SideView(props: SideViewProps) {
	const user = useUserData();
	const db = useDatabase();

	return (
		<section class="border-4 border-night-400 p-4 flex flex-col gap-4  overflow-hidden h-full">
			{/* User */}
			<div class="flex gap-8 items-center">
				{/* User Header */}
				<Avatar class="w-16" />

				<div class="grow flex flex-col gap-2">
					{/* User Info */}
					<h1 class="text-2xl tracking-widest transition-colors ease-in-out">
						{user()!.username}
					</h1>
					<h3 class="dm-sans-400 text-night-100 transition-colors ease-in-out">
						{user()!.tag}
					</h3>
					<h2 class="text-ego transition-colors ease-in-out">
						ELO : {user()!.elo}
					</h2>
				</div>
			</div>
			<div class="border-l-4 pl-4 border-l-night-700 text-night-100">
				{/* Description */}
				<p class="line-clamp-3">{user()!.bio}</p>
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
									<li class="text-night-100 hover:text-moon">
										<button
											title="Log out"
											onclick={async (e: MouseEvent) => {
												if (!e.isTrusted) return;
												await logOut(db);
											}}
										>
											⮑ Log out
										</button>
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
