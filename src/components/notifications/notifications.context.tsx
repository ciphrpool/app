import { useFault } from "@components/errors/fault";
import { SSE_NotificationsChannel } from "@components/network/sse";
import { api } from "@utils/auth/auth";
import { useUserData } from "@utils/auth/auth.context";
import { useDatabase } from "@utils/DB/db.context";
import { Notification } from "@utils/DB/db";
import axios from "axios";
import {
	createContext,
	createEffect,
	JSXElement,
	onCleanup,
	onMount,
	useContext,
} from "solid-js";
import { DB_NOTIFICATIONS } from "@utils/DB/notification.db";
import { add } from "dexie";
import { HandleNotification } from "./notification.handlers";

export const NotificationsContext = createContext<SSE_NotificationsChannel>();
export function useNotifications<T = SSE_NotificationsChannel>() {
	return useContext(NotificationsContext) as T;
}

interface NotificationProviderProps {
	children?: JSXElement;
}

export function NotificationProvider(props: NotificationProviderProps) {
	const user_data = useUserData();
	const db = useDatabase();
	const channel = new SSE_NotificationsChannel();
	const fault = useFault();

	let notification_handler_cleanup: (() => void) | undefined;
	createEffect(() => {
		const user = user_data();
		console.log("On mount, user", { user });

		if (!user) return;

		notification_handler_cleanup = channel.on_notification(
			async (notification: Notification) => {
				console.log("Received notification", { notification });

				if (notification.type === "ping") return;

				const res = HandleNotification(
					notification,
					fault,
					channel.navigator!,
					{
						is_info_enabled: true,
						defer_delete: async (notification: Notification) => {
							console.log("DEFERED DELETE", { notification });

							await DB_NOTIFICATIONS.delete(db, notification.id);
						},
					}
				);
				if (!res.context.persistent) return;

				await DB_NOTIFICATIONS.insert(db, notification);
			}
		);

		channel.connect(fault);

		// setTimeout(async () => {
		// 	try {
		// 		console.log("PING");

		// 		await api.get("/notify/ping");
		// 	} catch (error) {
		// 		fault.major({
		// 			message: "Cannot refresh the notifications",
		// 		});
		// 	}
		// }, 5 * 1000);
	});

	onCleanup(async () => {
		await channel.disconnect(fault);
		if (notification_handler_cleanup) notification_handler_cleanup();
	});

	return (
		<NotificationsContext.Provider value={channel}>
			{props.children}
		</NotificationsContext.Provider>
	);
}
