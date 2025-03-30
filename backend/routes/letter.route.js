const express = require("express");

const {saveToDraft, removeFromDraft} = require("../controllers/letter.controller");

const router = express.Router();

router.post("/draft", saveToDraft);
router.delete("/draft/:id", removeFromDraft);

module.exports = router;
