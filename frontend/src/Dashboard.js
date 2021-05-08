import { useState, useEffect } from "react";
import useAuth from "./useAuth";
import { Form } from "react-bootstrap";
import SpotifyWebApi from "spotify-web-api-node";
import Sidebar from "./components/Sidebar";
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
				console.log("this", data.body);
				setUserName(data.body.display_name);
				setUserId(data.body.id);
			},
			function (err) {
				console.log("Something went wrong!", err);
			}
		);
		console.log(accessToken);
	}, [accessToken, userName]);

	useEffect(() => {
		if (!search) return setSearchResults([]);
		if (!accessToken) return;
		let cancel = false;
		spotifyApi.searchTracks(search).then((res) => {
			if (cancel) return;
			setSearchResults(
				res.body.tracks.items.map((track) => {
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

	const showPlayer = (value) => {
		setSelectedTrack(value);
		document.querySelector(".mainContainer").style.backdropFilter =
			"brightness(40%)";
	};
	const selectFromPlaylist = (video) => {
		setSelectedTrack(video);
		console.log("61", video);
	};
	return (
		<>
			<Sidebar
				setPlaylistVideo={setPlaylistVideo}
				selectedPlaylist={selectPlaylist}
			/>

			<div className="App row row-flex no-gutters">
				<div className="mainContainer col-10">
					<h3 className="offset-4">{userName}</h3>
					<div className="searchBar">
						<Form.Control
							type="search"
							placeholder="Search Songs/Artists"
							value={search}
							onChange={(e) => setSearch(e.target.value)}
						/>

						{selectedTrack && (
							<div className="">
								<VideoPlayer
									selectedTrack={selectedTrack}
									playlistVideo={playlistVideo}
								/>
							</div>
						)}

						<div
							className="flex-grow-1 mt-5 searchResults col-lg-6"
							style={{ overflowY: "auto" }}
						>
							{searchResults.map((track, id) => (
								<TrackSearchResult
									track={track}
									key={track.uri}
									showPlayer={showPlayer}
									setPlaylistVideo={setPlaylistVideo}
								/>
							))}
							{searchResults.length === 0 && (
								<div
									className="text-center"
									style={{ whiteSpace: "pre" }}
								></div>
							)}
						</div>
					</div>
					<div className="Row hotRow">
						{!selectedTrack && (
							<>
								<h1 className="display-1">WHAT'S HOT TODAY?</h1>
								<p>
									Sun Sun Pill's new banger{" "}
									<i>Not Not While the Gyro</i> will brighten
									your day probably . . .
								</p>
								<button className="button">PLAY NOW</button>
							</>
						)}
					</div>
				</div>
			</div>
		</>
	);
}
