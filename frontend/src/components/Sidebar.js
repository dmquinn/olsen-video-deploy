import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Dropdown } from "react-bootstrap";
import Logo from "../logo.svg";

function Sidebar({ setPlaylistVideo }) {
	const playlist = useSelector((state) => state.playlist);

	return (
		<div className="sidebar">
			<div className="offset-2">
				<img className="logo" src={Logo} alt=""></img>
				<div className="mt-5">
					<h5>PLAYLISTS</h5>
					<Dropdown>
						<Dropdown.Toggle id="dropdown">
							Playlist One
						</Dropdown.Toggle>

						<Dropdown.Menu>
							{playlist.length === 0 ? (
								<div className="dropdownContainer">
									Nothing To See Here
								</div>
							) : (
								playlist.map((item, i) => (
									<div className="dropdownContainer">
										<Dropdown.Item
											key={i}
											onClick={() =>
												setPlaylistVideo(playlist[i])
											}
											value={item.value}
										>
											{item.item}
										</Dropdown.Item>
									</div>
								))
							)}
						</Dropdown.Menu>
					</Dropdown>
				</div>
			</div>
		</div>
	);
}

export default Sidebar;
