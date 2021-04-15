import React from "react";

function PlayerControls(props) {
	return (
		<div className="playerControls mt-2 offset-4">
			<button className="skip-btn" onClick={() => props.SkipSong(false)}>
				<i className="fas fa-backward"></i>
			</button>
			<button
				className="play-btn"
				onClick={() => props.setIsPlaying(!props.isPlaying)}
			>
				{props.isPlaying ? (
					<i className="fas fa-pause"></i>
				) : (
					<i className="fas fa-play"></i>
				)}
			</button>
			<button className="skip-btn" onClick={() => props.SkipSong()}>
				<i className="fas fa-forward"></i>
			</button>
		</div>
	);
}

export default PlayerControls;
