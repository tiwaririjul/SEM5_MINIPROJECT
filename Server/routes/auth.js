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
// require("./db/music");

function randomOtp() {
  const generatedOtp = Math.floor(Math.random() * (9999 - 1000)) + 1000;
  return generatedOtp;
}

const Song = require("../models/songs");
const User = require("../models/userSchema");

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
    Instrument_Type: "Sitar",
    Artist: " Pandit_Ravi_Shankar",
    Link: "https://drive.google.com/uc?export=view&id=1ocQBQqOV2-Ld6ToAl-yTi2KfWKbA2yOn",
    image: "https://upload.wikimedia.org/wikipedia/commons/4/4f/Sitar.png",
  },
  {
    Id: "2",
    Instrument_Type: "Sarod",
    Artist: " Ustad_Allauddin_Khan",
    Link: "https://drive.google.com/uc?export=view&id=1ofdAiFfrMPtXLV2YQ037Z_EEgleM5Wf6",
    image: "https://m.media-amazon.com/images/I/81JvgSsnRYL._SL1500_.jpg",
  },

  {
    Id: "3",
    Instrument_Type: "Sarangi , Tabla",
    Artist: " Ustad_Sultan_Khan_Sarangi,_Ustad_Zakir_Husain_Tabla",
    Link: "https://drive.google.com/uc?export=view&id=1ocSjml96XVwkj0NrZr_sdRQwxqW9UVYQ",
    image:
      "https://i.pinimg.com/564x/e4/55/32/e45532c029e9df78ac194c2cd90bea19--indian-musical-instruments-music-instruments.jpg",
  },
  {
    Id: "4",
    Instrument_Type: "Flute",
    Artist: " D._Madhusudan",
    Link: "https://drive.google.com/uc?export=view&id=1FGCeL7HpU4C9V4QQ9IG-elvEZQ84wUKV",
    image: "https://thumbs.dreamstime.com/z/bamboo-flute-28491601.jpg",
  },

  {
    Id: "5  ",
    Instrument_Type: "Harmonium",
    Artist: "Pt._Rambhau_Bijapure",
    Link: "https://drive.google.com/uc?export=view&id=1BpK62U_A6EHkZIMd5HHeRiaJi_lkNEWf",
    image: "  https://m.media-amazon.com/images/I/51rSSEpV8KL._SX355_.jpg",
  },
];

// data.forEach((data) => {
//   const newData = new Song({
//     INST_ID: data.Id,
//     INST_TYPE: data.Instrument_Type,
//     INST_ARTIST: data.Artist,
//     INST_SONG: data.Link,
//     INST_IMAGE: data.INST_IMAGE,
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

module.exports = router;
