import React from "react";
import Logo from "../gothDuck.svg";

function Sidebar() {
	return (
		<div className="sidebar">
			<img src={Logo} alt="" className="logo" />
			<h1>Sidebar</h1>
		</div>
	);
}

export default Sidebar;
