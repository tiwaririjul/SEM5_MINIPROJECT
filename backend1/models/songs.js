const mongoose = require("mongoose");

const Song = new mongoose.Schema({
  ID: String,
  NAME: String,
  ARTIST: String,
  SONG: String,
  POSTER: String,
});

module.exports = mongoose.model("song", Song);
