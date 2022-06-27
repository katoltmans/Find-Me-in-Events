// this file will verify the token coming form client side matches with token we sent by using the secret key

require("dotenv").config();
const secretKey = process.env.SECRET_KEY;
const jwt = require("jsonwebtoken");
const User = require("../Models/user.model");

const authenticate = async (req, res, next) => {
  try {
    const userPayload = jwt.verify(req.cookies.userToken, secretKey);
    console.log("userPayLoad", userPayload);

    if (userPayload) {
      const user = await User.findOne({ _id: userPayload._id });
      if (user) {
        req.loggedInuser = userPayload;
        console.log("User is authenticated");
        next();
      } else {
        console.log("unauthenticated user");
      }
    }
  } catch (err) {
    res.status(400).json(err);
  }
};

module.exports = authenticate;
