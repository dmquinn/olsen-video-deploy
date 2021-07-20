const PlaylistItem = require("../models/playlistModel");
const asyncHandler = require("express-async-handler");

const addPlaylistItem = async (req, res) => {
	console.log("song from theb backend");
	const { playlistItem } = req.body;

	const song = await PlaylistItem.create({
		playlistItem,
	});
	if (song) {
		res.status(201).json({
			playlistItem,
		});
	} else {
		res.status(400);
		throw new Error("Invalid Playlist Action");
	}
};

module.exports = { addPlaylistItem };
