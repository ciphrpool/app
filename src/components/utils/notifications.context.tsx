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
	useContext,
} from "solid-js";
import { DB_NOTIFICATIONS } from "@utils/DB/notification.db";
import { add } from "dexie";

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
		if (!user) return;

		notification_handler_cleanup = channel.on_notification(
			(notification: Notification) => {
				if (notification.type === "ping") return;

				DB_NOTIFICATIONS.insert(db, notification);
			}
		);

		channel.connect(fault);
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
