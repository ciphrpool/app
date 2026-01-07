import HeatmapCalendar from "@components/calendar/calendar";

interface CalendarViewProps {}

function CalendarView(props: CalendarViewProps) {
	return (
		<section class="p-4 bg-night-600">
			{/* Calendar */}
			<HeatmapCalendar
				data={Array.from({ length: 365 }, (_, i) => {
					const start_date = new Date(2024, 0, 1); // Start from January 1st, 2024
					const current_date = new Date(start_date);
					current_date.setDate(start_date.getDate() + i);

					return {
						date: current_date,
						value: Math.floor(Math.random() * 10) + 1, // Random value between 1 and 10
					};
				})}
				year={2024}
			/>
		</section>
	);
}

export default CalendarView;
