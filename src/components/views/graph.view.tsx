import Graph from "@components/graph/graph";

interface GraphViewProps {}

function GraphView(props: GraphViewProps) {
	return (
		<section class="min-h-1/3">
			{/* D3 Graph */}
			<div class="px-4 w-full h-full">
				<Graph
					grid_color="#474747"
					label_color="#ADADAD"
					line_color="#4085A0"
					data={[
						{
							x: new Date("2024-01-01"),
							y: 1000,
						},
						{
							x: new Date("2024-02-01"),
							y: 1007,
						},
						{
							x: new Date("2024-03-01"),
							y: 1123,
						},
						{
							x: new Date("2024-04-01"),
							y: 1053,
						},
						{
							x: new Date("2024-05-01"),
							y: 958,
						},
					]}
				/>
			</div>
		</section>
	);
}

export default GraphView;
