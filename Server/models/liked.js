const mongoose = require("mongoose");

const like = new mongoose.Schema({
  LIKED_SONG_ID: String,
  LIKED_SONG_TYPE: String,
  LIKED_SONG_ARTIST: String,
  LIKED_SONG_SONG: String,
  LIKED_SONG_IMAGE: String,
});

module.exports = mongoose.model("liked", like);
