const Letter = require("../models/letter.model");

const getFromDrafts = async (req, res) => {
  try {
    const letters = await Letter.find({ createdBy: req.user.id });
    return res.status(200).json({
      status: "ok",
      letters,
    });
  } catch (error) {
    console.error(`Error in saveToDraft : ${error.stack || error.message}`);
    return res.status(500).json({
      status: "error",
      message: "Internal Server Error",
    });
  }
};

const saveToDraft = async (req, res) => {
  try {
    const { content } = req.body;

    if (!content) {
      return res.status(400).json({
        status: "error",
        message: "Please fill in all fields",
      });
    }

    const createdBy = req.user.id;

    const result = await Letter.create({
      content,
      createdBy,
    });

    return res.status(201).json({
      status: "ok",
      message: "Letter saved as Draft",
      data: result,
    });
  } catch (error) {
    console.error(`Error in saveToDraft : ${error.stack || error.message}`);
    return res.status(500).json({
      status: "error",
      message: "Internal Server Error",
    });
  }
};

const removeFromDraft = async (req, res) => {
  try {
    const letterid = req.params.id;
    await Letter.findByIdAndDelete(letterid);
    return res.status(200).json({
      status: "ok",
      message: "Letter removed from Draft",
    });
  } catch (error) {
    console.error(`Error in removeFromDraft : ${error.stack || error.message}`);
    return res.status(500).json({
      status: "error",
      message: "Internal Server Error",
    });
  }
};

module.exports = {
  saveToDraft,
  removeFromDraft,
  getFromDrafts,
};
