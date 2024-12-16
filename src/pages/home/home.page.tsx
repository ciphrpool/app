import HomeHeader from "../../components/headers/HomeHeader";
import Footer from "@components/footers/DefaultFooter";
import SideView from "@components/views/side.view";
import GraphView from "@components/views/graph.view";
import CalendarView from "@components/views/calendar.view";
import HistoryView from "@components/views/history.view";
import BinariesView from "@components/views/binaries.view";
import StartView from "@components/views/start.view";

function HomePage() {
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
							<GraphView />
							<CalendarView />
							<HistoryView />
						</div>
						<div class=" h-full flex flex-col gap-4 overflow-hidden">
							{/* Game */}
							<BinariesView />
							<StartView />
						</div>
					</section>
				</div>
			</main>
			<Footer />
		</div>
	);
}

export default HomePage;
