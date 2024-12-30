import { FaultTarget, useFault } from "@components/errors/fault";
import { A, useNavigate, Navigator } from "@solidjs/router";
import { api } from "@utils/auth/auth";
import { Notification } from "@utils/DB/db";
import { children, JSXElement, Match, Switch } from "solid-js";

export function parseNotification(notification: Notification): string {
	switch (notification.key) {
		case "relationship:request":
			return notification.content.msg;
		case "relationship:acceptance":
			return notification.content.msg;
		case "duel:challenge:request":
			return notification.content.msg;
		case "duel:challenge:creation":
			return notification.content.msg;
		default:
			break;
	}
	return "";
}
type HandleNotificationConfig = {
	is_info_enabled: boolean;
	defer_delete?: (notification: Notification) => void;
};

type HandleNotificationResult = {
	context: {
		persistent: boolean;
	};
	content?: JSXElement;
	extra?: JSXElement;
};

interface ResponsePanelProps {
	accept_title?: string;
	accept_class?: string;
	accept: () => Promise<void>;

	reject_title?: string;
	reject_class?: string;
	reject: () => Promise<void>;
}

function ResponsePanel(props: ResponsePanelProps) {
	return (
		<div class="flex flex-row gap-4">
			<button
				class={props.accept_class}
				title={props.accept_title ?? "Click to accept"}
				onclick={async (e) => {
					e.preventDefault();
					if (!e.isTrusted) return;
					await props.accept();
				}}
			>
				Accept
			</button>
			<button
				class={props.reject_class}
				title={props.reject_title ?? "Click to reject"}
				onclick={async (e) => {
					e.preventDefault();
					if (!e.isTrusted) return;
					await props.reject();
				}}
			>
				Dismiss
			</button>
		</div>
	);
}

function HandleNotificationDuelChallengeRequest(
	notification: Notification,
	fault: FaultTarget,
	navigate: Navigator,
	cfg: HandleNotificationConfig
): HandleNotificationResult {
	const msg = parseNotification(notification);
	const expired_at = new Date(notification.metadata.expired_at);
	const waiting_room_id = notification.metadata.waiting_room_id;
	const opponent_tag = notification.metadata.opponent_tag;
	const url = `/duel/waiting/${waiting_room_id}`;
	if (new Date() >= expired_at) {
		cfg.defer_delete?.(notification);
		return { context: { persistent: false } };
	}
	const dismiss_function = async () => {
		try {
			await api.post("/duel/friendly/response", {
				opponent_tag,
				waiting_room_id,
				response: false,
			});
			cfg.defer_delete?.(notification);
		} catch (error) {
			fault.minor({
				message: "Could not reject this duel challenge",
			});
		}
	};
	const accept_function = async () => {
		try {
			await api.post("/duel/friendly/response", {
				opponent_tag,
				waiting_room_id,
				response: true,
			});
			cfg.defer_delete?.(notification);
			navigate(url);
		} catch (error) {
			fault.minor({
				message: "Could not accept this duel challenge",
			});
		}
	};

	if (cfg.is_info_enabled) {
		fault.info({
			timeout: 1 * 60 * 1000, // 1 minute
			message: (
				<div class="flex flex-col gap-4">
					{msg}
					<ResponsePanel
						accept_title="Click to accept this duel"
						accept_class="px-4 py-2 bg-moon text-night-800"
						accept={accept_function}
						reject_title="Click to dismiss this duel"
						reject_class="px-4 py-2 border-4 border-night-900 text-night-900 hover:bg-pl1-200"
						reject={dismiss_function}
					/>
				</div>
			),
		});
	}
	return {
		context: { persistent: true },
		content: msg,
		extra: (
			<ResponsePanel
				accept_title="Click to accept this duel"
				accept_class="px-4 py-2 bg-moon text-night-800"
				accept={accept_function}
				reject_title="Click to dismiss this duel"
				reject_class="px-4 py-2 border-4 border-pl2-400 text-pl2-400"
				reject={dismiss_function}
			/>
		),
	};
}

function HandleNotificationDuelChallengeCreation(
	notification: Notification,
	fault: FaultTarget,
	navigate: Navigator,
	cfg: HandleNotificationConfig
): HandleNotificationResult {
	const msg = parseNotification(notification);
	const expired_at = new Date(notification.metadata.expired_at);
	const waiting_room_id = notification.metadata.waiting_room_id;
	const opponent_tag = notification.metadata.opponent_tag;

	const url = `/duel/waiting/${waiting_room_id}`;

	if (new Date() >= expired_at) {
		cfg.defer_delete?.(notification);
		return { context: { persistent: false } };
	}

	const link = (
		<p
			title="Click to go to the duel !"
			onclick={async (e: MouseEvent) => {
				e.preventDefault();
				navigate(url);
			}}
			class="cursor-pointer"
		>
			{msg}
		</p>
	);
	if (cfg.is_info_enabled) {
		fault.info({
			timeout: 20 * 1000, // 20 seconds
			message: link,
		});
	}
	return { context: { persistent: false }, content: link };
}

function HandleNotificationDuelChallenge(
	notification: Notification,
	fault: FaultTarget,
	navigate: Navigator,
	cfg: HandleNotificationConfig
): HandleNotificationResult {
	switch (notification.key) {
		case "duel:challenge:creation":
			return HandleNotificationDuelChallengeCreation(
				notification,
				fault,
				navigate,
				cfg
			);
		case "duel:challenge:request":
			return HandleNotificationDuelChallengeRequest(
				notification,
				fault,
				navigate,
				cfg
			);
		default:
			return {
				context: {
					persistent: false,
				},
			};
	}
}

function HandleNotificationDuelAcceptance(
	notification: Notification,
	fault: FaultTarget,
	navigate: Navigator,
	cfg: HandleNotificationConfig
): HandleNotificationResult {
	if (notification.key === "duel:acceptance:rejection") {
		const url = `/`;
		if ( cfg.is_info_enabled) {
			fault.info({ message: "Friendly duel has been rejected" });
		}
		if (notification.type === "redirect") navigate(url);
	} else {
		const duel_session_id = notification.metadata.duel_session_id;
		const duel_type = notification.metadata.duel_type;
		const url = `/duel/${duel_type}/${duel_session_id}`;
		if (notification.type === "redirect") navigate(url);
	}
	return {
		context: {
			persistent: false,
		},
	};
}

function HandleNotificationRelationship(
	notification: Notification,
	fault: FaultTarget,
	navigate: Navigator,
	cfg: HandleNotificationConfig
): HandleNotificationResult {
	if (notification.key === "relationship:request") {
		const tag = notification.metadata.tag;
		return {
			context: {
				persistent: true,
			},
			content: <h3 class="text-moon">{parseNotification(notification)}</h3>,
			extra: (
				<ResponsePanel
					accept_title="Click to accept this friend request"
					accept_class="px-4 py-2 bg-moon text-night-800"
					accept={async () => {
						try {
							await api.post("/relationship/response", {
								requester_tag: tag,
								response: true,
							});
							cfg.defer_delete?.(notification);
						} catch (error) {
							fault.major({
								message: `Failed to remove this pending friend request`,
							});
						}
					}}
					reject_title="Click to dismiss this friend request"
					reject_class="px-4 py-2 border-4 border-pl2-400 text-pl2-400"
					reject={async () => {
						try {
							await api.post("/relationship/response", {
								requester_tag: tag,
								response: false,
							});
							cfg.defer_delete?.(notification);
						} catch (error) {
							fault.major({
								message: `Failed to remove this pending friend request`,
							});
						}
					}}
				/>
			),
		};
	}
	return {
		context: {
			persistent: true,
		},
		content: <h3 class="text-moon">{parseNotification(notification)}</h3>,
	};
}

export function HandleNotification(
	notification: Notification,
	fault: FaultTarget,
	navigate: Navigator,
	cfg: HandleNotificationConfig
): HandleNotificationResult {
	if (notification.key.startsWith("relationship:request")) {
		return HandleNotificationRelationship(
			notification,
			fault,
			navigate,
			cfg
		);
	}
	if (notification.key.startsWith("duel:challenge")) {
		return HandleNotificationDuelChallenge(
			notification,
			fault,
			navigate,
			cfg
		);
	}
	if (notification.key.startsWith("duel:acceptance")) {
		return HandleNotificationDuelAcceptance(
			notification,
			fault,
			navigate,
			cfg
		);
	}
	return {
		context: {
			persistent: false,
		},
	};
}
