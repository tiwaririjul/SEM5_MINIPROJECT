const mongoose = require("mongoose");

const DB = process.env.DATABASE;

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    // useCreateIndex: true,
    // useUnifiedTopology: true,
    // useFindAndModify: false,
  })
  .then(() => {
    console.log("connection successful");
  })
  .catch((err) => {
    console.log("no connection");
  });

// "mongodb://localhost/music_data"

// const mongoose = require("mongoose");

// mongoose
//   .connect("mongodb://localhost/music_data", {
//     useNewUrlParser: true,
//     // useCreateIndex: true,
//     // useUnifiedTopology: true,
//     // useFindAndModify: false,
//   })
//   .then(() => {
//     console.log("connection successful");
//   })
//   .catch((err) => {
//     console.log("no connection");
//   });
