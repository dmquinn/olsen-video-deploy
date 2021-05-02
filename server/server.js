require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./database.js");
const SpotifyWebApi = require("spotify-web-api-node");
const path = require("path");
const axios = require("axios");

require("dotenv").config({ path: path.resolve(__dirname, "./.env") });
connectDB();

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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
	spotifyApi.setAccessToken(process.env.REACT_APP_ACCESS_TOKEN);
	spotifyApi.getMe().then(
		function (data) {
			const userName = data.body.display_name;
			console.log(userName);
		},
		function (err) {
			console.log("Something went wrong!", err);
		}
	);
});

app.listen(3001, () => {
	console.log("listening on port 3001");
});

// module.exports = userName;
