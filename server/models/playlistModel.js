const mongoose = require("mongoose");

const playlistSchema = mongoose.Schema({
	playlistItem: {
		type: String,
	},
	title: { type: String },
	createdBy: { type: String },
});

const PlaylistItem = mongoose.model("playlistitems", playlistSchema);

module.exports = PlaylistItem;
