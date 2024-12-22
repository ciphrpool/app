import Dexie, { Table } from "dexie";

export interface Module {
	id?: number;
	name: string;
	file: string;
	created_at: Date;
	last_modified_at: Date;
}

export type NotificationType =
	| "redirect"
	| "message"
	| "ping"
	| "alert"
	| "connected";
export type NotificationPriority = 1 /* LOW */ | 2 /* MEDIUM */ | 3; /* HIGH */

export interface Notification {
	id: string;
	type: NotificationType;
	key: string;
	content: any;
	created_at: string;
	priority: NotificationPriority;
	metadata: any;
}

export class AppDatabase extends Dexie {
	modules!: Table<Module, number>;
	notifications!: Table<Notification, string>;

	constructor() {
		super("AppDatabase");
		this.version(1).stores({
			modules: "++id, name",
			notifications: "id, type, created_at",
		});

		// Add hooks for automatic date handling
		this.modules.hook("creating", function (primary_key, obj) {
			obj.created_at = new Date();
			obj.last_modified_at = new Date();
		});

		this.modules.hook(
			"updating",
			function (modifications, primary_key, obj) {
				if (typeof modifications === "object") {
					(modifications as Module).last_modified_at = new Date();
				}
			}
		);
	}
}

export const db = new AppDatabase();
