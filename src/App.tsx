import { Header } from "./_components/Header";
import { Main } from "./_components/Main";
import { CordinateContext } from "./contexts/CordinateContext";

function App() {
	return (
		<CordinateContext>
			<Header />
			<Main />
		</CordinateContext>
	);
}

export default App;
