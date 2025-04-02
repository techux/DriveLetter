const Draft = require("../models/draft.model");
const Letter = require("../models/letter.model");
const User = require("../models/user.model");

const { getDriveClient, driveFolder } = require("../services/googleDrive");

const getFromDrafts = async (req, res) => {
  try {
    const drafts = await Draft.find({ createdBy: req.user.id });
    return res.status(200).json({
      status: "ok",
      letters: drafts,
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

    const filename = req.body.filename.split('.')[0].replace(/\s+/g, '-') || `DriveLetter_${Date.now()}`

    if (!content) {
      return res.status(400).json({
        status: "error",
        message: "Please fill in all fields",
      });
    }

    const createdBy = req.user.id;

    const result = await Draft.create({
      filename,
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
    await Draft.findByIdAndDelete(letterid);
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


const saveToDrive = async (req, res) => {
  try {
    const content = req.body.content;

    // const filename = req.body.filename.split('.')[0]+"_DriveLetter.doc"
    const filename = req.body.filename.split('.')[0].replace(/\s+/g, '-')+".doc" || `DriveLetter_${Date.now()}.doc`;

    if (!content) {
      return res.status(400).json({
        status: "error",
        message: "Please draft the letter",
      });
    }

    const accessToken = (await User.findById(req.user.id).select('accessToken')).accessToken ;
    
    const drive = getDriveClient(accessToken);

    const folderId = await driveFolder(drive, "Letter App");

    const fileMetadata = {
      name: filename, //`letter_${req.user.id}_${Date.now()}.doc`,
      parents: [folderId],
      mimeType: "application/vnd.google-apps.document",
    };

    const media = { mimeType: "text/html", body: content };
    try {
      const file = await drive.files.create({
        resource: fileMetadata,
        media,
        fields: "id",
      });

      const result = await Letter.create({
        fileId: file.data.id,
        createdBy: req.user.id
      })

      return res.status(200).json({
        status: "ok",
        message: "Letter saved to Drive",
        letterId: result._id
      });

    } catch (error) {
      console.error(`Error in saveToDrive - Creating File in drive : ${error.stack || error.message}`);
      return res.status(500).json({
        status: "error",
        message: "Internal Server Error",
      });
    }
    
  } catch (error) {
    console.error(`Error in saveToDrive : ${error.stack || error.message}`);
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
  saveToDrive,
};