import { AppDatabase, Module } from "./db";
import { Notification } from "@utils/DB/db";

export const DB_NOTIFICATIONS = {
	async all(db: AppDatabase): Promise<Array<Notification>> {
		return await db.notifications
			.orderBy("created_at")
			.reverse() // most recent first
			.toArray();
	},

	async insert(db: AppDatabase, notification: Notification): Promise<void> {
		console.log("Notification : Inserted", { notification });

		await db.notifications.add(notification, notification.id);
	},

	async delete(db: AppDatabase, id: string): Promise<void> {
		const count = await db.notifications.where("id").equals(id).delete();
		console.log("Notification : Deleted ", { id, count });

		if (count === 0) return;
	},

	async clear(db: AppDatabase): Promise<void> {
		await db.notifications.clear();
	},
};
