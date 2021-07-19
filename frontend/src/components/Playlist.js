import React, { useState, useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
import { Dropdown } from "react-bootstrap";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import presetPlaylists from "../presetPlaylists";
import "../stylesheets/playlist.css";

function Playlist({ showPlayer }) {
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
	const handleClick = (e) => {
		console.log(e);
		showPlayer(e);
	};
	const handleSelect = (e) => {
		console.log("first", e);
		setFilter(e);

		console.log("plt", playlistTracks);
	};
	useEffect(() => {
		presetPlaylists.map((item, i) => {
			if (item.title === filter) {
				setPlaylistTracks(item.tracks);
			}
		});
	}, [filter]);
	return (
		<>
			<div className="button">
				<Dropdown>
					<Dropdown.Toggle data-toggle="">PLAYLISTS</Dropdown.Toggle>
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

			<h1 style={{ color: "black" }}>{filter}</h1>

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
