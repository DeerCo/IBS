const express = require("express");
const router = express.Router();
const submitRouter = require("./a1/submit");

router.use("/", function (req, res, next) {
    next();
})

router.use(express.static("./public/student/a1"));

router.use("/", submitRouter);

module.exports = router;