import { useState, useEffect, useRef } from "react";
import useAuth from "./useAuth";
import { Form } from "react-bootstrap";
import SpotifyWebApi from "spotify-web-api-node";
import TrackSearchResult from "./components/TrackSearch";
import VideoPlayer from "./components/VideoPlayer";
import Playlist from "./components/Playlist";

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
	const [isActive, setIsActive] = useState(false);
	const [tempPlaylist, setTempPlaylist] = useState([]);
	const [loading, setLoading] = useState(false);

	const dropdownRef = useRef(null);

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

	const handleDropdown = () => setIsActive(!isActive);
	const handleChange = (e) => {
		setSearch(e.target.value);
	};
	const handleClick = () => {
		setSelectedTrack("angel olsen shut up kiss me");
	};
	const showPlayer = (value) => {
		setSelectedTrack(value);
	};
	const handleCloseTest = () => {
		setSelectedTrack("");
	};

	return (
		<>
			<div
				ref={dropdownRef}
				className={`playlistContainer ${
					isActive ? "active" : "inactive"
				}`}
			>
				<Playlist
					isActive={isActive}
					showPlayer={showPlayer}
					setSelectedTrack={setSelectedTrack}
					userId={userId}
					setLoading={setLoading}
					tempPlaylist={tempPlaylist}
				/>
			</div>
			<div className="row w-100">
				<p
					className="ml-5 mt-2"
					style={{ letterSpacing: "1.9px", color: "grey" }}
				>
					<i className="fas fa-user"> </i> {userName}
				</p>
				<div className="offset-2 playlistsTab" onClick={handleDropdown}>
					PLAYLISTS{" "}
					<i
						ref={dropdownRef}
						className={` ${
							isActive ? "fas fa-arrow-up" : "fas fa-arrow-down"
						}`}
						style={{ color: "black" }}
					>
						{" "}
					</i>
				</div>
			</div>
			<div className="p-5">
				<div className="">
					<div className="searchBar mr-auto">
						<Form.Control
							type="search"
							placeholder="Search Songs/Artists"
							value={search}
							onChange={handleChange}
							showPlayer={showPlayer}
						/>
					</div>

					<div className="row">
						<div className="mt-4 searchResults col-lg-6">
							{searchResults.map((track, id) => (
								<TrackSearchResult
									track={track}
									key={track.uri}
									showPlayer={showPlayer}
									setPlaylistVideo={setPlaylistVideo}
									setSelectedTrack={setSelectedTrack}
								/>
							))}
						</div>
						{selectedTrack && (
							<>
								<p
									className="closeButton button"
									onClick={handleCloseTest}
								>
									CLOSE VIDEO
								</p>
								{searchResults && (
									<div className="col-lg-6 ">
										<VideoPlayer
											selectedTrack={selectedTrack}
											playlistVideo={playlistVideo}
											userId={userId}
											setTempPlaylist={setTempPlaylist}
										/>
									</div>
								)}
							</>
						)}
					</div>
				</div>

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
