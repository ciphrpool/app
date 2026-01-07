import { AppDatabase, Module } from "./db";

export class ModuleNotFoundError extends Error {
	constructor(name: string) {
		super(`Module with name ${name} not found`);
		this.name = "ModuleNotFoundError";
	}
}

export const DB_MODULES = {
	async upsert(
		db: AppDatabase,
		name: string,
		updates: { name?: string; file?: string; hmac?: string }
	): Promise<Module> {
		const existing = await db.modules.where("name").equals(name).first();

		if (existing) {
			// Update existing module
			await db.modules
				.where("name")
				.equals(name)
				.modify({
					...updates,
					last_modified_at: new Date(),
				});

			// If name was changed, get by new name, otherwise get by old name
			const updated = await db.modules
				.where("name")
				.equals(updates.name || name)
				.first();

			if (!updated) throw new ModuleNotFoundError(updates.name || name);
			return updated;
		} else {
			// Create new module
			const id = await db.modules.add({
				name: updates.name || name,
				file: updates.file || "",
				hmac: updates.hmac || "",
				created_at: new Date(),
				last_modified_at: new Date(),
			});

			const created = await db.modules.get(id);
			if (!created) throw new ModuleNotFoundError(name);
			return created;
		}
	},

	async delete(db: AppDatabase, name: string): Promise<void> {
		const count = await db.modules.where("name").equals(name).delete();
		if (count === 0) throw new ModuleNotFoundError(name);
	},

	async clear(db: AppDatabase): Promise<void> {
		await db.modules.clear();
	},

	async get(db: AppDatabase, name: string): Promise<Module | undefined> {
		return db.modules.where("name").equals(name).first();
	},
};
