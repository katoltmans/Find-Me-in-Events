const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const UserSchema = mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, "First name is required"],
      minlength: [2, "First name must be at-least 4 characters long"],
    },
    lastName: {
      type: String,
      required: [true, "Last Name is required"],
      minlength: [2, "Last name must be at-least 4 characters long"],
    },
    emailId: {
      type: String,
      required: [true, "Email is Required"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [4, "Password must be more than 4"],
    },
    resetLink: {
      data: String,
      default: "",
    },
  },
  { timestamps: true }
);

UserSchema.virtual("confirmPassword")
  .get(() => this._confirmPassword)
  .set((value) => (this._confirmPassword = value));

UserSchema.pre("validate", function (next) {
  if (this.password !== this.confirmPassword) {
    this.invalidate("confirmPassword", "Passwords must match");
  }
  next();
});

UserSchema.pre("save", async function (next) {
  try {
    const hashedPassword = await bcrypt.hash(this.password, 10);
    this.password = hashedPassword;
    console.log("hashed password", hashedPassword);
    console.log("paswword", this.password);
    next();
  } catch (err) {
    console.log("error while hashing the password", err);
  }
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
