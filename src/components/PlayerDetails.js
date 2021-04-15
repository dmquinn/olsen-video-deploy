import React from "react";
function PlayerDetails(props) {
	return (
		<div className="playerDetails">
			<div className="details-img">
				<img
					src={props.song.img_src}
					alt=""
					className="playThumb ml-2"
				/>
			</div>
			<div>
				<h6 className="details-title mt-3">{props.song.title}</h6>
				<h6 className="details-artist">{props.song.artist}</h6>
			</div>
		</div>
	);
}

export default PlayerDetails;
