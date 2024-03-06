import { Header } from "./_components/Header";
import { Main } from "./_components/Main";
import { CoordinatesContext } from "./contexts/CoordinatesContext";
import { ErrorBoundary } from "./ui/ErrorBoundary";

function App() {
	return (
		<ErrorBoundary>
			<CoordinatesContext>
				<Header />
				<Main />
			</CoordinatesContext>
		</ErrorBoundary>
	);
}

export default App;
