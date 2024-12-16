import { ParentComponent, createContext, useContext } from "solid-js";
import { AppDatabase, db } from "./db";

const DatabaseContext = createContext<AppDatabase>();

export const DatabaseProvider: ParentComponent = (props) => {
	return (
		<DatabaseContext.Provider value={db}>
			{props.children}
		</DatabaseContext.Provider>
	);
};

export function useDatabase<T = AppDatabase>() {
	return useContext(DatabaseContext) as T;
}
