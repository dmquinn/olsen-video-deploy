const mongoose = require("mongoose");

const playlistSchema = mongoose.Schema({
	playlistNumber: {
		type: Number,
	},
	playlistItem: {
		type: String,
	},
});

const Playlist = mongoose.model("Playlist", playlistSchema);

module.exports = Playlist;
