const express = require("express");
const router = express.Router();
const middleware = require("./middleware");
const add = require("./role/add");


router.use("/", middleware);
router.use("/", add);


module.exports = router;