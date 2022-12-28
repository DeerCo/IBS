const express = require("express");
const router = express.Router();

const middleware = require("../module/auth/instructor/middleware");
const get_token = require("../module/token/staff/get");
const change_token = require("../module/token/staff/change");
const all_tasks = require("../module/task/staff/all");
const add_task = require("../module/task/staff/add");
const change_task = require("../module/task/staff/change");
const all_task_group = require("../module/task_group/staff/all");
const add_task_group = require("../module/task_group/staff/add");
const change_task_group = require("../module/task_group/staff/change");
const delete_task_group = require("../module/task_group/staff/delete");
const all_criteria = require("../module/criteria/staff/all");
const add_criteria = require("../module/criteria/staff/add");
const change_criteria = require("../module/criteria/staff/change");
const delete_criteria = require("../module/criteria/staff/delete");
const upload_files = require("../module/file/staff/upload");
const download_files = require("../module/file/staff/download");
const delete_files = require("../module/file/staff/delete");
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
const collect_submission = require("../module/submission/staff/collect");

router.use("/", function (req, res, next) {
    next();
})

// Middleware
router.use("/course/", middleware);

// Task Group
router.use("/course/:course_id/token/get", get_token);
router.use("/course/:course_id/token/change", change_token);

// Task Group
router.use("/course/:course_id/task_group/all", all_task_group);
router.use("/course/:course_id/task_group/add", add_task_group);
router.use("/course/:course_id/task_group/change", change_task_group);
router.use("/course/:course_id/task_group/delete", delete_task_group);

// Task
router.use("/course/:course_id/task/all", all_tasks);
router.use("/course/:course_id/task/add", add_task);
router.use("/course/:course_id/task/change", change_task);

// Criteria
router.use("/course/:course_id/criteria/all", all_criteria);
router.use("/course/:course_id/criteria/add", add_criteria);
router.use("/course/:course_id/criteria/change", change_criteria);
router.use("/course/:course_id/criteria/delete", delete_criteria);

// File
router.use("/course/:course_id/file/upload", upload_files);
router.use("/course/:course_id/file/download", download_files);
router.use("/course/:course_id/file/delete", delete_files);

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

// Submission
router.use("/course/:course_id/submission/collect", collect_submission);

module.exports = router;