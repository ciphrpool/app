import Todo from "@components/utils/Todo";
import Header from "@components/headers/DefaultHeader";
import Footer from "@components/footers/DefaultFooter";

function Dashboard() {
	return (
		<>
			<Header />
			<main>
				<Todo> User Dashboard </Todo>
			</main>
			<Footer />
		</>
	);
}

export default Dashboard;
