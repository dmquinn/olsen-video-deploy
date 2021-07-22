import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Dropdown } from "react-bootstrap";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import presetPlaylists from "../presetPlaylists";
import { responsive } from "../responsive";
import "../stylesheets/playlist.css";
import { listPlaylistAction } from "../actions/playlistActions";

function Playlist({ showPlayer, userId, tempPlaylist }) {
	const dispatch = useDispatch();
	const [filter, setFilter] = useState("");
	const [playlistTracks, setPlaylistTracks] = useState([]);
	const [userTracks, setUserTracks] = useState([]);

	const listPlaylists = useSelector((state) => state.listPlaylists);
	const handleClick = (e) => {
		showPlayer(e);
	};
	const handleSelect = (e) => {
		setUserTracks([]);
		setFilter(e);
	};
	const handleMyPlaylist = (e) => {
		setPlaylistTracks(null);
		listPlaylists && setUserTracks(listPlaylists.playlist);
	};
	useEffect(() => {
		presetPlaylists.map((item, i) => {
			item.title === filter && setPlaylistTracks(item.tracks);
		});
	}, [filter]);

	useEffect(() => {
		console.log("video", userId);

		userTracks.map((track, i) => {
			userId === track.createdBy && console.log("match", track.createdBy);
		});
		dispatch(listPlaylistAction());
	}, []);
	useEffect(() => {
		console.log("tempPlaylist", tempPlaylist);
		return tempPlaylist;
	}, [tempPlaylist]);

	return (
		<>
			<div className="button">
				<Dropdown>
					<Dropdown.Toggle data-toggle="">PLAYLISTS</Dropdown.Toggle>
					<Dropdown.Menu>
						{presetPlaylists.map((playlist, i) => {
							return (
								<Dropdown.Item
									key={i}
									href=""
									eventKey={playlist.title}
									onSelect={handleSelect}
								>
									{playlist.title}{" "}
								</Dropdown.Item>
							);
						})}
						<Dropdown.Item href="" onSelect={handleMyPlaylist}>
							My Playlist
						</Dropdown.Item>
					</Dropdown.Menu>
				</Dropdown>
			</div>

			{!!playlistTracks ? (
				<Carousel responsive={responsive}>
					{playlistTracks.map((track, i) => {
						return (
							<>
								<img
									key={i}
									className="playlistImage"
									alt=""
									src={track.thumbnail}
									value={track.title}
									onClick={(e) => handleClick(track.title)}
								></img>
								<h6 className="button offset-1">
									{track.title}
								</h6>
							</>
						);
					})}
					{tempPlaylist.map((track, i) => {
						return (
							<>
								<img
									key={i}
									className="playlistImage"
									alt=""
									src={track.thumbnail}
									value={track.title}
									onClick={(e) => handleClick(track.thumb)}
								></img>
								<h6 className="button offset-1">
									{track.title}
								</h6>
							</>
						);
					})}
				</Carousel>
			) : (
				<Carousel responsive={responsive}>
					{userTracks.map((track, i) => {
						return (
							userId === track.createdBy && (
								<>
									<img
										className="playlistImage"
										alt=""
										src={`https://img.youtube.com/vi/${track.playlistItem}/sddefault.jpg`}
										value={track.title}
										onClick={(e) =>
											handleClick(track.title)
										}
									></img>
									<h6 className="button offset-1">
										{track.title}
									</h6>{" "}
								</>
							)
						);
					})}
				</Carousel>
			)}
		</>
	);
}

export default Playlist;
