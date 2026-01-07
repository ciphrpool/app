interface BinariesViewProps {}

function BinariesView(props: BinariesViewProps) {
	return (
		<section class="p-4 bg-night-600 overflow-hidden grow min-h-1/2 flex flex-col gap-4">
			{/* Binaries */}
			<div class="overflow-hidden">
				<details open class="cursor-pointer h-full text-moon">
					<summary class="block select-none tracking-widest text-moon">
						{">>"} Active Binaries
					</summary>
					<div class="max-h-full h-64 max-w-full overflow-y-auto overflow-x-hidden">
						<table class="w-full text-sm text-night-100">
							<thead class="sticky top-0 bg-night-600">
								<tr class="text-xs uppercase tracking-wider">
									<th class="px-8 py-4 text-left">name</th>
									<th class="px-8 py-4 text-left">type</th>
								</tr>
							</thead>
							<tbody class="divide-y  divide-night-700">
								<tr class="hover:bg-night-500 hover:text-moon transition-bg ease-in-out">
									<td class="px-8 py-4 hover:text-pl1-200 transition-colors ease-in-out">
										.bin1
									</td>
									<td class="px-8 py-4 hover:text-pl1-200 transition-colors ease-in-out">
										attack
									</td>
								</tr>
								<tr class="hover:bg-night-500 hover:text-moon transition-bg ease-in-out">
									<td class="px-8 py-4 hover:text-pl1-200 transition-colors ease-in-out">
										.bin1
									</td>
									<td class="px-8 py-4 hover:text-pl1-200 transition-colors ease-in-out">
										attack
									</td>
								</tr>
								<tr class="hover:bg-night-500 hover:text-moon transition-bg ease-in-out">
									<td class="px-8 py-4 hover:text-pl1-200 transition-colors ease-in-out">
										.bin1
									</td>
									<td class="px-8 py-4 hover:text-pl1-200 transition-colors ease-in-out">
										attack
									</td>
								</tr>
								<tr class="hover:bg-night-500 hover:text-moon transition-bg ease-in-out">
									<td class="px-8 py-4 hover:text-pl1-200 transition-colors ease-in-out">
										.bin1
									</td>
									<td class="px-8 py-4 hover:text-pl1-200 transition-colors ease-in-out">
										attack
									</td>
								</tr>
								<tr class="hover:bg-night-500 hover:text-moon transition-bg ease-in-out">
									<td class="px-8 py-4 hover:text-pl1-200 transition-colors ease-in-out">
										.bin1
									</td>
									<td class="px-8 py-4 hover:text-pl1-200 transition-colors ease-in-out">
										attack
									</td>
								</tr>
								<tr class="hover:bg-night-500 hover:text-moon transition-bg ease-in-out">
									<td class="px-8 py-4 hover:text-pl1-200 transition-colors ease-in-out">
										.bin1
									</td>
									<td class="px-8 py-4 hover:text-pl1-200 transition-colors ease-in-out">
										attack
									</td>
								</tr>
							</tbody>
						</table>
					</div>
				</details>
			</div>
			<div class="overflow-hidden">
				<details
					open
					class="grow cursor-pointer text-moon  overflow-hidden "
				>
					<summary class="block select-none tracking-widest text-moon">
						{">>"} My Binaries
					</summary>
					<div class="max-h-p95 max-w-full overflow-y-auto overflow-x-hidden">
						<table class="w-full text-sm text-night-100">
							<thead class="sticky top-0 bg-night-600">
								<tr class="text-xs uppercase tracking-wider">
									<th class="px-8 py-4 text-left">name</th>
									<th class="px-8 py-4 text-left">type</th>
								</tr>
							</thead>
							<tbody class="divide-y  divide-night-800">
								<tr class="hover:bg-night-500 hover:text-moon transition-bg ease-in-out">
									<td class="px-8 py-4 hover:text-pl1-200 transition-colors ease-in-out">
										.bin1
									</td>
									<td class="px-8 py-4 hover:text-pl1-200 transition-colors ease-in-out">
										attack
									</td>
								</tr>
							</tbody>
						</table>
					</div>
				</details>
			</div>
		</section>
	);
}

export default BinariesView;
