import { useNavigate } from "@solidjs/router";
import axios from "axios";
import {
	Accessor,
	createContext,
	createSignal,
	Setter,
	useContext,
} from "solid-js";
import { createStore, SetStoreFunction } from "solid-js/store";

function getCSRFToken(): string | null {
	const cookies = document.cookie.split(";");
	const csrfCookie = cookies.find((cookie) =>
		cookie.trim().startsWith("CSRF-TOKEN=")
	);

	if (csrfCookie) {
		return csrfCookie.split("CSRF-TOKEN=")[1];
	}

	return null;
}

export const api = axios.create({
	baseURL: import.meta.env.API ?? "http://localhost:3000",
	withCredentials: true,
	adapter: "fetch",
});

export const nexuspool = axios.create({
	baseURL: import.meta.env.NEXUSPOOL ?? "http://localhost:8080",
	adapter: "fetch",
});

api.interceptors.request.use((config) => {
	const csrfToken = getCSRFToken();
	if (csrfToken) {
		config.headers["X-CSRF-Token"] = csrfToken;
	}

	const accessToken = localStorage.getItem("ACCESS_TOKEN");
	if (accessToken) {
		config.headers["Authorization"] = `Bearer ${accessToken}`;
	}
	return config;
});

export function start_periodic_refresh() {
	const REFRESH_INTERVAL = 10 * 60 * 1000; // 10 minutes
	let isRefreshing = false;

	async function refreshToken() {
		if (isRefreshing) return;

		isRefreshing = true;
		try {
			const response = await api.get("/auth/refresh/access");
			console.log("Refreshed access token");

			if (response.data.access_token) {
				localStorage.setItem(
					"ACCESS_TOKEN",
					response.data.access_token
				);
			}
		} catch (error) {
			console.error("Refresh failed:", error);
			localStorage.removeItem("ACCESS_TOKEN");
		} finally {
			isRefreshing = false;
		}
	}

	// Set up periodic refresh
	console.debug("start periodic refresh");
	setInterval(refreshToken, REFRESH_INTERVAL);

	// Set up 401 interceptor
	api.interceptors.response.use(
		(response) => response,
		async (error) => {
			if (error.response?.status === 401 && !error.config._retry) {
				error.config._retry = true;
				await refreshToken();

				const token = localStorage.getItem("ACCESS_TOKEN");
				if (token) {
					error.config.headers["Authorization"] = `Bearer ${token}`;
					return api(error.config);
				}
			}
			return Promise.reject(error);
		}
	);
}

export async function signIn() {
	try {
		const res = await api.get("/auth/login/google");
		const auth_url = res.data.auth_url;

		const authResponse = await axios.get(auth_url, {
			withCredentials: true,
		});

		const location = authResponse.headers["location"];
		if (location) {
			// window.location.href = location;
			const res = await axios.get(location, {
				withCredentials: true,
			});
			localStorage.setItem("ACCESS_TOKEN", res.data.access_token);
			window.location.reload();
		}
	} catch (error) {
		console.error(error);
	}
}

export type UserData = {
	username: string;
	tag: string;
	country: string;
	profilePictureUrl: string;
	bio: string;
	elo: number;
};

export class ProtectedData {
	is_authenticated: Accessor<boolean>;
	private set_authenticated: Setter<boolean>;

	constructor() {
		const [is_authenticated, set_authenticated] =
			createSignal<boolean>(false);

		this.is_authenticated = is_authenticated;
		this.set_authenticated = set_authenticated;
	}

	async init(): Promise<boolean> {
		try {
			const res = await api.get("/auth/refresh/session");
		} catch (err) {
			console.error(err);
			this.set_authenticated(false);
			return false;
		}

		try {
			const res = await api.get("/auth/check");
			this.set_authenticated(true);
			return true;
		} catch (err) {
			console.error(err);
			this.set_authenticated(false);
		}
		return false;
	}
}
