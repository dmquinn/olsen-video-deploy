import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addPlaylistItem } from "../actions/playlistActions";
import "../stylesheets/player.css";
import axios from "axios";

function VideoPlayer({
	selectedTrack,
	playlistVideo,
	userId,
	setTempPlaylist,
	tempPlaylist,
}) {
	const dispatch = useDispatch();
	useSelector((state) => state.playlist);
	const [video, setVideo] = useState("");
	const [loading, setLoading] = useState("");

	const REACT_APP_YOUTUBE_API = process.env.REACT_APP_YOUTUBE_API;

	const videoSrc = `https://www.youtube.com/embed/${video}`;
	const videoThumb = videoSrc.substring(videoSrc.length - 11);
	const temporaryPlaylist = [];

	const handleClick = () => {
		const vidObject = { title: selectedTrack, thumb: videoSrc };
		temporaryPlaylist.push(vidObject);
		setTempPlaylist(temporaryPlaylist);
		dispatch(addPlaylistItem(videoThumb, selectedTrack, userId));
	};

	useEffect(() => {
		axios
			.get(
				`https://www.googleapis.com/youtube/v3/search/?key=${REACT_APP_YOUTUBE_API}&part=snippet&q=youtu.be/${selectedTrack}`
			)
			.then((response) => {
				setVideo(response.data.items[0].id.videoId);
			})
			.catch((err) => {
				setLoading(true);
				console.log(err.response);
			});
		console.log("userId from vp", userId);
	}, [selectedTrack, REACT_APP_YOUTUBE_API, video, playlistVideo]);

	return (
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

			<p className="">
				Add to playlist{" "}
				<i className="ml-3 fas fa-plus" onClick={handleClick}></i>
			</p>
		</div>
	);
}

export default VideoPlayer;
