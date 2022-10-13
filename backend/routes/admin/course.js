const express = require("express");
const router = express.Router();
const middleware = require("./middleware");
const add = require("./course/add");


router.use("/", middleware);
router.use("/", add);


module.exports = router;