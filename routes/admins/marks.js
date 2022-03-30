const express = require("express");
const router = express.Router();
const middleware = require("./middleware");
const submit = require("./marks/submit");
const upload = require("./marks/upload");

router.use("/", middleware);
router.use("/", submit);
router.use("/", upload);

module.exports = router;