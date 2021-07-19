const mongoose = require("mongoose");

const playlistSchema = mongoose.Schema({
	playlistItem: {
		type: String,
	},
});

const PlaylistItem = mongoose.model("PlaylistItem", playlistSchema);

module.exports = PlaylistItem;
