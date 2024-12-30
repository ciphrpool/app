import {
	createEffect,
	createResource,
	For,
	onCleanup,
	onMount,
	Show,
} from "solid-js";
import CloseIcon from "@assets/icons/close.svg?component-solid";
import { useNotifications } from "./notifications.context";
import { Notification } from "@utils/DB/db";
import { DB_NOTIFICATIONS } from "@utils/DB/notification.db";
import { useDatabase } from "@utils/DB/db.context";
import { useFault } from "@components/errors/fault";
import NotificationCard from "./notification";

interface NotificationDetailsProps {}

function NotificationDetails(props: NotificationDetailsProps) {
	const notifications_channel = useNotifications();
	const db = useDatabase();
	const fault = useFault();

	const [notifications, { mutate, refetch }] = createResource(async () => {
		try {
			const notifications = await DB_NOTIFICATIONS.all(db);
			return notifications;
		} catch (err) {
			fault.major({
				message: "Cannot retrieve all stored notifications",
			});
		}
	});
	let on_notification_clean_up: () => void | undefined;
	onMount(() => {
		on_notification_clean_up = notifications_channel.on_notification(
			(notification: Notification) => {
				if (notification.type === "ping") return;
				mutate([...(notifications() ?? []), notification]);
			}
		);
	});

	onCleanup(() => {
		on_notification_clean_up?.();
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
				<span>&gt&gt Notifications</span>
				<Show when={(notifications() ?? []).length > 0}>
					<div class="border-4 border-pl1-400 w-8 h-8 flex items-center justify-center text-center text-pl1-400 bg-night-700">
						{(() => {
							console.log(notifications());
							return null;
						})()}
						{(notifications() ?? []).length}
					</div>
				</Show>
			</summary>
			<div class="h-full overflow-hidden flex flex-col gap-4">
				<div class="w-full flex gap-5 mt-2 justify-end">
					<Show
						when={(notifications() ?? []).length > 0}
						fallback={"No notifications"}
					>
						<button
							title="Clear all notifications"
							class="hover:underline hover:underline-offset-4"
							onclick={async (e: MouseEvent) => {
								if (!e.isTrusted) return;
								mutate([]);
								await DB_NOTIFICATIONS.clear(db);
							}}
						>
							clear all
						</button>
					</Show>
				</div>
				<ul class="py-4 flex flex-col max-h-64 overflow-y-auto gap-4">
					<For each={notifications()}>
						{(notification) => {
							return (
								<NotificationCard
									notification={notification}
									defer_delete={async (
										notification: Notification
									) => {
										await DB_NOTIFICATIONS.delete(
											db,
											notification.id
										);
										mutate([
											...(notifications() ?? []).filter(
												(n) => n.id !== notification.id
											),
										]);
									}}
								></NotificationCard>
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
