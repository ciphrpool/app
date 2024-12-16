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
import { UserSummaryData } from "./side.view";
import { debounce } from "@utils/time";
import { useFault } from "@components/errors/fault";
import UserIcon from "@assets/icons/user.svg?component-solid";

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

	const debounced_call = debounce(
		async (value: string, filter_type: Te_FilterType) => {
			// Validation
			if (ByUsername === filter_type) {
				// check valid user
			} else if (ByTag === filter_type) {
				// check valid user
			}
			console.log({ value, filter_type });
		},
		1000
	);

	const found_users: UserSummaryData[] = Array.from({ length: 10 }, () => {
		return { elo: 1520, username: "Test", tag: "87ABN33A" };
	});

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
					<For each={found_users}>
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
									<Show
										when={user.avatar}
										fallback={<UserIcon class="w-8" />}
									>
										{(url) => (
											<img src={url().toString()} />
										)}
									</Show>
									<h3 class="hover:text-pl1-200 transition-colors ease-in-out duration-200">
										{user.username}
										<span class="text-night-100 uppercase">
											#{user.tag}
										</span>
									</h3>
									<span class="select-none">|</span>
									<h3 class="hover:text-pl1-200 transition-colors ease-in-out duration-200">
										{user.elo}
									</h3>
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
