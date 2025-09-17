import { useState } from "react";
import "./App.css";
import TileView from "./TileView";

function App() {
	const [count, setCount] = useState(0);

	return (
		<>
			<TileView />
		</>
	);
}

export default App;
