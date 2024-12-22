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
					<div class="grow flex flex-col gap-2">
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
					<Suspense fallback={"loading"}>
						<Switch>
							<Match when={!relationship()?.relationship}>
								<button
									title="Send a friend request"
									onclick={async (e) => {
										if (!e.isTrusted) return;
										try {
											await api.post(
												"/relationship/friend",
												{
													friend_tag:
														user_detailed_data()
															?.tag!,
												}
											);
											refetch_relationship();
										} catch (error) {
											fault.major({
												message: `Failed to send the friend request to ${user_detailed_data()?.username}`,
											});
										}
									}}
								>
									<AddIcon class="[&_path]:fill-night-300  [&_path]:hover:fill-pl2-400 [&_path]:hover:transition-all [&_path]:hover:duration-200 [&_path]:hover:ease-in-out" />
								</button>
							</Match>
							<Match
								when={
									relationship()?.relationship
										?.relationshipStatus === "pending" &&
									relationship()?.relationship?.fromUser1
								}
							>
								<div class="flex flex-row gap-4 bg-night-800 border-4 border-night-400 group">
									<p>... pending friend request</p>

									<button
										title="Remove this pending friend request"
										onclick={async (e: MouseEvent) => {
											if (!e.isTrusted) return;
											try {
												await api.post(
													"/relationship/clear_pending",
													{
														friend_tag:
															user_detailed_data()
																?.tag!,
													}
												);
												refetch_relationship();
											} catch (error) {
												fault.major({
													message: `Failed to remove this pending friend request`,
												});
											}
										}}
										class="hidden group:hover:block"
									>
										<CloseIcon class="[&_path]:fill-night-300  [&_path]:hover:fill-ego [&_path]:hover:transition-all [&_path]:hover:duration-200 [&_path]:hover:ease-in-out" />
									</button>
								</div>
							</Match>
							<Match
								when={
									relationship()?.relationship
										?.relationshipStatus === "pending" &&
									!relationship()?.relationship?.fromUser1
								}
							>
								<div class="flex flex-row gap-4 bg-night-800 border-4 border-night-400 group">
									<button
										title="Accept this pending friend request"
										onclick={async (e: MouseEvent) => {
											if (!e.isTrusted) return;
											try {
												await api.post(
													"/relationship/clear_pending",
													{
														friend_tag:
															user_detailed_data()
																?.tag!,
													}
												);
												refetch_relationship();
											} catch (error) {
												fault.major({
													message: `Failed to remove this pending friend request`,
												});
											}
										}}
										class="hidden group:hover:block"
									>
										<CloseIcon class="[&_path]:fill-night-300  [&_path]:hover:fill-ego [&_path]:hover:transition-all [&_path]:hover:duration-200 [&_path]:hover:ease-in-out" />
									</button>
									<button
										title="Reject this pending friend request"
										onclick={async (e: MouseEvent) => {
											if (!e.isTrusted) return;
											try {
												await api.post(
													"/relationship/clear_pending",
													{
														friend_tag:
															user_detailed_data()
																?.tag!,
													}
												);
												refetch_relationship();
											} catch (error) {
												fault.major({
													message: `Failed to remove this pending friend request`,
												});
											}
										}}
										class="hidden group:hover:block"
									>
										<CloseIcon class="[&_path]:fill-night-300  [&_path]:hover:fill-ego [&_path]:hover:transition-all [&_path]:hover:duration-200 [&_path]:hover:ease-in-out" />
									</button>
								</div>
							</Match>
							<Match
								when={
									relationship()?.relationship
										?.relationshipStatus === "accepted"
								}
							>
								<div class="flex flex-row gap-4 bg-night-800 border-4 border-neutral-400 group">
									<p
										title={`Your are friend with ${user_detailed_data()?.username} since ${new Date(relationship()!.relationship!.createdAt).toDateString()}`}
									>
										Friend
									</p>

									<button
										title="Remove this friend"
										onclick={async (e: MouseEvent) => {
											if (!e.isTrusted) return;
											try {
												await api.post(
													"/relationship/unfriend",
													{
														friend_tag:
															user_detailed_data()
																?.tag!,
													}
												);
												refetch_relationship();
											} catch (error) {
												fault.major({
													message: `Failed to remove this pending friend request`,
												});
											}
										}}
										class="hidden group:hover:block"
									>
										<CloseIcon class="grow [&_path]:fill-night-300  [&_path]:hover:fill-ego [&_path]:hover:transition-all [&_path]:hover:duration-200 [&_path]:hover:ease-in-out" />
									</button>
								</div>
							</Match>
						</Switch>
					</Suspense>
				</div>
				<div class="border-l-4 pl-4 border-l-night-500 text-night-100">
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
