import {
	createContext,
	createEffect,
	createResource,
	createSignal,
	JSXElement,
	onMount,
	Resource,
	Show,
	Suspense,
	useContext,
} from "solid-js";
import { api, start_periodic_refresh, UserData } from "./auth";

export const ProtectedContext = createContext<Resource<boolean>>();
export function useProtectedData<T = Resource<boolean>>() {
	return useContext(ProtectedContext) as T;
}

interface ProtectedProviderProps {
	children?: JSXElement;
}

export function ProtectedProvider(props: ProtectedProviderProps) {
	const [is_authenticated] = createResource(async () => {
		try {
			const res = await api.get("/auth/refresh/session");
		} catch (err) {
			console.error(err);
			return false;
		}

		try {
			const res = await api.get("/auth/check");
			start_periodic_refresh();
			return true;
		} catch (err) {
			console.error(err);
		}
		return false;
	});

	return (
		<ProtectedContext.Provider value={is_authenticated}>
			{props.children}
		</ProtectedContext.Provider>
	);
}

export const UserContext = createContext<Resource<UserData | null>>();
export function useUserData<T = Resource<UserData | null>>() {
	return useContext(UserContext) as T;
}

interface UserProviderFallbackProps {}

function UserProviderFallback(props: UserProviderFallbackProps) {
	return <section class="">Loading for user</section>;
}

interface UserProviderProps {
	children?: JSXElement;
}

export function UserProvider(props: UserProviderProps) {
	const is_authenticated = useProtectedData();
	const [user_data, { mutate, refetch }] = createResource(
		is_authenticated,
		async (is_authenticated) => {
			try {
				if (is_authenticated) {
					const res = await api.get("/users/private/me");
					const user: UserData = res.data.user;
					console.log("User Provider Create Resource ", { user });
					return user;
				} else {
					return null;
				}
			} catch (err) {
				return null;
			}
		}
	);
	return (
		<UserContext.Provider value={user_data}>
			{props.children}
		</UserContext.Provider>
	);
}
