import { FaultTarget, useFault } from "@components/errors/fault";
import { A, useNavigate, Navigator } from "@solidjs/router";
import { api } from "@utils/auth/auth";
import { Notification } from "@utils/DB/db";
import { children, JSXElement, Match, Switch } from "solid-js";
import { HandleNotification } from "./notification.handlers";
import CloseIcon from "@assets/icons/close.svg?component-solid";

interface NotificationCardProps {
	children?: JSXElement;
	notification: Notification;
	defer_delete?: (notification: Notification) => void;
}

function NotificationCard(props: NotificationCardProps) {
	const fault = useFault();
	const navigate = useNavigate();
	const { context, content, extra } = HandleNotification(
		props.notification,
		fault,
		navigate,
		{
			is_info_enabled: false,
			defer_delete: props.defer_delete,
		}
	);
	if (!content) return null;
	return (
		<li>
			<div
				class="pl-8 pr-4 py-4 show w-full h-full border-4
                border-night-300 bg-night-800 transition-colors ease-in-out duration-200
                flex flex-col gap-4
         	"
			>
				<div class="flex flex-row gap-4">
					{content}
					<button
						title="Remove this notification"
						onclick={(e: MouseEvent) => {
							if (!e.isTrusted) return;
							props.defer_delete?.(props.notification);
						}}
					>
						<CloseIcon class="grow [&_path]:fill-night-300  [&_path]:hover:fill-ego [&_path]:hover:transition-all [&_path]:hover:duration-200 [&_path]:hover:ease-in-out" />
					</button>
				</div>
				{extra}
			</div>
		</li>
	);
}

export default NotificationCard;
