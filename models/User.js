const mongoose = require("../db/connection");

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      unique:true,
      required:true,
    },
    username: {
      type: String,
      unique:true,
    },
    firstname: {
      type: String,
      // required: true,
    },
    lastname: {
      type: String,
      // required: true,
    },
    password: {
      type: String,
      minLength: 8,
      required: true,
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
