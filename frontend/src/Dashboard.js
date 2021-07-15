import { useState, useEffect } from "react";
import useAuth from "./useAuth";
import { Form } from "react-bootstrap";
import SpotifyWebApi from "spotify-web-api-node";
import TrackSearchResult from "./components/TrackSearch";
import VideoPlayer from "./components/VideoPlayer";

const spotifyApi = new SpotifyWebApi({
	clientId: "d9eef23f8ad74b80b1e7535609cfc4cf",
});

export default function Dashboard({ code }) {
	const accessToken = useAuth(code);
	const [search, setSearch] = useState("");
	const [searchResults, setSearchResults] = useState([]);
	const [selectedTrack, setSelectedTrack] = useState("");
	const [selectPlaylist, setSelectPlaylist] = useState("");
	const [playlistVideo, setPlaylistVideo] = useState("");
	const [userName, setUserName] = useState("");
	const [userId, setUserId] = useState("");

	useEffect(() => {
		if (!accessToken) return;
		spotifyApi.setAccessToken(accessToken);
		spotifyApi.getMe().then(
			function (data) {
				setUserName(data.body.display_name);
				setUserId(data.body.id);
			},
			function (err) {
				console.log("Something went wrong!", err);
			}
		);
	}, [accessToken, userName]);

	useEffect(() => {
		if (!search) return setSearchResults([]);
		if (!accessToken) return;
		let cancel = false;
		spotifyApi.searchTracks(search).then((res) => {
			if (cancel) return;
			setSearchResults(
				res.body.tracks.items.map((track, id) => {
					const smallestAlbumImage = track.album.images.reduce(
						(smallest, image) => {
							if (image.height < smallest.height) return image;
							return smallest;
						},
						track.album.images[0]
					);

					return {
						artist: track.artists[0].name,
						title: track.name,
						uri: track.uri,
						albumUrl: smallestAlbumImage.url,
					};
				})
			);
		});

		return () => (cancel = true);
	}, [search, accessToken]);

	const handleClick = () => {
		setSelectedTrack("angel olsen shut up kiss me");
	};
	const showPlayer = (value) => {
		setSelectedTrack(value);
	};
	const handleCloseTest = () => {
		setSelectedTrack("");
	};
	const selectFromPlaylist = (video) => {
		setSelectedTrack(video);
	};
	return (
		<>
			<div className="mainContainer p-5 row">
				<h6>{userName}</h6>
				{/* <img
						src="https://img.youtube.com/vi/nleRCBhLr3k/0.jpg
"
					></img> */}
				<div className="">
					<div className="searchBar">
						<Form.Control
							type="search"
							placeholder="Search Songs/Artists"
							value={search}
							onChange={(e) => setSearch(e.target.value)}
							showPlayer={showPlayer}
						/>
					</div>
					{selectedTrack && (
						<div className="d-flex justify-content-center align-items-center">
							<p
								className="closeButton button"
								onClick={handleCloseTest}
							>
								CLOSE VIDEO
							</p>
							<div className="col-lg-6">
								<VideoPlayer
									selectedTrack={selectedTrack}
									playlistVideo={playlistVideo}
								/>
							</div>
						</div>
					)}

					<div className="mt-4 searchResults col-lg-6">
						{searchResults.map((track, id) => (
							<TrackSearchResult
								track={track}
								key={track.uri}
								showPlayer={showPlayer}
								setPlaylistVideo={setPlaylistVideo}
							/>
						))}
					</div>
				</div>

				{/* // */}
				<div className="Row hotRow">
					{!selectedTrack && (
						<>
							<p className="hotTitle">WHAT'S HOT TODAY?</p>
							<p>
								Angel Olsen's banger <i>Shut Up Kiss Me</i> will
								brighten your day probably . . .
							</p>
							<button className="button" onClick={handleClick}>
								PLAY NOW
							</button>
						</>
					)}
				</div>
			</div>
		</>
	);
}
