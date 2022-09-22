const express = require("express");
const sendEmail = require("../utils/email");
const { findOne } = require("../models/userSchema");
var nodemailer = require("nodemailer");
const mongoose = require("mongoose");
// database 2
const crypto = require("crypto");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cookieparser = require("cookie-parser");

var LocalStorage = require("node-localstorage").LocalStorage,
  localStorage = new LocalStorage("./scratch");

const router = express.Router();
require("../db/conn");

function randomOtp() {
  const generatedOtp = Math.floor(Math.random() * (9999 - 1000)) + 1000;
  return generatedOtp;
}

const Song = require("../models/songs");
const User = require("../models/userSchema");
const like = require("../models/liked");

router.post("/register", async (req, res) => {
  let emailExist = false;
  //using promise
  const { name, email, password, confirmPassword } = req.body;

  if (!name || !email || !password || !confirmPassword) {
    return res.status(422).json({ error: "plz filled tha data properly" });
  }

  // sending mail for verification

  User.findOne({ email: email })
    .then((userExist) => {
      if (userExist) {
        return res.status(422).json({ error: "Email allready exist" });
      } else {
        try {
          console.log(email);

          var transporter = nodemailer.createTransport({
            service: "gmail",
            host: "smtp.gmail.com",
            //   port: 465,
            secure: true,

            auth: {
              user: "tiwaririjul12@gmail.com",
              pass: "zyqejjyoswzqgjsh",
            },
          });

          //pndwtsjaitmhxhhg

          var mailOptions = {
            from: "tiwaririjul12@gmail.com",
            to: email,
            subject: "INSTRUMENTAL SONGS",
            text: ` you are verified please click the above link so that you can visit our website:  http://localhost:3000/login`,
          };
          console.log("last");

          transporter.sendMail(mailOptions, async function (error, info) {
            if (error) {
              console.log(error);
            } else {
              emailExist = true;
              await console.log("Email sent: " + info.response);
              console.log("reached");
              // process.exit(1);
            }
          });
        } catch (error) {
          console.log(
            "error bro bhot sara error hai yrr bhai kya hi bolu ruk batata hu kya error hai dekh ye error hai : ",
            error
          );
        }
      }

      const user = new User({
        name,
        email,
        password,
        confirmPassword,
        emailToken: crypto.randomBytes(64).toString("hex"),
        verified: false,
      });

      user
        .save()
        .then(() => {
          console.log("stored in database");
          res.status(201).json({ message: "user registered successfully" });
        })
        .catch((err) =>
          res.status(500).json({ error: "failed to registered" })
        );
    })
    .catch((err) => {
      console.log(err);
    });
});

const createToken = (id) => {
  return jwt.sign({ id }, process.env.SECRET_KEY);
};

// router.post("/login", async (req, res) => {
//   const { email, password } = req.body;

//   try {
//     const validEmail = await User.findOne({ email: email });
//     const validPass = await User.findOne({ password: password });

//     console.log("hi");
//     console.log(validEmail, validPass);

//     // if (validEmail && validPass) {
//     if (validEmail) {
//       console.log("entered validemail");

//       if (validPass) {
//         res.json({ message: "user login successfully" });
//         console.log("user login successfully");
//       } else {
//         res.status(422).json({ message: "incorrect password" });
//         // res.status(400);
//         console.log("incorrect password");
//       }
//     } else {
//       // res.json.status(422)({ message: "invalid Email" });
//       res.status(400);
//       console.log("invalid email");
//     }
//   } catch (error) {
//     console.log("error bro ", error);
//   }
// });

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400);
  }
  const validEmail = await User.findOne({ email: email });
  const validPass = await User.findOne({ password: password });

  if (validEmail) {
    if (validPass) {
      //working
      const token = createToken(validEmail.id);
      console.log(token);
      res.cookie("accesstoken", token);
      res.json({ message: "user login successfully" });
      console.log("user login successfully");

      // const token = await validEmailzz.generateAuthToken();
      // console.log(token);
      // res.cookie("jwtoken", token);
    } else {
      res.status(400);
      res.json({ message: "invalid credential" });
      console.log("incorrect password");
    }
  } else {
    res.status(400);
    res.json({ message: "invalid credential" });
    // res.status(400);
    // console.log("invalid email");
  }
});

router.post("/forgotPassword", async (req, res) => {
  const { email } = req.body;
  // const validEmail = await User.findOne({ email: email });
  const validEmail = await User.findOne({ email: email });
  if (validEmail) {
    let otp = randomOtp();
    // console.log("hey i am otp", otp);
    localStorage.setItem("otp", otp);
    console.log("hey i am localstorage otp", localStorage.getItem("otp"));
    // const randomOtp = Math.floor(Math.random() * (9999 - 1000)) + 1000;

    console.log(email);

    localStorage.setItem("email", email);

    try {
      console.log(validEmail.email);

      console.log("entered here");
      var transporter = await nodemailer.createTransport({
        service: "gmail",
        host: "smtp.gmail.com",
        //   port: 465,
        secure: true,

        auth: {
          user: "tiwaririjul12@gmail.com",
          pass: "zyqejjyoswzqgjsh",
        },
      });

      //pndwtsjaitmhxhhg

      var mailOptions = {
        from: "tiwaririjul12@gmail.com",
        to: validEmail.email,
        subject: "INSTRUMENTAL SONGS",
        text: ` YOUR OTP IS  ${otp}`,
      };
      console.log("last");

      transporter.sendMail(mailOptions, async function (error, info) {
        if (error) {
          console.log(error);
        } else {
          await console.log("Email sent: " + info.response);
          res.json({ message: "success" });
          res.status(101);
          // process.exit(1);
        }
      });
    } catch (error) {
      console.log(
        "error bro bhot sara error hai yrr bhai kya hi bolu ruk batata hu kya error hai dekh ye error hai : ",
        error
      );
    }
  } else {
    res.status(400);
    // res.json({ message: "success" });
  }

  // return randomOtp;
});

router.post("/otpverify", (req, res) => {
  const { userotp } = req.body;

  var verifyOtp = localStorage.getItem("otp");

  if (verifyOtp == userotp) {
    res.json({ message: "success" });

    console.log("user verified");
  } else {
    console.log("you have entered wrong otp");
  }
});

router.post("/resetPassword", async (req, res) => {
  const email = localStorage.getItem("email");
  if (email) {
    const { password, confirmPassword } = req.body;

    console.log(email);
    console.log(password);
    console.log(confirmPassword);

    if (!password || !confirmPassword) {
      res.status(422);
      console.log("please fill all the data");
    } else {
      const user = await User.findOne({ email: email });
      console.log(user._id);
      const userKiId = user._id;

      try {
        const result = await User.updateOne(
          { _id: userKiId },
          {
            $set: {
              password: password,
              confirmPassword: confirmPassword,
            },
          }
        );
        res.json({ message: "password updated" });
        console.log(result);
      } catch (error) {
        console.log(error);
      }
    }
  } else {
    res.json({ message: "user not found" });
  }
});

const data = [
  {
    Id: "1",
    Instrument_Type: "happy",
    Artist: "vikram shitole",
    Link: "https://drive.google.com/file/d/1jueDyK5b8hr7S_LkavmrBKau4OSXALMF/view?usp=sharing",
    image:
      "https://cdn.vox-cdn.com/thumbor/lc6hYWUJO2Fqyb_oWrUGGq8Z9pM=/0x0:6454x4303/1400x1400/filters:focal(3227x2152:3228x2153)/cdn.vox-cdn.com/uploads/chorus_asset/file/23212985/shutterstock_1886570575.jpg",
  },
  {
    Id: "2",
    Instrument_Type: "happy",
    Artist: "Rakesh Zore",
    Link: "https://drive.google.com/file/d/1jysO8AWZjAvNFG1kNelvDpKYHvQ2OqET/view?usp=sharing",
    image:
      "https://static6.depositphotos.com/1001599/569/i/600/depositphotos_5691496-stock-photo-treble-clef.jpg",
  },

  {
    Id: "3",
    Instrument_Type: "sad",
    Artist: "Pradip pal",
    Link: "https://drive.google.com/file/d/1m39WkC5R-9YXrMLP3CTDlvpLHSpjqpRR/view?usp=sharing",
    image:
      "https://thumbs.dreamstime.com/b/dirty-music-background-21777451.jpg",
  },
  {
    Id: "4",
    Instrument_Type: "sad",
    Artist: "palavi thakur",
    Link: "https://drive.google.com/file/d/1m4ivNw0PPhs80ArhenHMismZLYcgXy2X/view?usp=sharing",
    image:
      "https://www.uscreen.tv/wp-content/uploads/2021/02/royalty-free-music-375x214.png",
  },

  {
    Id: "5",
    Instrument_Type: "neutral",
    Artist: "sanu tiwari",
    Link: "https://drive.google.com/file/d/1oAVy76C3UMAYiYaoq7Zy8o1YqaYzqP5t/view?usp=sharing",
    image:
      "https://cdn.vox-cdn.com/thumbor/lc6hYWUJO2Fqyb_oWrUGGq8Z9pM=/0x0:6454x4303/1400x1400/filters:focal(3227x2152:3228x2153)/cdn.vox-cdn.com/uploads/chorus_asset/file/23212985/shutterstock_1886570575.jpg",
  },
];

// data.forEach((data) => {
//   const newData = new Song({
//     INST_ID: data.Id,
//     INST_TYPE: data.Instrument_Type,
//     INST_ARTIST: data.Artist,
//     INST_SONG: data.Link,
//     INST_IMAGE: data.image,
//   });
//   newData.save();
// });

router.get("/songdata", async (req, res) => {
  // res.send("express");
  // try {
  //   const data = await Song.find({});
  //   console.log("data is", data);
  // } catch (error) {
  //   console.log("not", error);
  // }

  // const deletedData = await Song.deleteMany();

  // console.log(deletedData);

  Song.find({})
    .then((items) => {
      res.json(items);
      console.log(items[0].NAME);
    })
    .catch((err) => console.log("error is", err));
});

// router.get("/home", authenticate, (req, res) => {
//   console.log("hello i am home page");
//   res.send(req.rootUser);
//   // res.send("hello i am about page");
// });

router.post("/liked", async (req, res) => {
  console.log("enter in liked API");
  const { Id, type, artist, song, image } = req.body;

  console.log("recieved info ", Id, type, artist, song, image);

  like
    .findOne({ LIKED_SONG_ARTIST: artist })
    .then((songExist) => {
      if (songExist) {
        return res.status(422).json({ error: "liked song allready exist" });
      }
      const likedSong = new like({
        LIKED_SONG_ID: Id,
        LIKED_SONG_TYPE: type,
        LIKED_SONG_ARTIST: artist,
        LIKED_SONG_SONG: song,
        LIKED_SONG_IMAGE: image,
      });

      likedSong
        .save()
        .then(() => {
          console.log(" liked song stored in database");
          res.json({ message: "stored in database" });
        })
        .catch((err) => res.json({ error: "failed to store in database" }));
    })
    .catch((err) => {
      console.log(err);
    });
});

router.get("/likeddata", async (req, res) => {
  // res.send("express");
  // try {
  //   const data = await like.find({});
  //   console.log("data is", data);
  // } catch (error) {
  //   console.log("not", error);
  // }

  // const deletedData = await Song.deleteMany();

  // console.log(deletedData);

  like
    .find({})
    .then((items) => {
      res.json(items);
      // console.log(items[0].NAME);
    })
    .catch((err) => console.log("error is", err));
});

router.post("/deletesong", async (req, res) => {
  const { artist } = req.body;
  console.log(artist);

  const song = await like.findOne({ LIKED_SONG_ARTIST: artist });
  console.log(song);
  const songKiId = song._id;
  console.log("this is aong id", songKiId);

  const deleted = await like.deleteOne({ _id: songKiId });

  if ((deleted.acknowledged = true)) {
    res.json({ message: "removed" });
  }
  console.log(deleted);
});

module.exports = router;
