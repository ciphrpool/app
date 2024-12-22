import { onMount, onCleanup, splitProps } from "solid-js";
import * as d3 from "d3";

// Define types for our data and props
type DataPoint = {
	x: Date;
	y: number;
};

export const Month = Symbol("Month");
export const Year = Symbol("Year");
export type Te_TimePrecision = typeof Month | typeof Year;

type GraphProps = {
	data: DataPoint[];
	line_color?: string;
	grid_color?: string;
	label_color?: string;
	time_precision?: Te_TimePrecision;
	margin?: {
		top: number;
		right: number;
		bottom: number;
		left: number;
	};
};

const DEFAULT_PROPS = {
	line_color: "#4085A0",
	grid_color: "#474747",
	label_color: "#ADADAD",
	time_precision: Month,
	margin: {
		top: 30,
		right: 0,
		bottom: 30,
		left: 0,
	},
} as const;

function formatDate(date: Date, time_precision: Te_TimePrecision): string {
	const months = [
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
	];
	const day = date.getDate().toString().padStart(2, "0");
	const month = months[date.getMonth()];
	const year = date.getFullYear();

	return time_precision === Month
		? `${day} ${month}`
		: `${day} ${month} ${year}`;
}

function Graph(props: GraphProps) {
	// Default values for optional props
	const [local, rest] = splitProps(props, ["data"]);
	const [options] = splitProps(
		rest,
		Object.keys(DEFAULT_PROPS) as (keyof typeof DEFAULT_PROPS)[]
	);

	let svg_ref: SVGSVGElement | undefined;
	let container_ref: HTMLDivElement | undefined;
	let resize_observer: ResizeObserver;
	let resize_timeout: number;

	// Function to create/update the graph
	function createGraph() {
		if (!container_ref) return;
		if (!svg_ref) return;

		const margin = options.margin || DEFAULT_PROPS.margin;
		const line_color = options.line_color || DEFAULT_PROPS.line_color;
		const grid_color = options.grid_color || DEFAULT_PROPS.grid_color;
		const label_color = options.label_color || DEFAULT_PROPS.label_color;
		const time_precision =
			options.time_precision || DEFAULT_PROPS.time_precision;

		// Clear previous content
		d3.select(svg_ref).selectAll("*").remove();

		// Get container dimensions from the wrapper div
		const container_bounds = container_ref.getBoundingClientRect();
		const container_width = container_bounds.width;
		const container_height = container_bounds.height;

		// Calculate actual chart dimensions
		const width = container_width - margin.left - margin.right;
		const height = container_height - margin.top - margin.bottom;

		// Create scales
		// d3.extent returns the min and max values in the data
		const x_extent = d3.extent(local.data, (d) => d.x) as [Date, Date];
		const x_domain: [Date, Date] = [
			new Date(x_extent[0].getTime()),
			new Date(x_extent[1].getTime()),
		];

		// Calculate y domain with padding
		const y_extent = d3.extent(local.data, (d) => d.y) as [number, number];
		const y_range = y_extent[1] - y_extent[0];
		const y_domain: [number, number] = [
			Math.floor((y_extent[0] - y_range * 0.5) / 100) * 100, // Round down to nearest 100
			Math.ceil((y_extent[1] + y_range * 0.25) / 100) * 100, // Round up to nearest 100
		];

		const x_scale = d3.scaleTime().domain(x_domain).range([0, width]);

		const y_scale = d3.scaleLinear().domain(y_domain).range([height, 0]);

		// Create the SVG container
		const svg = d3
			.select(svg_ref)
			.attr("width", container_width)
			.attr("height", container_height);

		svg.style("font-family", "DM Sans, sans-serif");

		// Create a group element for the chart content with margins
		const chart_group = svg
			.append("g")
			.attr("transform", `translate(${margin.left},${margin.top})`);

		// Create grid lines container (added before the line to be in background)
		const grid_group = chart_group.append("g").attr("class", "grid-lines");

		// Add Y axis
		const y_ticks = [];
		for (let i = y_domain[0]; i <= y_domain[1]; i += 100) {
			y_ticks.push(i);
		}

		// Add horizontal grid lines with labels inside
		const grid_lines = grid_group
			.selectAll(".grid-line")
			.data(y_ticks)
			.enter()
			.append("g");

		grid_lines
			.append("line")
			.attr("class", "grid-line")
			.attr("x1", 0)
			.attr("x2", width)
			.attr("y1", (d) => y_scale(d))
			.attr("y2", (d) => y_scale(d))
			.attr("stroke", grid_color)
			.attr("stroke-width", 1)
			.attr("shape-rendering", "crispEdges");

		// Add y-axis labels inside the graph
		grid_lines
			.append("text")
			.attr("class", "y-label")
			.attr("x", 5) // Small padding from the left edge
			.attr("y", (d) => y_scale(d))
			.attr("dy", "-0.5em") // Vertical alignment
			.style("fill", label_color) // Label color
			.style("font-family", "DM Sans, sans-serif")
			.text((d) => d3.format("d")(d));

		// Create the line generator
		// d3.line() creates a function that generates the SVG path data
		const line = d3
			.line<DataPoint>()
			.x((d: DataPoint) => x_scale(d.x))
			.y((d: DataPoint) => y_scale(d.y))
			.curve(d3.curveCardinal.tension(0.7));

		// Create area generator
		const area = d3
			.area<DataPoint>()
			.x((d) => x_scale(d.x))
			.y0(height) // Bottom of the area
			.y1((d) => y_scale(d.y)) // Top of the area
			.curve(d3.curveCardinal.tension(0.7));

		// Add the area
		chart_group
			.append("path")
			.datum(props.data)
			.attr("fill", line_color)
			.attr("fill-opacity", 0.3)
			.attr("d", area);

		// Add the line path
		chart_group
			.append("path")
			.datum(props.data)
			.attr("fill", "none")
			.attr("stroke", line_color)
			.attr("stroke-width", 2)
			.attr("d", line);

		const optimal_tick_count = Math.max(
			3,
			Math.min(5, Math.floor(width / 120))
		);

		// Add X axis
		// Add only x-axis labels without the axis line
		const x_axis_labels = chart_group
			.append("g")
			.attr("transform", `translate(0,${height + 20})`); // Add some padding below the graph

		// Generate x-axis ticks
		const x_ticks = x_scale.ticks(optimal_tick_count);
		x_axis_labels
			.selectAll(".x-label")
			.data(x_ticks)
			.enter()
			.append("text")
			.attr("class", "x-label")
			.attr("x", (d) => x_scale(d))
			.attr("y", 0)
			.attr("text-anchor", "end")
			.style("font-family", "DM Sans, sans-serif")
			.style("fill", label_color)
			.text((d) => formatDate(d as Date, time_precision));
	}

	function handleResize() {
		// Clear any existing timeout
		if (resize_timeout) {
			window.clearTimeout(resize_timeout);
		}

		// Set a new timeout to debounce the resize
		resize_timeout = window.setTimeout(() => {
			createGraph();
		}, 20); // 20ms debounce
	}

	onMount(() => {
		createGraph();

		resize_observer = new ResizeObserver((entries) => {
			const entry = entries[0];
			// Only trigger resize if content dimensions actually changed
			if (
				entry &&
				(entry.contentRect.width > 0 || entry.contentRect.height > 0)
			) {
				handleResize();
			}
		});

		if (container_ref) {
			if (resize_observer) {
				resize_observer.observe(container_ref);
			}
		}
	});

	onCleanup(() => {
		if (container_ref) {
			if (resize_observer) {
				resize_observer.unobserve(container_ref);
			}
		}
		if (resize_timeout) {
			window.clearTimeout(resize_timeout);
		}
	});

	// The component's template
	return (
		<div ref={container_ref} class="w-full h-full">
			<svg ref={svg_ref} class="w-full h-full" style="display: block" />
		</div>
	);
}

export default Graph;
