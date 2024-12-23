import {
	Accessor,
	createResource,
	Match,
	onMount,
	Show,
	Suspense,
	Switch,
} from "solid-js";
import UserIcon from "@assets/icons/user.svg?component-solid";
import {
	GetRelationshipResult,
	UserDetailedData,
	UserSummaryData,
} from "@utils/api.type";
import { api } from "@utils/auth/auth";
import { useFault } from "@components/errors/fault";
import Avatar from "@components/utils/avatar";
import AddIcon from "@assets/icons/add.svg?component-solid";
import CloseIcon from "@assets/icons/close.svg?component-solid";
import ValidIcon from "@assets/icons/valid.svg?component-solid";

interface RelationshipButtonsProps {
	get_tag: () => string | null;
}

function RelationshipButtons(props: RelationshipButtonsProps) {
	const fault = useFault();
	const [relationship, { refetch: refetch_relationship }] = createResource(
		props.get_tag,
		async (tag: string) => {
			try {
				const res = await api.get("/relationship/between", {
					params: { user_tag: tag },
				});
				const relationship: GetRelationshipResult = res.data;
				console.log(relationship);

				return relationship;
			} catch (error) {
				fault.minor({ message: `${tag} was not found` });
				return undefined;
			}
		}
	);

	return (
		<Suspense fallback={"loading"}>
			<Switch>
				<Match when={!relationship()?.relationship}>
					<button
						title="Send a friend request"
						onclick={async (e) => {
							if (!e.isTrusted) return;
							try {
								await api.post("/relationship/friend", {
									friend_tag: props.get_tag()!,
								});
								refetch_relationship();
							} catch (error) {
								fault.major({
									message: `Failed to send the friend request`,
								});
							}
						}}
					>
						<AddIcon class="[&_path]:fill-night-300  [&_path]:hover:fill-pl2-400 [&_path]:hover:transition-all [&_path]:hover:duration-200 [&_path]:hover:ease-in-out" />
					</button>
				</Match>
				<Match
					when={
						relationship()?.relationship?.relationshipStatus ===
							"pending" &&
						relationship()?.relationship?.fromUser1 === true
					}
				>
					<div class="flex flex-row px-4 py-2 gap-4 bg-night-800 border-4 items-center border-night-400 group">
						<p>... pending friend request</p>

						<button
							title="Remove this pending friend request"
							onclick={async (e: MouseEvent) => {
								if (!e.isTrusted) return;
								try {
									await api.post(
										"/relationship/clear_pending",
										{
											friend_tag: props.get_tag()!,
										}
									);
									refetch_relationship();
								} catch (error) {
									fault.major({
										message: `Failed to remove this pending friend request`,
									});
								}
							}}
							class="hidden group-hover:block"
						>
							<CloseIcon class="[&_path]:fill-night-300  [&_path]:hover:fill-ego [&_path]:hover:transition-all [&_path]:hover:duration-200 [&_path]:hover:ease-in-out" />
						</button>
					</div>
				</Match>
				<Match
					when={
						relationship()?.relationship?.relationshipStatus ===
							"pending" &&
						relationship()?.relationship?.fromUser1 === false
					}
				>
					<div class="flex flex-row gap-4 grow">
						<button
							title="Accept this pending friend request"
							onclick={async (e: MouseEvent) => {
								if (!e.isTrusted) return;
								try {
									await api.post("/relationship/response", {
										requester_tag: props.get_tag()!,
										response: true,
									});
									refetch_relationship();
								} catch (error) {
									fault.major({
										message: `Failed to remove this pending friend request`,
									});
								}
							}}
							class=""
						>
							<ValidIcon class="w-8 min-w-8 max-w-8 h-8 min-h-8 max-h-8 [&_path]:fill-pl1-400  [&_path]:hover:fill-pl1-200 [&_path]:hover:transition-all [&_path]:hover:duration-200 [&_path]:hover:ease-in-out" />
						</button>
						<button
							title="Reject this pending friend request"
							onclick={async (e: MouseEvent) => {
								if (!e.isTrusted) return;
								try {
									await api.post("/relationship/response", {
										requester_tag: props.get_tag()!,
										response: false,
									});
									refetch_relationship();
								} catch (error) {
									fault.major({
										message: `Failed to remove this pending friend request`,
									});
								}
							}}
							class=""
						>
							<CloseIcon class="w-8 min-w-8 max-w-8 h-8 min-h-8 max-h-8 [&_path]:fill-night-300  [&_path]:hover:fill-ego [&_path]:hover:transition-all [&_path]:hover:duration-200 [&_path]:hover:ease-in-out" />
						</button>
					</div>
				</Match>
				<Match
					when={
						relationship()?.relationship?.relationshipStatus ===
						"accepted"
					}
				>
					<div class="flex flex-row gap-4 px-4 py-2 bg-night-800 border-4 items-center border-neutral-400 group">
						<span
							title={`Your are friend since ${new Date(relationship()!.relationship!.createdAt).toDateString()}`}
							class="cursor-pointer select-none"
						>
							followed
						</span>

						<button
							title="Remove this friend"
							onclick={async (e: MouseEvent) => {
								if (!e.isTrusted) return;
								try {
									await api.post("/relationship/unfriend", {
										friend_tag: props.get_tag()!,
									});
									refetch_relationship();
								} catch (error) {
									fault.major({
										message: `Failed to remove this pending friend request`,
									});
								}
							}}
							class="hidden group-hover:block"
						>
							<CloseIcon class="grow [&_path]:fill-night-300  [&_path]:hover:fill-ego [&_path]:hover:transition-all [&_path]:hover:duration-200 [&_path]:hover:ease-in-out" />
						</button>
					</div>
				</Match>
			</Switch>
		</Suspense>
	);
}

interface UserViewProps {
	class?: string;
	get_tag: () => string | null;
}

function UserView(props: UserViewProps) {
	const fault = useFault();
	const [user_detailed_data] = createResource(
		props.get_tag,
		async (tag: string) => {
			try {
				const res = await api.get("/users/public/tag", {
					params: { tag, detailed: true },
				});
				const user: UserDetailedData = res.data.user;
				return user;
			} catch (error) {
				fault.minor({ message: `${tag} was not found` });
				return undefined;
			}
		}
	);

	const [relationship, { refetch: refetch_relationship }] = createResource(
		props.get_tag,
		async (tag: string) => {
			try {
				const res = await api.get("/relationship/between", {
					params: { user_tag: tag },
				});
				const relationship: GetRelationshipResult = res.data;
				return relationship;
			} catch (error) {
				fault.minor({ message: `${tag} was not found` });
				return undefined;
			}
		}
	);

	return (
		<Suspense fallback={<UserViewFallback />}>
			<section class={props.class}>
				{/* User */}
				<div class="flex gap-8 items-center">
					{/* User Header */}
					<Avatar class="w-16" />
					<div class="grow flex flex-col gap-4">
						{/* User Info */}
						<h1 class="text-2xl tracking-widest transition-colors ease-in-out">
							{user_detailed_data()?.username}
						</h1>
						<h3 class="dm-sans-400 text-night-100 transition-colors ease-in-out">
							{user_detailed_data()?.tag}
						</h3>
						<h2 class="text-ego transition-colors ease-in-out">
							ELO : {user_detailed_data()?.elo}
						</h2>
					</div>
					<div class="w-fit self-end">
						<RelationshipButtons get_tag={props.get_tag} />
					</div>
				</div>
				<div class="border-l-4 pl-4 pt-4 border-l-night-500 text-night-100">
					{/* Description */}
					<p class="line-clamp-3">{user_detailed_data()?.bio}</p>
				</div>
			</section>
		</Suspense>
	);
}

interface UserViewFallbackProps {
	class?: string;
}

function UserViewFallback(props: UserViewFallbackProps) {
	return <section class={props.class}>Loading</section>;
}

export default UserView;
