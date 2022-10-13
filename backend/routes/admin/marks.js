const express = require("express");
const router = express.Router();
const middleware = require("./middleware");
const one = require("./marks/one");
const all = require("./marks/all");
const submit = require("./marks/submit");
const upload = require("./marks/upload");

router.use("/", middleware);
router.use("/", one);
router.use("/", all);
router.use("/", submit);
router.use("/", upload);

module.exports = router;