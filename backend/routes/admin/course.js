const express = require("express");
const router = express.Router();
const add = require("./course/add");

router.use("/", add);

module.exports = router;