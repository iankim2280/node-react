// const mongoose = require("mongoose");
import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
const saltRounder = 10;

const userSchema = mongoose.Schema({
  firstname: {
    type: String,
    maxlength: 30,
  },
  lastname: {
    type: String,
    maxlength: 30,
  },
  email: {
    type: String,
    trim: true, // ian kim@gmail.com trim() removes spaces
    unique: true,
    required: [true, "Please provide your email"],
  },
  password: {
    type: String,
  },
  role: {
    type: String,
    enum: ["USER", "ADMIN"],
    default: "USER",
  },
  google: String,
  facebook: String,
  photo: String,
  token: String,
  tokenExp: Number,
});

userSchema.pre("save", function (next) {
  let user = this;
  if (user.isModified("password")) {
    // password
    bcrypt.genSalt(saltRounder, (err, salt) => {
      if (err) return next(err);
      bcrypt.hash(user.password, salt, (err, hash) => {
        if (err) return next(err);
        user.password = hash;
        next();
      });
    });
  } else {
    next();
  }
});

userSchema.methods.comparePassword = function (plainPassword, callBack) {
  bcrypt.compare(plainPassword, this.password, function (err, isMatch) {
    if (err) return callBack(err);
    callBack(null, isMatch); // noerr, password is correct
  });
};

userSchema.methods.generateToken = function (callBack) {
  let user = this;
  let token = jwt.sign(user._id.toHexString(), "secretToken");
  user.token = token;
  user.save(function (err, user) {
    if (err) return callBack(err);
    callBack(null, user);
  });
};

userSchema.statics.findByToken = function (token, callBack) {
  let user = this;
  // decode tokens
  jwt.verify(token, "secretToken", function (err, decoded) {
    // find users with user._id then compare token that came from client to DB's

    user.findOne({ _id: decoded, token: token }, function (err, user) {
      if (err) return callBack(err);
      // if there's no error return user info
      callBack(null, user);
    });
  });
};

const User = mongoose.model("User", userSchema);
module.exports = { User };
// export default mongoose.model("User", userSchema);?
