interface HistoryViewProps {}

function HistoryView(props: HistoryViewProps) {
	return (
		<section class="grow border-4 border-night-400 p-4 overflow-hidden">
			{/* History */}
			<details open class="cursor-pointer text-moon  overflow-hidden ">
				<summary class="block select-none text-xl tracking-widest text-night-100">
					{">>"} Duel History
				</summary>
			</details>

			<div class="max-h-p95 max-w-full overflow-y-auto overflow-x-hidden">
				<table class="w-full text-sm text-night-100">
					<thead class="sticky top-0 bg-night-700">
						<tr class="text-xs uppercase tracking-wider">
							<th class="px-8 py-4 text-left">VS</th>
							<th class="px-8 py-4 text-left">Result</th>
							<th class="px-8 py-4 text-left">Type</th>
							<th class="px-8 py-4 text-left">Date</th>
						</tr>
					</thead>
					<tbody class="divide-y  divide-night-800">
						<tr class="hover:bg-night-600 hover:text-moon transition-bg ease-in-out">
							<td class="px-8 py-4 hover:text-pl1-200 transition-colors ease-in-out">
								Username#FELOSK | 1242
							</td>
							<td class="px-8 py-4 hover:text-pl1-200 transition-colors ease-in-out">
								W
							</td>
							<td class="px-8 py-4 hover:text-pl1-200 transition-colors ease-in-out">
								Ranked
							</td>
							<td class="px-8 py-4 hover:text-pl1-200 transition-colors ease-in-out">
								2024/06/12
							</td>
						</tr>
					</tbody>
				</table>
			</div>
		</section>
	);
}

export default HistoryView;
