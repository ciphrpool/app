import { For } from "solid-js";
import CloseIcon from "@assets/icons/close.svg?component-solid";

interface NotificationDetailsProps {}

export type NotificationSummaryData = {
	msg: string;
};

function NotificationDetails(props: NotificationDetailsProps) {
	const notifications: NotificationSummaryData[] = Array.from(
		{ length: 1 },
		() => {
			return { msg: "Test2 has accepted your friend request !" };
		}
	);
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
				<span>&gt&gt Notifications</span>
				<div class="border-4 border-pl1-400 w-8 h-8 flex items-center justify-center text-center text-pl1-400 bg-night-700">
					{notifications.length}
				</div>
			</summary>
			<div class="h-full overflow-hidden flex flex-col gap-4">
				<div class="w-full flex gap-5 mt-2 justify-end">
					<button
						title="Clear all notifications"
						class="hover:underline hover:underline-offset-4"
					>
						clear all
					</button>
				</div>
				<ul class="py-4 flex flex-col max-h-64 overflow-y-auto">
					<For each={notifications}>
						{(module) => {
							return (
								<li class="pl-8 pr-4 py-4 show w-full h-full border-4 border-night-300 bg-night-800 transition-colors ease-in-out duration-200">
									<div class="w-full h-full flex items-center">
										<h3 class="text-moon">{module.msg}</h3>
										<button title="Remove this notification">
											<CloseIcon class="grow [&_path]:fill-night-300  [&_path]:hover:fill-ego [&_path]:hover:transition-all [&_path]:hover:duration-200 [&_path]:hover:ease-in-out" />
										</button>
									</div>
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

export default NotificationDetails;
