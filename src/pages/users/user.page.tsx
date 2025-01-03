import HomeHeader from "../../components/headers/HomeHeader";
import Footer from "@components/footers/DefaultFooter";
import SideView from "@components/views/side.view";
import GraphView from "@components/views/graph.view";
import CalendarView from "@components/views/calendar.view";
import HistoryView from "@components/views/history.view";
import StartView, { Friendly } from "@components/views/start.view";
import { useParams } from "@solidjs/router";
import UserView from "@components/views/user.view";
import StatisticsSummaryView from "@components/views/statistics_summary.view";
import BackButton from "@components/utils/back.button";
import { UserSummaryData } from "@utils/api.type";
import { createResource, Show, Suspense } from "solid-js";
import { api } from "@utils/auth/auth";
import { useFault } from "@components/errors/fault";

function UserPage() {
	const params = useParams();
	const fault = useFault();

	const [user_summary_data, { mutate, refetch }] = createResource(
		() => params.tag,
		async (tag: string) => {
			try {
				const res = await api.get("/users/public/tag", {
					params: { tag, detailed: false },
				});
				const user: UserSummaryData = res.data.user;
				console.log(user);

				return user;
			} catch (error) {
				fault.minor({ message: `${tag} was not found` });
				return undefined;
			}
		}
	);

	return (
		<div class="flex flex-col h-screen max-h-screen bg-night-600">
			<HomeHeader />
			<main class=" h-full justify-items-center p-4 dm-mono-medium flex-grow grid overflow-hidden">
				<div class="w-3/4 h-full grid grid-cols-3 gap-4  overflow-hidden ">
					<SideView />
					<section class=" h-full col-span-2 p-4 grid grid-cols-3  gap-4 bg-night-700  overflow-hidden ">
						{/* Main View */}
						<div class=" h-full col-span-2  flex flex-col gap-4  overflow-hidden ">
							{/* Dashboard */}
							<BackButton />
							<UserView get_tag={() => params.tag} />
							<StatisticsSummaryView />
							<CalendarView />
							<GraphView />
						</div>
						<div class=" h-full flex flex-col gap-4 overflow-hidden">
							{/* Game */}
							<Show
								when={user_summary_data()}
								fallback={"loading"}
							>
								{(user_summary_data) => (
									<>
										<HistoryView against={{
											tag:user_summary_data().tag,
											username :user_summary_data().username
										}}/>
										<StartView
											duel_preview={{
												duel_type: Friendly,
												opponent_elo:
													user_summary_data().elo,
												opponent_tag:
													user_summary_data().tag,
												opponent_username:
													user_summary_data().username,
											}}
										/>
									</>
								)}
							</Show>
						</div>
					</section>
				</div>
			</main>
			<Footer />
		</div>
	);
}

export default UserPage;
