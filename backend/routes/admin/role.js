const express = require("express");
const router = express.Router();
const add = require("./role/add");

router.use("/", add);

module.exports = router;