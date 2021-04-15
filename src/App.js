import React from "react";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import MainBit from "./components/MainBit";
import PlayBar from "./components/PlayBar";
import { songList } from "./Songs";

function App() {
	return (
		<div className="App row row-flex no-gutters">
			<Sidebar />
			<div className="mainContainer col-10">
				<div className="library row">
					{songList.map((song, i) => {
						return (
							<div className="songCard mr-5">
								<img
									className="albumArt"
									src={song.img_src}
									alt=""
								/>
								<p>{song.title}</p>
								<p>{song.artist}</p>
							</div>
						);
					})}
					<h1>{songList.title}</h1>
				</div>
			</div>
			<PlayBar />
		</div>
	);
}

export default App;
