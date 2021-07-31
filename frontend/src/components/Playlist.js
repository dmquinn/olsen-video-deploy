import React, { useState, useEffect, useLayoutEffect } from "react";
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
	const [presetTracks, setPresetTracks] = useState([]);
	const [userTracks, setUserTracks] = useState([]);
	const [tempTracks, setTempTracks] = useState([]);
	const listPlaylists = useSelector((state) => state.listPlaylists);

	const handleClick = (e) => {
		showPlayer(e);
	};
	const handleSelect = (e) => {
		setUserTracks([]);
		setFilter(e);
	};
	const handleMyPlaylist = (e) => {
		setPresetTracks(null);
		listPlaylists && setUserTracks(listPlaylists.playlist);
	};

	useEffect(() => {
		presetPlaylists.map((item, i) => {
			item.title === filter && setPresetTracks(item.tracks);
		});
	}, [filter]);

	useEffect(() => {
		dispatch(listPlaylistAction());
	}, []);

	useLayoutEffect(() => {
		setTempTracks((preState) => [...preState, tempPlaylist[0]]);
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

			{!!presetTracks ? (
				<Carousel responsive={responsive}>
					{presetTracks.map((track, i) => {
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
					{tempTracks.length > 1 &&
						tempTracks.map((track, i) => {
							return (
								track !== undefined && (
									<>
										<img
											key={i}
											className="playlistImage"
											alt=""
											src={`https://img.youtube.com/vi/${track.thumb.substring(
												track.thumb.length - 11
											)}/sddefault.jpg`}
											value={track.title}
											onClick={(e) =>
												handleClick(track.thumb)
											}
										></img>
										<h6 className="button offset-1">
											{track.title}
										</h6>
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
