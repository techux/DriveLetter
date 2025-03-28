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
    username: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    googleToken: {
      type: String,
      default: null,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);
5;

userSchema.pre("save", function (next) {
  if (this.googleToken) {
    const cipher = crypto.createCipher(
      "aes256",
      process.env.GOOGLE_TOKEN_SECRET_KEY
    );
    this.googleToken = Buffer.concat([
      cipher.update(this.googleToken),
      cipher.final(),
    ]);
  }
  next();
});

userSchema.post("find", function (docs) {
  docs.forEach((doc) => {
    if (doc.googleToken) {
      const decipher = crypto.createDecipher(
        "aes256",
        process.env.GOOGLE_TOKEN_SECRET_KEY
      );
      doc.googleToken = Buffer.concat([
        decipher.update(doc.googleToken),
        decipher.final(),
      ]).toString();
    }
  });
});

const User = mongoose.model("user", userSchema);

module.exports = User;
