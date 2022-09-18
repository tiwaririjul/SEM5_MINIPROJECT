const mongoose = require("mongoose");

const Song = new mongoose.Schema({
  INST_ID: String,

  INST_TYPE: String,
  INST_ARTIST: String,
  INST_SONG: String,
  INST_IMAGE: String,

  // Id: "64",
  // Instrument_name: "Raga_Ramkali",
  // Instrument_type: "Sarangi",
  // Artist: "Kamal_Sabri",
  // Link: "https://drive.google.com/uc?export=view&id=1GbwmF5gnDxB3dggUkZZGYYylee-TPhIm",
});

module.exports = mongoose.model("song", Song);
