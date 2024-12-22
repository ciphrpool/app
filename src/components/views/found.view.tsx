import CalendarView from "./calendar.view";
import GraphView from "./graph.view";
import { useSearchedUser } from "./search.view";
import StatisticsSummaryView from "./statistics_summary.view";
import UserView from "./user.view";

interface FoundViewProps {}

function FoundView(props: FoundViewProps) {
	const [found_user_summary, _] = useSearchedUser();
	return (
		<section
			class="
            w-full h-full 
            pl-4 border-l-4 border-l-night-500
            flex flex-col gap-4
            col-span-2"
		>
			<UserView get_tag={() => found_user_summary()?.tag ?? null} />
			<StatisticsSummaryView />
			<CalendarView />
			<GraphView />
		</section>
	);
}

export default FoundView;
