const express = require("express");
const router = express.Router();
const one = require("./mark/one");
const all = require("./mark/all");
const submit = require("./mark/submit");
const upload = require("./mark/upload");

router.use("/", one);
router.use("/", all);
router.use("/", submit);
router.use("/", upload);

module.exports = router;