const express = require("express");
const router = express.Router();
const add_router = require("./task/add");

router.use("/", add_router);

module.exports = router;