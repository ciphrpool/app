import {
	Accessor,
	createContext,
	createSignal,
	For,
	Match,
	Setter,
	Show,
	Switch,
	useContext,
} from "solid-js";
import { debounce } from "@utils/time";
import { useFault } from "@components/errors/fault";
import UserIcon from "@assets/icons/user.svg?component-solid";
import { GetUsersSummaryResult, UserSummaryData } from "@utils/api.type";
import { api } from "@utils/auth/auth";
import Avatar from "@components/utils/avatar";

const ByUsername = Symbol("ByUsername");
const ByTag = Symbol("ByTag");
type Te_FilterType = typeof ByUsername | typeof ByTag;

export const SearchedUserContext =
	createContext<
		[
			Accessor<UserSummaryData | undefined>,
			Setter<UserSummaryData | undefined>,
		]
	>();
export function useSearchedUser<
	T = [
		Accessor<UserSummaryData | undefined>,
		Setter<UserSummaryData | undefined>,
	],
>() {
	return useContext(SearchedUserContext) as T;
}

interface SearchViewProps {}

function SearchView(props: SearchViewProps) {
	const [filter, set_filter] = createSignal<Te_FilterType>(ByUsername);
	const [found_user_summary, set_found_user_summary] = useSearchedUser();
	const [search_input, update_search_input] = createSignal("");
	const fault = useFault();

	const [found_users, set_found_users] = createSignal<GetUsersSummaryResult>(
		[]
	);

	const debounced_call = debounce(
		async (value: string, filter_type: Te_FilterType) => {
			// Validation
			if (ByUsername === filter_type) {
				// check valid user
			} else if (ByTag === filter_type) {
				// check valid tag
				if (value.length != 8) return;
			}

			try {
				if (ByUsername === filter_type) {
					const res = await api.get("/users/public/search", {
						params: { username: value, detailed: false },
					});
					const found_users: GetUsersSummaryResult = res.data.users;
					set_found_users(found_users);
				} else if (ByTag === filter_type) {
					const res = await api.get("/users/public/tag", {
						params: { tag: value, detailed: false },
					});
					const found_user: UserSummaryData = res.data.user;
					set_found_users([found_user]);
				}
			} catch (error) {}
		},
		500
	);

	return (
		<section class="flex flex-col gap-4 h-full">
			<div class="flex flex-col">
				<input
					class="placeholder:text-night-300 bg-night-800 
                            outline-none px-4 py-2
                            w-full"
					placeholder="Search someone ..."
					autofocus
					value={search_input()}
					onInput={(e: InputEvent) => {
						if (!e.isTrusted) return;
						if (!(e.currentTarget as HTMLInputElement).value)
							return;
						const value = (e.currentTarget as HTMLInputElement)
							.value;
						update_search_input(value);
						debounced_call(value, filter());
					}}
				/>
				<Switch>
					<Match when={filter() === ByUsername}>
						<button
							title="Click to search by Tag"
							class="underline underline-offset-4 self-end text-night-200 border-night-300 px-4 py-1"
							onclick={() => {
								set_filter(ByTag);
								if (search_input() !== "") {
									debounced_call(search_input(), filter());
								}
							}}
						>
							By Username
						</button>
					</Match>
					<Match when={filter() === ByTag}>
						<button
							title="Click to search by Username"
							class="underline underline-offset-4 self-end text-night-200 border-night-300 px-4 py-1"
							onclick={() => {
								set_filter(ByUsername);
								if (search_input() !== "") {
									debounced_call(search_input(), filter());
								}
							}}
						>
							By Tag
						</button>
					</Match>
				</Switch>
			</div>
			<div class="w-full flex gap-5 justify-center">
				{/* Three Dot */}
				<div class="bg-moon w-1 h-1"></div>
				<div class="bg-moon w-1 h-1"></div>
				<div class="bg-moon w-1 h-1"></div>
			</div>
			<section class="flex flex-col gap-4 h-full overflow-hidden">
				{/* Found users summaries */}
				<p class="text-night-300">
					Found {found_users.length} player
					{found_users.length > 1 ? "s" : ""}
				</p>
				<div class="flex flex-col gap-4 h-full overflow-y-auto">
					<For each={found_users()}>
						{(user) => {
							return (
								<button
									title="Show this player"
									class="p-4 flex flex-row gap-4 
                                        items-center hover:bg-night-600
                                        hover:transition-colors hover:duration-200
                                        hover:ease-in-out"
									onclick={() => {
										set_found_user_summary(user);
									}}
								>
									<Avatar class="min-w-8 w-8" />
									<div class="overflow-x-clip flex flex-col items-start">
										<h3 class="hover:text-pl1-200 transition-colors ease-in-out duration-200">
											{user.username}
											<span class="text-night-100 uppercase">
												#{user.tag}
											</span>
										</h3>
										<h3 class="hover:text-pl1-200 transition-colors ease-in-out duration-200">
											elo : {user.elo}
										</h3>
									</div>
								</button>
							);
						}}
					</For>
				</div>
			</section>
		</section>
	);
}

export default SearchView;
