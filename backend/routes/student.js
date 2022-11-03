const express = require("express");
const router = express.Router();
const middlewareRouter = require("./student/middleware");
const interviewsRouter = require("./student/interviews");
const filesRouter = require("./student/files");
const marksRouter = require("./student/marks");
const groupRouter = require("./student/group");

router.use("/", function (req, res, next) {
    next();
})

router.use("/course/", middlewareRouter);
router.use("/course/:course_id/interviews", interviewsRouter);
router.use("/course/:course_id/files", filesRouter);
router.use("/course/:course_id/marks", marksRouter);
router.use("/course/:course_id/group", groupRouter);

module.exports = router;