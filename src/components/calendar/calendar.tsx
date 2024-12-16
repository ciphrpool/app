import { createSignal, createEffect, onMount } from "solid-js";
import * as d3 from "d3";

type CalendarData = {
	date: Date;
	value: number;
};

type HeatmapTheme = {
	font_family?: string;
	cell_size?: number;
	range_cell_colors?: string[];
	default_cell_color?: string;
	label_color?: string;
	gap?: number;
	weekday_labels?: string[];
	month_labels?: string[];
};

type HeatmapCalendarProps = {
	data: CalendarData[];
	year: number;
	theme?: HeatmapTheme;
	onCellClick?: (data: CalendarData) => void;
};

const DefaultTheme: HeatmapTheme = {
	font_family: "DM Sans, sans-serif",
	cell_size: 10,
	label_color: "#ADADAD",
	range_cell_colors: ["#794457", "#FFAFCC"],
	default_cell_color: "#333333",
	gap: 2,
	weekday_labels: ["Mon - ", "Wed - ", "Fri - ", "Sun - "],
	month_labels: [
		"Jan",
		"Feb",
		"Mar",
		"Apr",
		"May",
		"Jun",
		"Jul",
		"Aug",
		"Sep",
		"Oct",
		"Nov",
		"Dec",
	],
};

function HeatmapCalendar(props: HeatmapCalendarProps) {
	const [container_ref, set_container_ref] =
		createSignal<HTMLDivElement | null>(null);
	const theme = { ...DefaultTheme, ...props.theme };

	function create_calendar() {
		if (!container_ref()) return;

		// Clear previous content
		d3.select(container_ref()).selectAll("*").remove();

		const container_width = container_ref()?.clientWidth || 800;
		const cell_size = Math.min(
			theme.cell_size!,
			(container_width - 50) / 53 // 53 weeks max in a year
		);

		// Calculate dimensions
		const width = cell_size * 53 + 50; // 53 weeks + padding for labels
		const height = cell_size * 7 + 30; // 7 days + padding for labels

		// Create SVG
		const svg = d3
			.select(container_ref())
			.append("svg")
			.attr("width", "100%")
			.attr("height", height)
			.attr("viewBox", `0 0 ${width} ${height}`)
			.attr("font-family", theme.font_family!);

		// Process data
		const time_format = d3.timeFormat("%Y-%m-%d");
		const data_map = new Map(
			props.data.map((d) => [time_format(d.date), d])
		);

		const date_range = d3.timeDays(
			new Date(props.year, 0, 1),
			new Date(props.year + 1, 0, 1)
		);

		// Create color scale
		const color_scale = d3
			.scaleSequential()
			.domain([0, d3.max(props.data, (d) => d.value) || 1])
			.interpolator(
				d3.interpolateRgb(
					theme.range_cell_colors![0],
					theme.range_cell_colors![1]
				)
			);

		// Add weekday labels
		svg.selectAll(".weekday-label")
			.data(theme.weekday_labels!)
			.enter()
			.append("text")
			.attr("class", "weekday-label")
			.attr("x", 35) // Moved labels closer to cells
			.attr("y", (_, i) => i * (cell_size * 2) + cell_size + 20 + -2) // Adjusted to align with every other row
			.style("font-size", `${cell_size * 1}px`)
			.style("text-anchor", "end") // Right-align the text
			.style("fill", theme.label_color!)
			.text((d) => d);

		// Add month labels
		svg.selectAll(".month-label")
			.data(d3.range(12))
			.enter()
			.append("text")
			.attr("class", "month-label")
			.attr("x", (d) => {
				const first_day = new Date(props.year, d, 1);
				return (
					Math.floor(
						d3.timeWeek.count(d3.timeYear(first_day), first_day) *
							cell_size
					) + 50
				);
			})
			.attr("y", 15)
			.style("font-size", `${cell_size}px`)
			.style("fill", theme.label_color!)
			.style("text-anchor", "start")
			.text((d) => theme.month_labels![d]);

		// Add cells
		svg.selectAll(".day")
			.data(date_range)
			.enter()
			.append("rect")
			.attr("class", "day")
			.attr("x", (d) => {
				return d3.timeWeek.count(d3.timeYear(d), d) * cell_size + 50;
			})
			.attr("y", (d) => {
				return d.getDay() * cell_size + 20;
			})
			.attr("width", cell_size - theme.gap!)
			.attr("height", cell_size - theme.gap!)
			.style("fill", (d) => {
				const date_key = time_format(d);
				return data_map.has(date_key)
					? color_scale(data_map.get(date_key)!.value)
					: theme.default_cell_color!;
			})
			.style("cursor", "pointer")
			.on("click", (event, d) => {
				const date_key = time_format(d);
				if (data_map.has(date_key) && props.onCellClick) {
					props.onCellClick(data_map.get(date_key)!);
				}
			});
	}

	// Recreate calendar on container resize
	let resize_observer: ResizeObserver;

	onMount(() => {
		create_calendar();

		resize_observer = new ResizeObserver(() => {
			create_calendar();
		});

		if (container_ref()) {
			resize_observer.observe(container_ref()!);
		}

		return () => {
			if (container_ref()) {
				resize_observer.unobserve(container_ref()!);
			}
		};
	});

	createEffect(() => {
		if (props.data || props.year || props.theme) {
			create_calendar();
		}
	});

	return <div ref={set_container_ref} class="w-full h-full" />;
}

export default HeatmapCalendar;
