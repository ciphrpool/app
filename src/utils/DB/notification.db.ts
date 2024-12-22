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
		await db.notifications.add(notification);
	},

	async delete(db: AppDatabase, id: string): Promise<void> {
		const count = await db.modules.where("id").equals(id).delete();
		if (count === 0) return;
	},

	async clear(db: AppDatabase): Promise<void> {
		await db.notifications.clear();
	},
};
