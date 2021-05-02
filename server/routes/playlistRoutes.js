const Playlist = require("./models/playlistModel");

const addPlaylistItem = async (req, res) => {
	const { playlistItem } = req.body;

	if (playlistItems && playlistItems.length === 0) {
		res.status(400);
		throw new Error("No playlist items");
		return;
	} else {
		const playlist = new Playlist({
			playlistItems,
		});

		const createdPlaylist = await playlist.save();

		res.status(201).json(createdOrder);
	}
};

module.exports = addPlaylistItem;
