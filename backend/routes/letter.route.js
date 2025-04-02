const express = require("express");
const { auth } = require("../middlewares/auth.middleware");
const { saveToDraft, removeFromDraft, getFromDrafts, saveToDrive} = require("../controllers/letter.controller");

const router = express.Router();

router.get("/draft", auth, getFromDrafts);
router.post("/draft", auth, saveToDraft);
router.delete("/draft/:id", removeFromDraft);

router.post("/save", auth, saveToDrive);

module.exports = router;
