import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Dropdown } from "react-bootstrap";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import presetPlaylists from "../presetPlaylists";
import { responsive } from "../responsive";
import "../stylesheets/playlist.css";
import { listPlaylistItems } from "../actions/playlistActions";

function Playlist({ showPlayer, state }) {
	const dispatch = useDispatch();
	const [filter, setFilter] = useState("");
	const [playlistTracks, setPlaylistTracks] = useState([]);
	const [userTracks, setUserTracks] = useState({});
	const listPlaylists = useSelector((state) => state.listPlaylists);
	const { playlistItems } = listPlaylists;
	const handleClick = (e) => {
		showPlayer(e);
	};
	const handleSelect = (e) => {
		setFilter(e);
	};
	useEffect(() => {
		presetPlaylists.map((item, i) => {
			if (item.title === filter) {
				setPlaylistTracks(item.tracks);
			}
		});
	}, [filter]);

	useEffect(() => {
		dispatch(listPlaylistItems());
		console.log("playlists", listPlaylists);
		listPlaylists && setUserTracks(listPlaylists.playlist);
		// console.log("usertracks", userTracks);
	}, []);
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
						<Dropdown.Item>My Playlist</Dropdown.Item>
					</Dropdown.Menu>
				</Dropdown>
			</div>
			{/* {userTracks.map((track, i) => {
				return <h1 style={{ color: "black" }}>{track.playlistItem}</h1>;
			})} */}
			<h1
				className="offset-1"
				style={{ color: "black", fontFamily: "Bebas Neue" }}
			>
				{filter}
			</h1>

			<Carousel responsive={responsive}>
				{playlistTracks.map((track, i) => {
					return (
						<>
							<img
								className="playlistImage"
								alt=""
								src={track.thumbnail}
								value={track.title}
								onClick={(e) => handleClick(track.title)}
							></img>
						</>
					);
				})}
			</Carousel>
		</>
	);
}

export default Playlist;
