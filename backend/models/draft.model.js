const mongoose = require("mongoose");

const draftSchema = new mongoose.Schema(
  {
    filename: {
      type: String,
      default: `DriveLetter_${Date.now()}`
    },
    content: {
      type: String,
      required: true,
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

const Draft = mongoose.model("Draft", draftSchema);

module.exports = Draft;
