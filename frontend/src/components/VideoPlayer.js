import React, { useState, useEffect } from "react";
import axios from "axios";

function VideoPlayer({ selectedTrack }) {
	const [video, setVideo] = useState("");
	const [loading, setLoading] = useState(false);
	console.log("props.selectedTrack", selectedTrack);
	const YOUTUBE_API = process.env.REACT_APP_YOUTUBE_API;

	const videoSrc = `https://www.youtube.com/embed/${video}`;

	useEffect(() => {
		axios
			.get(
				`https://youtube.googleapis.com/youtube/v3/search?key=${YOUTUBE_API}&type=video&part=snippet&maxResults=1&q=${selectedTrack}`
			)
			.then((response) => {
				setVideo(response.data.items[0].id.videoId);
				console.log("video2", video);
			})
			.catch((err) => {
				setLoading(true);
				console.log(err.response);
			});
	}, [selectedTrack, YOUTUBE_API, video]);

	return (
		selectedTrack !== undefined && (
			<>
				<div className="player">
					<iframe
						src={videoSrc}
						allowFullScreen
						title="Video player"
						className="iframe"
					/>
				</div>
			</>
		)
	);
}

export default VideoPlayer;
