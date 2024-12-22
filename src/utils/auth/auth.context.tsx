import {
	createContext,
	createEffect,
	createResource,
	JSXElement,
	Resource,
	Show,
	Suspense,
	useContext,
} from "solid-js";
import { api, ProtectedData, start_periodic_refresh, UserData } from "./auth";

export const ProtectedContext = createContext<ProtectedData>();
export function useProtectedData<T = ProtectedData>() {
	return useContext(ProtectedContext) as T;
}

interface ProtectedProviderProps {
	children?: JSXElement;
}

export function ProtectedProvider(props: ProtectedProviderProps) {
	const protected_data = new ProtectedData();
	createEffect(async () => {
		const is_authenticated = await protected_data.init();
		if (is_authenticated) {
			console.debug("start periodic refresh");
			start_periodic_refresh();
		}
	});
	return (
		<ProtectedContext.Provider value={protected_data}>
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
	return <section class="">Loading</section>;
}

interface UserProviderProps {
	children?: JSXElement;
}

export function UserProvider(props: UserProviderProps) {
	const protected_data = useProtectedData();
	const [user_data, { mutate, refetch }] = createResource(async () => {
		try {
			if (protected_data.is_authenticated()) {
				const res = await api.get("/users/private/me");
				const user: UserData = res.data.user;
				return user;
			} else {
				return null;
			}
		} catch (err) {
			return null;
		}
	});
	return (
		<UserContext.Provider value={user_data}>
			<Show when={user_data()} fallback={<UserProviderFallback />}>
				{props.children}
			</Show>
		</UserContext.Provider>
	);
}
