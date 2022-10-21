const express = require("express");
const router = express.Router();
const middleware = require("./middleware");
const add_router = require("./task/add");

router.use("/", middleware);
router.use("/", add_router);

module.exports = router;