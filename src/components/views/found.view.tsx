import CalendarView from "./calendar.view";
import GraphView from "./graph.view";
import StatisticsSummaryView from "./statistics_summary.view";
import UserView from "./user.view";

interface FoundViewProps {}

function FoundView(props: FoundViewProps) {
	return (
		<section
			class="
            w-full h-full 
            pl-4 border-l-4 border-l-night-500
            flex flex-col gap-4
            col-span-2"
		>
			<UserView />
			<StatisticsSummaryView />
			<CalendarView />
			<GraphView />
		</section>
	);
}

export default FoundView;
