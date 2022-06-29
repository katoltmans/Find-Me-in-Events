const User = require("../Models/user.model");
const jwt = require("jsonwebtoken"); // sending the tokens
const bcrypt = require("bcrypt"); // password
const secretKey = process.env.SECRET_KEY;
const resetKey = process.env.RESET_KEY;
const mailgun = require("mailgun-js");
const _ = require("lodash");

const DOMAIN = "sandboxf9ad8162cea9485d81af6a158ee4f350.mailgun.org";
// const DOMAIN = resetKey;
const mg = mailgun({
  apiKey: "4bdc56c72e72e2d7aaaf11412e534f3b-77985560-71f3a1c5",
  domain: DOMAIN,
});

console.log("userToken", resetKey);

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
        emailId: newUser.emailId, //payload
      },
      secretKey
    );
    console.log("userToken", userToresetKeyken);

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
      res.status(400).json({ Error: "Invalid Login" });
    } else {
      const passwordcheck = await bcrypt.compare(
        loggedInUser.password,
        user.password
      ); //

      if (!passwordcheck) {
        res.status(400).json({ Error: "Invalid Login" });
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

        const data = {
          from: "noreply@findme.com",
          to: user.emailId,
          subject: "Login Successful",
          text: "Login Successful",
        };
        mg.messages().send(data, function (error, body) {
          console.log(body);
        });

        console.log("succesufully sent email", userToken);

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

//get the useremail from body
const forgotPassword = async (req, res) => {
  try {
    const { emailId } = req.body;
    const user = await User.findOne({ emailId });
    if (!user) {
      res.status(400).json({ Error: "user not exists" });
    }
    const userToken = jwt.sign(
      {
        _id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        emailId: user.emailId,
      },
      secretKey
    );

    const data = {
      from: "noreply@findme.com",
      to: emailId,
      subject: "Password RESET",
      html: `<h2>Please Click the link to reset the password</h2>
      <p>http://localhost:3000/resetpassword/${userToken}</p>
      `,
    };

    const updateUser = await user.updateOne({ resetLink: userToken });
    mg.messages().send(data, function (error, body) {
      console.log("body", body);
    });

    console.log("succesufully sent email", userToken);
    res.status(200).json("email sent successfullyyy");
  } catch (err) {
    console.log("Error while reseting the   password", err);
    res.status(400).json(err);
  }
};

const resetPassword = async (req, res) => {
  try {
    const { token, newPassword, confirmNewPassword } = req.body;
    if (token) {
      const userPayload = jwt.verify(token, secretKey);
      if (!userPayload) {
        console.log("token verification failed ");
      } else {
        let user = await User.findOne({ resetLink: token });
        if (user) {
          const obj = {
            password: newPassword,
            confirmPassword: confirmNewPassword,
            resetLink: "",
          };
          user = _.extend(user, obj);
          const updatedUser = await user.save();

          console.log("Successfully changed the password", updatedUser);
          res.status(200).json("Successfully changed the password");
        } else {
          res.status(401).json("Token expired / emailadress expired");
        }
      }
    } else {
      res.status(401).json(err);
    }
  } catch (err) {
    console.log("Error while reseting the   password", err);
    res.status(400).json(err);
  }
};

module.exports = { register, login, logout, forgotPassword, resetPassword };
