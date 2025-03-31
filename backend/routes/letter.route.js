const express = require("express");
const { auth } = require("../middlewares/auth.middleware");
const { saveToDraft, removeFromDraft, getFromDrafts} = require("../controllers/letter.controller");

const router = express.Router();

router.get("/draft", auth, getFromDrafts);
router.post("/draft", auth, saveToDraft);
router.delete("/draft/:id", removeFromDraft);

module.exports = router;
