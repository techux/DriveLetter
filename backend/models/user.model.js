const mongoose = require("mongoose");
const crypto = require("crypto");
require("dotenv").config();

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    accessToken: {
      type: String,
      default: null,
    },
    refreshToken: {
      type: String,
      default: null,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);


const User = mongoose.model("user", userSchema);

module.exports = User;
