import { useNavigate } from "@solidjs/router";

function BackButton() {
	const navigate = useNavigate();
	return (
		<button
			title="Go back to the previous page"
			class="w-fit text-nowrap h-fit border-4 text-night-100 border-night-200 px-2 hover:text-moon hover:border-moon"
			onclick={() => navigate(-1)}
		>
			cd ..
		</button>
	);
}

export default BackButton;
