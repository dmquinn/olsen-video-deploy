import React, { useEffect } from "react";

export default function TrackSearchResult({
	track,
	showPlayer,
	setPlaylistVideo,
	selectedTrack,
}) {
	useEffect(() => {
		console.log("value", selectedTrack);
	});
	function handleClick() {
		setPlaylistVideo(null);
		const fullTitle = track.artist + " " + track.title;
		showPlayer(fullTitle);
		// value = "";
	}

	return (
		<div
			className="d-flex m-2 align-items-center"
			style={{ cursor: "pointer" }}
			onClick={handleClick}
			search=""
		>
			<img
				src={track.albumUrl}
				style={{ height: "84px", width: "84px" }}
				alt=""
			/>
			<div className="ml-3">
				<div>{track.title}</div>
				<div className="text-muted">{track.artist}</div>
			</div>
		</div>
	);
}
