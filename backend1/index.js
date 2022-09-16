const dotenv = require("dotenv");
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const app = express();
const hbs = require("hbs");
dotenv.config({ path: "./config.env" });
require("./db/conn");

// const Song = require("./models/songs");

// for song data
// const routes = require("./routes/songData");

const passport = require("passport");

const User = require("./models/userSchema");

app.use(express.json());
app.use(cors());

// linking routes folder
app.use(require("./routes/auth"));

// app.use(require("./routes/songData"));

// mongoose.connect("mongodb://localhost/music_data", async () => {
//   console.log("rijul brother database connected");
//   try {
//     const data = await Song.find({});
//     console.log(data);
//   } catch (error) {
//     console.log("not", error);
//   }
// });

const PORT = process.env.PORT;

// middleware

const middleware = (req, res, next) => {
  console.log("hey i am middle ware");
  next();
};

// app.get("/about", middleware, (req, res) => {
//   res.send("hey i am about page");
// });

app.listen(PORT, () => {
  console.log(`server has started on port ${PORT}`);
});
