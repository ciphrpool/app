import { Show } from "solid-js";
import UserIcon from "@assets/icons/user.svg?component-solid";

export type StatiticsSummaryData = {
	nb_ranked_duel: number;
	highest_elo: number;
	account_birthdate: Date;
};

interface StatisticsSummaryProps {}

function StatisticsSummaryView(props: StatisticsSummaryProps) {
	const statistics: StatiticsSummaryData = {
		nb_ranked_duel: 23,
		highest_elo: 1802,
		account_birthdate: new Date(2024, 2, 15),
	};

	return (
		<section class="">
			<p>Nb. of ranked duels : {statistics.nb_ranked_duel}</p>
			<p>Highest elo : {statistics.highest_elo}</p>
			<p>Join in : {statistics.account_birthdate.toDateString()}</p>
		</section>
	);
}

export default StatisticsSummaryView;
