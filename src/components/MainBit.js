import React from "react";
import PlayerDetails from "./PlayerDetails";
import { songList } from "../Songs";

function MainBit() {
	console.log("songList line 6", songList);

	return (
		<div className="library">
			{songList.map((song, i) => {
				return (
					<>
						<img className="albumArt" src={song.img_src} alt="" />
						<h4>{song.artist}</h4>;
						<h4 style={{ fontWeight: "900" }}>{song.title}</h4>
					</>
				);
			})}
			<h1>{songList.title}</h1>)
		</div>
	);
}

export default MainBit;
