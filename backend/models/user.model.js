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
  },
  {
    timestamps: true,
    versionKey: false,
  }
);
5;

userSchema.pre("save", function (next) {
  if (this.accessToken) {
    const cipher = crypto.createCipher(
      "aes256",
      process.env.GOOGLE_TOKEN_ENCRYPT_KEY
    );
    this.accessToken = Buffer.concat([
      cipher.update(this.accessToken),
      cipher.final(),
    ]);
  }
  next();
});

userSchema.post("find", function (docs) {
  docs.forEach((doc) => {
    if (doc.accessToken) {
      const decipher = crypto.createDecipher(
        "aes256",
        process.env.GOOGLE_TOKEN_ENCRYPT_KEY
      );
      doc.accessToken = Buffer.concat([
        decipher.update(doc.accessToken),
        decipher.final(),
      ]).toString();
    }
  });
});

const User = mongoose.model("user", userSchema);

module.exports = User;
