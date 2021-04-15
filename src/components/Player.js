import React, { useState, useRef, useEffect } from "react";
import PlayerControls from "./PlayerControls";
import PlayerDetails from "./PlayerDetails";

function Player(props) {
	console.log("props player", props);
	const [currentSongIndex, setCurrentSongIndex] = useState(
		props.currentSongIndex
	);
	const audioEl = useRef(null);
	const [isPlaying, setIsPlaying] = useState(false);
	useEffect(() => {
		setCurrentSongIndex(props.index);
		if (isPlaying) {
			audioEl.current.play();
		} else {
			audioEl.current.pause();
		}
	});

	const SkipSong = (forwards = true) => {
		if (forwards) {
			props.setCurrentSongIndex(() => {
				let i = props.currentSongIndex;
				i++;

				if (i > props.songs.length - 1) {
					i = 0;
				}

				return i;
			});
		} else {
			props.setCurrentSongIndex(() => {
				let i = props.currentSongIndex;
				i--;

				if (i < 0) {
					i = props.songs.length - 1;
				}

				return i;
			});
		}
	};

	return (
		<div className="player row-w-100 row-flex">
			<audio
				src={props.songs[props.currentSongIndex].src}
				ref={audioEl}
			></audio>
			<div className="col-sm">
				<PlayerDetails song={props.songs[props.currentSongIndex]} />
			</div>
			<div className="col-sm">
				<PlayerControls
					isPlaying={isPlaying}
					setIsPlaying={setIsPlaying}
					SkipSong={SkipSong}
				/>
			</div>
			<p className="upNext col-sm">
				Next up:{" "}
				<span>
					{props.songs[props.nextSongIndex].title} by{" "}
					{props.songs[props.nextSongIndex].artist}
				</span>
			</p>
		</div>
	);
}

export default Player;
