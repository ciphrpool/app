import HomeHeader from "../../components/headers/HomeHeader";
import Footer from "@components/footers/DefaultFooter";
import SideView, { UserSummaryData } from "@components/views/side.view";
import GraphView from "@components/views/graph.view";
import CalendarView from "@components/views/calendar.view";
import HistoryView from "@components/views/history.view";
import StartView, { Friendly } from "@components/views/start.view";
import { useParams } from "@solidjs/router";
import UserView from "@components/views/user.view";
import StatisticsSummaryView from "@components/views/statistics_summary.view";
import BackButton from "@components/utils/back.button";

function UserPage() {
	const params = useParams();

	const user: UserSummaryData = {
		description:
			"Lorem ipsum dolor sit amet consectetur, adipisicing elit.Reprehenderit nobis voluptate soluta rem vero ducimusblanditiis, ipsum aperiam nostrum dolores deleniti, quaeratmodi perspiciatis ipsam. Eum ab beatae unde ex ea mollitia,facere veniam pariatur ut vero exercitationem praesentium magni quis dolor.",
		elo: 1690,
		tag: "#89PO22WN",
		username: "TestFriend",
	};
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
							<UserView />
							<StatisticsSummaryView />
							<CalendarView />
							<GraphView />
						</div>
						<div class=" h-full flex flex-col gap-4 overflow-hidden">
							<HistoryView />
							{/* Game */}
							<StartView
								duel_preview={{
									duel_type: Friendly,
									opponent_elo: user.elo,
									opponent_tag: user.tag,
									opponent_username: user.username,
								}}
							/>
						</div>
					</section>
				</div>
			</main>
			<Footer />
		</div>
	);
}

export default UserPage;
