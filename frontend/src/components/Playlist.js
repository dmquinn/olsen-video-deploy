import React, { useState, useEffect } from "react";
import { Dropdown } from "react-bootstrap";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import myPlaylists from "../myplaylists";
import "../stylesheets/playlist.css";

function Playlist() {
	const [filter, setFilter] = useState("");
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

	const selected = myPlaylists.filter((pl) => {
		return pl.title;
	});
	const displayList = [...new Set(selected.map((q) => q.filter))];
	const handleSelect = (e) => {
		console.log(displayList);
		setFilter(e);
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
				{myPlaylists.title === filter &&
					myPlaylists.tracks.map((item, i) => {
						return (
							<img
								src={item[i]}
								alt=""
								className="playlistImage"
							></img>
						);
					})}
			</Carousel>
		</>
	);
}

export default Playlist;
