import { createResource, For } from "solid-js";
import AddIcon from "@assets/icons/add.svg?component-solid";
import { A } from "@solidjs/router";
import { api } from "@utils/auth/auth";
import { GetAllModulesSummaryResult } from "@utils/api.type";
import { useFault } from "@components/errors/fault";

interface ModulesDetailsProps {}

export type ModuleSummaryData = {
	name: string;
};

function ModulesDetails(props: ModulesDetailsProps) {
	const fault = useFault();
	const [modules, { mutate, refetch }] = createResource(async () => {
		try {
			const res = await api.get("/modules/summary/all");

			const modules: GetAllModulesSummaryResult = res.data.modules;
			return modules;
		} catch (error) {
			fault.minor({ message: "Failed to get all your modules" });
			return [];
		}
		return [];
	});
	return (
		<details class="cursor-pointer [&[open]>summary]:text-moon group overflow-hidden">
			<summary
				class="
					select-none 
					text-xl tracking-widest text-night-100 
					hover:text-moon transition-colors duration-200
					list-none [&:has(+*:open)]:text-moon
					flex flex-row gap-4 justify-between 
				"
			>
				<span>&gt&gt Modules</span>
				<button
					title="Create a new module"
					class="hidden group-open:block"
					onClick={(e) => {
						e.preventDefault();
						console.log("Add friend button");
					}}
				>
					<AddIcon class="[&_path]:fill-night-300  [&_path]:hover:fill-pl1-200 [&_path]:hover:transition-all [&_path]:hover:duration-200 [&_path]:hover:ease-in-out" />
				</button>
			</summary>
			<div class="h-full overflow-hidden flex flex-col gap-4">
				<div class="w-full flex gap-5 justify-center">
					{/* Three Dot */}
					<div class="bg-moon w-1 h-1"></div>
					<div class="bg-moon w-1 h-1"></div>
					<div class="bg-moon w-1 h-1"></div>
				</div>
				<ul class="py-4 flex flex-col max-h-64 overflow-y-auto">
					<For each={modules()}>
						{(module) => {
							return (
								<li class="pl-8 py-4 show w-full h-full hover:bg-night-500  transition-colors ease-in-out duration-200">
									<A href={`/module/${module.name}`}>
										<div class="w-full h-full flex gap-4 items-center pr-4">
											<h3 class="text-night-100 hover:text-pl1-200 transition-colors ease-in-out duration-200">
												./{module.name}
											</h3>
											{/* If the module is selected */}
											<div class="bg-pl1-400 w-2 h-2 ml-auto"></div>
										</div>
									</A>
								</li>
							);
						}}
					</For>
				</ul>
				<div class="w-full flex gap-5 justify-center">
					{/* Three Dot */}
					<div class="bg-moon w-1 h-1"></div>
					<div class="bg-moon w-1 h-1"></div>
					<div class="bg-moon w-1 h-1"></div>
				</div>
			</div>
		</details>
	);
}

export default ModulesDetails;
