const express = require("express");
const router = express.Router();
const rawRouter = require("./marks/raw");

router.use("/", rawRouter);

module.exports = router;