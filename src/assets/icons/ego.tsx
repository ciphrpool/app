import { P1, P2, Te_Player } from "@utils/player.type";

type EgoCount = {
	p1: number;
	p2: number;
};
type EgoIconProps = {
	get_ego_count?: () => EgoCount;
	forced_color ?: Te_Player;
};

function EgoIcon(props: EgoIconProps) {
	const get_player = () => {
		if (!props.get_ego_count) return undefined;
		const counts = props.get_ego_count();
		return counts.p1 > counts.p2
			? P1
			: counts.p1 < counts.p2
				? P2
				: undefined;
	};

	const get_color = () => {
		const player = props.forced_color ?? get_player();
		if (player === P1) return "#B6D6E2";
		if (player === P2) return "#E6AC73";
		return "#FFAFCC";
	};
	return (
		<svg
			width="46"
			height="46"
			viewBox="0 0 46 46"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
		>
			<path
				fill-rule="evenodd"
				clip-rule="evenodd"
				d="M22.6274 4.24264L4.24264 22.6274L22.6274 41.0122L41.0122 22.6274L22.6274 4.24264ZM0 22.6274L22.6274 45.2548L45.2548 22.6274L22.6274 0L0 22.6274Z"
				fill="#F8F4E3"
			/>
			<path
				d="M29.435 16.2635C32.9498 19.7782 32.9498 25.4767 29.435 28.9914C25.9203 32.5061 20.2218 32.5061 16.7071 28.9914C13.1924 25.4767 13.1924 19.7782 16.7071 16.2635C20.2218 12.7487 25.9203 12.7487 29.435 16.2635Z"
				fill={get_color()}
			/>
		</svg>
	);
}

export default EgoIcon;
