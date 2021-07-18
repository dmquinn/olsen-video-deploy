import React, { useState, useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
import { Dropdown } from "react-bootstrap";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import presetPlaylists from "../presetPlaylists";
import "../stylesheets/playlist.css";

function Playlist() {
	// const playlist = useSelector((state) => state.playlist);

	const [filter, setFilter] = useState("");
	const [playlistTracks, setPlaylistTracks] = useState([]);
	const responsive = {
		superLargeDesktop: {
			breakpoint: { max: 4000, min: 3000 },
			items: 5,
		},
		desktop: {
			breakpoint: { max: 3000, min: 1024 },
			items: 3,
		},
		tablet: {
			breakpoint: { max: 1024, min: 464 },
			items: 2,
		},
		mobile: {
			breakpoint: { max: 464, min: 0 },
			items: 1,
		},
	};

	const handleSelect = (e) => {
		console.log("event choose playlist", e);
		setFilter(e);
		console.log("filter", filter);
		presetPlaylists.map((item, i) => {
			item.title === filter && console.log("it", item.title);
			setPlaylistTracks(item.tracks);
		});
	};

	return (
		<>
			<div className="button">
				<Dropdown>
					<Dropdown.Toggle>PLAYLISTS</Dropdown.Toggle>
					<Dropdown.Menu>
						{presetPlaylists.map((playlist, i) => {
							return (
								<Dropdown.Item
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
			<Carousel responsive={responsive}>
				{playlistTracks.map((track, i) => {
					return (
						<img
							className="playlistImage"
							alt=""
							src={track.thumbnail}
						></img>
					);
				})}
			</Carousel>
		</>
	);
}

export default Playlist;
