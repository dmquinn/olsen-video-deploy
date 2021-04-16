import React, { useState, useEffect } from "react";
import Sidebar from "./components/Sidebar";
import PlayBar from "./components/PlayBar";
import { songList } from "./Songs";

function App() {
	let [currentSongIndex, setCurrentSongIndex] = useState(0);

	function setIndex(index) {
		setCurrentSongIndex(index || 0);
		console.log("csi", currentSongIndex);
	}
	function handleClick(index) {
		console.log("index");
		setCurrentSongIndex(index || 0);
	}
	return (
		<div className="App row row-flex no-gutters">
			<Sidebar />
			<div className="mainContainer col-10">
				<div className="Row hotRow">
					<h1 className="display-1">WHAT'S HOT TODAY?</h1>
					<p>
						Sun Sun Pill's new banger <i>Not Not While the Gyro</i>{" "}
						will brighten your day probably . . .
					</p>
					<button onClick={handleClick}>PLAY NOW</button>
				</div>
				<div className="library">
					<div className="row">
						{songList.map(function (song, index) {
							return (
								<div
									className="songCard mr-5 mt-4"
									key={index}
									data-index={index}
									onClick={() => setIndex(index)}
								>
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
			</div>
			<PlayBar currentSongIndex={currentSongIndex} />
		</div>
	);
}

export default App;
