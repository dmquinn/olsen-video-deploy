require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./database.js");
const SpotifyWebApi = require("spotify-web-api-node");
const path = require("path");
const PlaylistItem = require("./models/playlistModel");

require("dotenv").config({ path: path.resolve(__dirname, "./.env") });
connectDB();

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post(
	"/playlist",

	async (req, res) => {
		console.log("body", req.body.videoSrc);

		const song = await PlaylistItem.create({
			playlistItem: req.body.videoSrc,
		});
		if (song) {
			res.status(201).json({
				playlistItem: song,
			});
			console.log("created");
		} else {
			res.status(400);
			throw new Error("Invalid Playlist Action");
		}
	}
);

app.post("/refresh", (req, res) => {
	const refreshToken = req.body.refreshToken;
	const spotifyApi = new SpotifyWebApi({
		redirectUri: process.env.REACT_APP_REDIRECT_URI,
		clientId: process.env.REACT_APP_CLIENT_ID,
		clientSecret: process.env.REACT_APP_CLIENT_SECRET,
		refreshToken,
	});

	spotifyApi
		.refreshAccessToken()
		.then((data) => {
			res.json({
				accessToken: data.body.accessToken,
				expiresIn: data.body.expiresIn,
			});
		})
		.catch((err) => {
			console.log(err);
			res.sendStatus(400);
		});
});

app.post("/login", (req, res) => {
	const code = req.body.code;
	const spotifyApi = new SpotifyWebApi({
		redirectUri: process.env.REACT_APP_REDIRECT_URI,
		clientId: process.env.REACT_APP_CLIENT_ID,
		clientSecret: process.env.REACT_APP_CLIENT_SECRET,
	});

	spotifyApi
		.authorizationCodeGrant(code)
		.then((data) => {
			res.json({
				accessToken: data.body.access_token,
				refreshToken: data.body.refresh_token,
				expiresIn: data.body.expires_in,
			});
		})
		.catch((err) => {
			res.sendStatus(400);
		});
	spotifyApi.setAccessToken(code);
});

if ((process.env.NODE_ENV = "production")) {
	app.use(express.static(path.join(__dirname, "../frontend/build")));

	app.get("*", (req, res) =>
		res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"))
	);
} else {
	app.get("/", (req, res) => {
		res.send("API is running....");
	});
}

app.listen(5000, () => {
	console.log("listening on port 5000");
});
