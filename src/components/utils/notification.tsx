import { Notification } from "@utils/DB/db";
import { children, JSXElement, Match, Switch } from "solid-js";

interface NotificationCardProps {
	children?: JSXElement;
	notification: Notification;
}

export function parseNotification(notification: Notification): string {
	switch (notification.key) {
		case "relationship:request":
			return notification.content.msg;
		case "relationship:acceptance":
			return notification.content.msg;
		case "duel:challenge_notification":
			return notification.content.msg;
		default:
			break;
	}
	return "";
}

function NotificationCard(props: NotificationCardProps) {
	return (
		<div
			class="pl-8 pr-4 py-4 show w-full h-full border-4
                border-night-300 bg-night-800 transition-colors ease-in-out duration-200
                flex items-center
         "
		>
			<Switch>
				<Match when={props.notification.type === "message"}>
					<h3 class="text-moon">
						{parseNotification(props.notification)}
					</h3>
				</Match>
			</Switch>
			{props.children}
		</div>
	);
}

export default NotificationCard;
