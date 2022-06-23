const User = require("../Models/user.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
require("dotenv").config();
const secretKey = process.env.SECRET_KEY;

console.log("secretkey", secretKey);

const register = async (req, res) => {
  try {
    const userObject = new User(req.body);
    const newUser = await userObject.save();
    console.log("new registered user", newUser);

    //generating the token using jwt to send to client through cookies  response
    const userToken = jwt.sign(
      {
        _id: newUser._id,
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        emailId: newUser.emailId,
      },
      secretKey
    );
    console.log("userToken", userToken);

    //sending response along with the usertoken in cookie
    res.status(200).cookie("userToken", userToken).json({
      _id: newUser._id,
      firstName: newUser.firstName,
      lastName: newUser.lastName,
      emailId: newUser.emailId,
    });
  } catch (err) {
    console.log("Error while registering the user", err);
    res.status(400).json(err);
  }
};

const login = async (req, res) => {
  try {
    const loggedInUser = req.body;
    const user = await User.findOne({ emailId: loggedInUser.emailId });
    console.log("user", user);
    if (!user) {
      res.status(400).json({ Error: "Inva;;;lid Login" });
    } else {
      const passwordcheck = await bcrypt.compare(
        loggedInUser.password,
        user.password
      );
      console.log("passwordChekc", loggedInUser.password);
      console.log("passwordChekc", user.password);

      if (!passwordcheck) {
        res.status(400).json({ Error: "Invalikkkkkd Login" });
      } else {
        // if password and email matched again generate the new token and send to the client via cookies
        // when decoding the token in client side will get the user deatails sent through payload
        const userToken = jwt.sign(
          {
            _id: user._id,
            firstName: user.firstName,
            lastName: user.lastName,
            emailId: user.emailId,
          },
          secretKey
        );
        console.log("userToken", userToken);

        //sending response along with the usertoken in cookie
        res.status(200).cookie("userToken", userToken).json({
          _id: user._id,
          firstName: user.firstName,
          lastName: user.lastName,
          emailId: user.emailId,
        });
      }
    }
  } catch (err) {
    console.log("Error while Logging the  User", err);
    res.status(400).json({ message: "Invalid Login" });
  }
};

const logout = (req, res) => {
  res.clearCookie("userToken").json({ message: "SuccessFully logged Out" });
};

module.exports = { register, login, logout };
