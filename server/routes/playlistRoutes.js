const express = require("express");
const router = express.Router();
const { addPlaylistItem } = require("../controllers/playlistController");

router.route("/").post(addPlaylistItem);

module.exports = router;
