import React, { useState, useEffect } from "react";
import { Dropdown } from "react-bootstrap";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import myPlaylists from "../myplaylists";
import playlistFake from "../playlistFake";
import "../stylesheets/playlist.css";

function Playlist() {
	const [filter, setFilter] = useState("");
	const [playlistTracks, setPlaylistTracks] = useState([]);
	const responsive = {
		superLargeDesktop: {
			// the naming can be any, depends on you.
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
		setFilter(e);
		console.log("filter", filter);
		myPlaylists.map((item, i) => {
			item.title === filter && console.log("it", item.title);
			setPlaylistTracks(item.tracks);
		});
	};

	return (
		<>
			<div className="button">
				<Dropdown>
					<Dropdown.Toggle>MY PLAYLISTS</Dropdown.Toggle>
					<Dropdown.Menu>
						{myPlaylists.map((playlist, i) => {
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
					</Dropdown.Menu>
				</Dropdown>
			</div>
			<Carousel responsive={responsive}>
				{playlistTracks.map((track, i) => {
					return (
						<img className="playlistImage" alt="" src={track}></img>
					);
				})}
			</Carousel>
		</>
	);
}

export default Playlist;
