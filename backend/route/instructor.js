const express = require("express");
const router = express.Router();

const middleware = require("../module/auth/instructor/middleware");
const add_task = require("../module/task/staff/add");
const add_criteria = require("../module/criteria/staff/add");
const get_one_mark = require("../module/mark/staff/one");
const get_all_marks = require("../module/mark/staff/all");
const get_all_marks_csv = require("../module/mark/staff/all_csv");
const submit_mark = require("../module/mark/staff/submit");
const upload_marks = require("../module/mark/staff/upload");
const backupAllRouter = require("../module/ta/backup_all");
const backupTaskRouter = require("../module/ta/backup_task");

router.use("/", function (req, res, next) {
    next();
})

// Middleware
router.use("/course/", middleware);

// Task
router.use("/course/:course_id/task/", add_task);

// Criteria
router.use("/course/:course_id/criteria/add", add_criteria);

// Mark
router.use("/course/:course_id/mark/one", get_one_mark);
router.use("/course/:course_id/mark/all", get_all_marks);
router.use("/course/:course_id/mark/all_csv", get_all_marks_csv);
router.use("/course/:course_id/mark/submit", submit_mark);
router.use("/course/:course_id/mark/upload", upload_marks);

// router.use("/", backupAllRouter);
// router.use("/", backupTaskRouter);

module.exports = router;