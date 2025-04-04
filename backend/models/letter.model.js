const mongoose = require("mongoose");

const letterSchema = new mongoose.Schema(
  {
    fileId: {
      type: String,
      required: true,
    },
    filename: {
      type: String,
      default: `DriveLetter_${Date.now()}`
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const Letter = mongoose.model("Letter", letterSchema);

module.exports = Letter;
