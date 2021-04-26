import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import axios from "axios";

function VideoPlayer({ selectedTrack }) {
	const dispatch = useDispatch();
	const playlist = useSelector((state) => state.playlist);
	const playlistItems = playlist;
	const [video, setVideo] = useState("");
	const [loading, setLoading] = useState(false);
	const [playlistItem, setPlaylistItem] = "";
	const REACT_APP_YOUTUBE_API = process.env.REACT_APP_YOUTUBE_API;

	const videoSrc = `https://www.youtube.com/embed/${video}`;

	function handleClick() {
		console.log("line 17", selectedTrack);
		dispatch({
			type: "ADD_PLAYLIST_ITEM",
			payload: {
				item: selectedTrack,
				id: Math.ceil(Math.random() * 100),
			},
		});

		console.log("dispatch", dispatch);
	}

	useEffect(() => {
		axios
			.get(
				`https://www.googleapis.com/youtube/v3/search/?key=${REACT_APP_YOUTUBE_API}&part=snippet&q=youtu.be/${selectedTrack}`
			)
			.then((response) => {
				console.log("response", response);
				setVideo(response.data.items[0].id.videoId);
			})
			.catch((err) => {
				setLoading(true);
				console.log(err.response);
			});
		console.log(selectedTrack);
	}, [selectedTrack, REACT_APP_YOUTUBE_API, video, dispatch]);

	return (
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
				<p className="ml-4">
					Add to playlist{" "}
					<i className="ml-3 fas fa-plus" onClick={handleClick}></i>
				</p>
			</div>
			{playlistItems.length === 0 ? (
				<div>Nothing to see here</div>
			) : (
				playlist.map((item, id) => <div>{item.item}</div>)
			)}
		</>
	);
}

export default VideoPlayer;
