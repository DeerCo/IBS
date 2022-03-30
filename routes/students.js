const express = require("express");
const router = express.Router();
const authRouter = require("./students/auth");
const a3Router = require("./students/a3");
const interviewsRouter = require("./students/interviews");
const filesRouter = require("./students/files");
const marksRouter = require("./students/marks");

router.use("/", function(req, res, next) {
    next();
})

router.use("/auth", authRouter);
router.use("/a3", a3Router);
router.use("/interviews", interviewsRouter);
router.use("/files", filesRouter);
router.use("/marks", marksRouter);

module.exports = router;