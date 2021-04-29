import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Modal } from "react-bootstrap";

import axios from "axios";

function VideoPlayer({ selectedTrack, playlistVideo, setPlaylistVide }) {
	const dispatch = useDispatch();
	const playlist = useSelector((state) => state.playlist);
	const playlistItems = playlist;
	const [video, setVideo] = useState("");
	const [loading, setLoading] = useState(false);
	const [show, setShow] = useState(false);

	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);
	const REACT_APP_YOUTUBE_API = process.env.REACT_APP_YOUTUBE_API;
	let videoSrc = "";
	if (playlistVideo) {
		videoSrc = playlistVideo.id;
	} else {
		videoSrc = `https://www.youtube.com/embed/${video}`;
	}

	function handleClick() {
		console.log("line 17", selectedTrack);
		dispatch({
			type: "ADD_PLAYLIST_ITEM",
			payload: {
				item: selectedTrack,
				id: videoSrc,
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
				console.log(video);
			})
			.catch((err) => {
				setLoading(true);
				console.log(err.response);
			});
	}, [selectedTrack, REACT_APP_YOUTUBE_API, video, playlistVideo, dispatch]);

	return (
		<>
			{video && { handleShow }}
			<Modal show={show}>
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
						<i
							className="ml-3 fas fa-plus"
							onClick={handleClick}
						></i>
					</p>
				</div>
			</Modal>
		</>
	);
}

export default VideoPlayer;
