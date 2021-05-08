const mongoose = require("mongoose");

const playlistSchema = mongoose.Schema({
	createdBy: {
		type: String,
	},
	playlistNumber: {
		type: Number,
	},
	playlistItem: {
		type: String,
	},
});

const Playlist = mongoose.model("Playlist", playlistSchema);

module.exports = Playlist;
