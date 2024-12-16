import { children, createSignal, For, JSX, Show } from "solid-js";
import UserIcon from "@assets/icons/user.svg?component-solid";
import AddIcon from "@assets/icons/add.svg?component-solid";
import { A } from "@solidjs/router";

interface FriendsDetailsProps {}

export type FriendSummaryData = {
	username: string;
	tag: string;
	elo: number;
	avatar?: URL;
};

function FriendsDetails(props: FriendsDetailsProps) {
	const friends: FriendSummaryData[] = Array.from({ length: 5 }, () => {
		return { elo: 1520, username: "Test", tag: "87ABN33A" };
	});
	return (
		<details class="cursor-pointer [&[open]>summary]:text-moon group overflow-hidden">
			<summary
				class="
					select-none 
					text-xl tracking-widest text-night-100 
					hover:text-moon transition-colors duration-200
					list-none [&:has(+*:open)]:text-moon
					flex flex-row gap-4 justify-between 
				"
			>
				<span>&gt&gt Friends</span>
				<A
					title="Add a new friend"
					class="hidden group-open:block"
					href="/users/search"
				>
					<AddIcon class="[&_path]:fill-night-300  [&_path]:hover:fill-pl2-400 [&_path]:hover:transition-all [&_path]:hover:duration-200 [&_path]:hover:ease-in-out" />
				</A>
			</summary>
			<div class="h-full overflow-hidden flex flex-col gap-4">
				<div class="w-full flex gap-5 justify-center">
					{/* Three Dot */}
					<div class="bg-moon w-1 h-1"></div>
					<div class="bg-moon w-1 h-1"></div>
					<div class="bg-moon w-1 h-1"></div>
				</div>
				<ul class="py-4 flex flex-col max-h-64 overflow-y-auto">
					<For each={friends}>
						{(friend) => {
							return (
								<li class="pl-8 py-4 show w-full h-full hover:bg-night-500  transition-colors ease-in-out duration-200">
									<A href={`/users/${friend.tag}`}>
										<div class="w-full h-full flex gap-4 items-center pr-4">
											<Show
												when={friend.avatar}
												fallback={
													<UserIcon class="w-8" />
												}
											>
												{(url) => (
													<img
														src={url().toString()}
													/>
												)}
											</Show>
											<h3 class="hover:text-pl1-200 transition-colors ease-in-out duration-200">
												{friend.username}
												<span class="text-night-100 uppercase">
													#{friend.tag}
												</span>
											</h3>
											<span class="select-none">|</span>
											<h3 class="hover:text-pl1-200 transition-colors ease-in-out duration-200">
												{friend.elo}
											</h3>

											{/* If the player selected to friendly duel */}
											<div class="bg-pl2-400 w-2 h-2 ml-auto"></div>
										</div>
									</A>
								</li>
							);
						}}
					</For>
				</ul>
				<div class="w-full flex gap-5 justify-center">
					{/* Three Dot */}
					<div class="bg-moon w-1 h-1"></div>
					<div class="bg-moon w-1 h-1"></div>
					<div class="bg-moon w-1 h-1"></div>
				</div>
			</div>
		</details>
	);
}

export default FriendsDetails;
