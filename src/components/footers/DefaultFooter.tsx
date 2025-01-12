import { A } from "@solidjs/router";

function DefaultFooter() {
	return (
		<footer class="w-full bg-night-700 flex justify-center py-1 px-8">
			<ul class="flex p-0 m-0 list-none gap-4">
				<li class="mx-8">
					<A href="/documentation">Documentation</A>
				</li>
				<li class="mx-8">
					<A href="/help">Help</A>{" "}
				</li>
				<li class="mx-8">
					<A href="/AboutUs">About Us</A>
				</li>
				<li class="mx-8">
					<A href="/License">License</A>
				</li>
			</ul>
		</footer>
	);
}

export default DefaultFooter;
