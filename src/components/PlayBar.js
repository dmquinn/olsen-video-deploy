import React, { useState, useEffect } from "react";
import Player from "./Player";
import { songList } from "../Songs";

const PlayBar = (props) => {
	console.log("props ok", props);
	const [songs] = useState(songList);
	const [currentSongIndex, setCurrentSongIndex] = useState(
		props.currentSongIndex
	);
	const [nextSongIndex, setNextSongIndex] = useState(0);
	console.log("songList", currentSongIndex);
	useEffect(() => {
		setNextSongIndex(() => {
			if (currentSongIndex + 1 > songs.length - 1) {
				return 0;
			} else {
				return currentSongIndex + 1;
			}
		});
	}, []);

	return (
		<div className="playBar row-w-100">
			<Player
				currentSongIndex={props.currentSongIndex}
				setCurrentSongIndex={setCurrentSongIndex}
				nextSongIndex={nextSongIndex}
				songs={songs}
			/>
		</div>
	);
};
export default PlayBar;
