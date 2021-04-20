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
				<img className="logo" src={Logo} alt=""></img>
				<div className="mt-5">
					<h5 className="bold">MY MUSIC</h5>
					<h6 className="mt-4">SONGS</h6>
					<h6 className="mt-4">ARTISTS</h6>
					<h6 className="mt-4">ALBUMS</h6>
				</div>
			</div>
		</div>
	);
}

export default Sidebar;
