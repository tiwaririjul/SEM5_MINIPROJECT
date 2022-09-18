const jwt = require("jsonwebtoken");
const cookie = require("cookie-parser");
const User = require("../models/userSchema");

const Authenticate = async (req, res, next) => {
  try {
    const token = req.cookies.accesstoken;
    const verifyToken = jwt.verify(token, process.env.SECRET_KEY);
    const rootUser = await User.findOne({
      _id: verifyToken._id,
      emailToken: token,
    });

    if (!rootUser) {
      throw new Error("user not found");
      console.log("error"); 
    }
    req.token = token;
    req.rootUser = rootUser;
    req.userID = rootUser._id;

    next();
  } catch (error) {
    res.status(401).send("unauthorized : no token provided");
    console.log("errorvb : ", error);
  }
};

module.exports = Authenticate;
