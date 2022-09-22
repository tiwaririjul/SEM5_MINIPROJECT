const mongoose = require("mongoose");

const Song = new mongoose.Schema({
  INST_ID: String,
  INST_TYPE: String,
  INST_ARTIST: String,
  INST_SONG: String,
  INST_IMAGE: String,
});

module.exports = mongoose.model("song", Song);
