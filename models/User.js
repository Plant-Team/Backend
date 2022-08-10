const mongoose = require("../db/connection");

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      unique: [true, "Email is in use"],
      required: [true, "Please provide an Email"],
    },
    username: {
      type: String,
      unique: [true, "Username is taken"],
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
      required: [true, "Password is required"],
    },
    plants: [
      { type: mongoose.Schema.Types.ObjectId, ref: "Plant", required: false },
    ],
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
      transform: (_doc, ret) => {
        delete ret.password;
        return ret;
      },
    },
  }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
