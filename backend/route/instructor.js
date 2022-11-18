const express = require("express");
const router = express.Router();

const middleware = require("../module/auth/instructor/middleware");
const all_criteria = require("../module/task/staff/all");
const all_tasks = require("../module/task/staff/all");
const add_task = require("../module/task/staff/add");
const add_criteria = require("../module/criteria/staff/add");
const upload_files = require("../module/file/staff/upload");
const get_one_mark = require("../module/mark/staff/one");
const get_all_marks = require("../module/mark/staff/all");
const get_all_marks_csv = require("../module/mark/staff/all_csv");
const submit_mark = require("../module/mark/staff/submit");
const upload_marks = require("../module/mark/staff/upload");
const all_interviews = require("../module/interview/staff/all");
const today_interviews = require("../module/interview/staff/today");
const schedule_interview = require("../module/interview/staff/schedule");
const change_interview = require("../module/interview/staff/change");
const delete_interview = require("../module/interview/staff/delete");

router.use("/", function (req, res, next) {
    next();
})

// Middleware
router.use("/course/", middleware);

// Task
router.use("/course/:course_id/task/all", all_tasks);
router.use("/course/:course_id/task/add", add_task);

// Criteria
router.use("/course/:course_id/criteria/all", all_criteria);
router.use("/course/:course_id/criteria/add", add_criteria);

// File
router.use("/course/:course_id/file/upload", upload_files);

// Mark
router.use("/course/:course_id/mark/one", get_one_mark);
router.use("/course/:course_id/mark/all", get_all_marks);
router.use("/course/:course_id/mark/all_csv", get_all_marks_csv);
router.use("/course/:course_id/mark/submit", submit_mark);
router.use("/course/:course_id/mark/upload", upload_marks);

// Interview
router.use("/course/:course_id/interview/all", all_interviews);
router.use("/course/:course_id/interview/today", today_interviews);
router.use("/course/:course_id/interview/schedule", schedule_interview);
router.use("/course/:course_id/interview/change", change_interview);
router.use("/course/:course_id/interview/delete", delete_interview);

module.exports = router;