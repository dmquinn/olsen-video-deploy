import React, { useState, useEffect } from "react";
import axios from "axios";

function VideoPlayer({ selectedTrack }) {
	const [video, setVideo] = useState("");
	const [loading, setLoading] = useState(false);
	const REACT_APP_YOUTUBE_API = process.env.REACT_APP_YOUTUBE_API;

	const videoSrc = `https://www.youtube.com/embed/${video}`;

	useEffect(() => {
		axios
			.get(
				`https://www.googleapis.com/youtube/v3/search/?key=${REACT_APP_YOUTUBE_API}&part=snippet&q=youtu.be/M7lc1UVf-VE`
			)
			.then((response) => {
				console.log(response);
				setVideo(response.data.items[0].id.videoId);
			})
			.catch((err) => {
				setLoading(true);
				console.log(err.response);
			});
	}, [selectedTrack, REACT_APP_YOUTUBE_API, video]);

	return (
		selectedTrack !== undefined && (
			<>
				<div className="player">
					<iframe
						src={
							videoSrc +
							"?rel=0&amp;controls=1&amp&amp;showinfo=0&amp;modestbranding=1&controls=0&autoplay=1&modestbranding=1"
						}
						allowFullScreen
						allowautoplay="1"
						title="Video player"
						className="iframe"
					/>
				</div>
			</>
		)
	);
}

export default VideoPlayer;
