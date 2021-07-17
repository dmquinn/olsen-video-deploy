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
if ((process.env.NODE_ENV = "production")) {
	app.get("*", (req, res) =>
		res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"))
	);
} else {
	app.get("/", (req, res) => {
		res.send("API is running....");
	});
}

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

const PORT = process.env.PORT || 5000;
app.listen(
	PORT,
	console.log(`server running in ${process.env.NODE_ENV} on port ${PORT}`)
);
