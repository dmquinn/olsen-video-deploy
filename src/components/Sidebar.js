import React from "react";
import Logo from "../gothDuck.svg";

function Sidebar() {
	return (
		<div className="sidebar">
			<div className="offset-2">
				<img className="mt-2" src="../logo.svg" alt=""></img>
				<h5 className="mt-5">MUSIC</h5>
				<h6 className="mt-5">SONGS</h6>
				<h6 className="mt-3">ARTISTS</h6>
				<h6 className="mt-3">ALBUMS</h6>
			</div>
		</div>
	);
}

export default Sidebar;
