const express = require("express");
const router = express.Router();

const middlewareRouter = require("../module/student/middleware");
const interviewsRouter = require("../module/student/interviews");
const filesRouter = require("../module/student/files");
const marksRouter = require("../module/student/marks");
const check_group = require("../module/group/student/check");
const create_group = require("../module/group/student/create");
const leave_group = require("../module/group/student/leave");
const invite_group = require("../module/group/student/invite");
const disinvite_group = require("../module/group/student/disinvite");
const accept_group = require("../module/group/student/accept");
const reject_group = require("../module/group/student/reject");

router.use("/", function (req, res, next) {
    next();
})

// Middleware
router.use("/course/", middlewareRouter);

// Group
router.use("/course/:course_id/group/check", check_group);
router.use("/course/:course_id/group/create", create_group);
router.use("/course/:course_id/group/leave", leave_group);
router.use("/course/:course_id/group/invite", invite_group);
router.use("/course/:course_id/group/disinvite", disinvite_group);
router.use("/course/:course_id/group/accept", accept_group);
router.use("/course/:course_id/group/reject", reject_group);

router.use("/course/:course_id/interviews", interviewsRouter);
router.use("/course/:course_id/files", filesRouter);
router.use("/course/:course_id/marks", marksRouter);

module.exports = router;