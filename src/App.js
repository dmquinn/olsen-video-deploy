import React from "react";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import MainBit from "./components/MainBit";
import PlayBar from "./components/PlayBar";

function App() {
	return (
		<div className="App">
			<Header />
			<div className="mainContainer">
				<Sidebar />
				<MainBit />
			</div>
			<PlayBar />
		</div>
	);
}

export default App;
