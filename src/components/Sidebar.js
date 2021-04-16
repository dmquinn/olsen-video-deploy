import React, { useState, useEffect } from "react";
import Logo from "../logo.svg";

function Sidebar() {
	const [click, setClick] = useState(false);
	const [button, setButton] = useState(true);

	const handleClick = () => {
		setClick(!click);
	};
	const closeMobileMenu = () => {
		setClick(false);
	};

	const showButton = () => {
		if (window.innerWidth <= 960) {
			setButton(false);
		} else {
			setButton(true);
		}
	};

	useEffect(() => {
		showButton();
	}, []);

	window.addEventListener("resize", showButton);
	return (
		<div className="sidebar">
			<div className="offset-2">
				<img className="mt-5 logo" src={Logo} alt=""></img>
				<h5 className="mt-5 bold">MUSIC</h5>
				<h6 className="mt-5">SONGS</h6>
				<h6 className="mt-3">ARTISTS</h6>
				<h6 className="mt-3">ALBUMS</h6>
			</div>
		</div>
	);
}

export default Sidebar;
