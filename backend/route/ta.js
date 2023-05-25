const express = require("express");
const router = express.Router();

const middleware = require("../module/auth/ta/middleware");
const get_role = require("../module/role/staff/get");
const get_token = require("../module/token/staff/get");
const change_token = require("../module/token/staff/change");
const all_tasks = require("../module/task/staff/all");
const get_task = require("../module/task/staff/get");
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
const all_groups = require("../module/group/staff/all");
const check_group = require("../module/group/staff/check");
const create_group = require("../module/group/staff/create");
const copy_groups = require("../module/group/staff/copy");
const add_member = require("../module/group/staff/add");
const remove_member = require("../module/group/staff/remove");
const change_extension = require("../module/group/staff/extension");
const upload_files = require("../module/file/staff/upload");
const download_files = require("../module/file/staff/download");
const delete_files = require("../module/file/staff/delete");
const get_one_mark = require("../module/mark/staff/one");
const get_all_marks = require("../module/mark/staff/all");
const get_all_marks_csv = require("../module/mark/staff/all_csv");
const submit_mark = require("../module/mark/staff/submit");
const upload_marks = require("../module/mark/staff/upload");
const release_marks = require("../module/mark/staff/release");
const hide_marks = require("../module/mark/staff/hide");
const all_interviews = require("../module/interview/staff/all");
const today_interviews = require("../module/interview/staff/today");
const schedule_interview = require("../module/interview/staff/schedule");
const change_interview = require("../module/interview/staff/change");
const delete_interview = require("../module/interview/staff/delete");
const collect_one_submission = require("../module/submission/staff/collect_one");
const collect_all_submissions = require("../module/submission/staff/collect_all");
const manual_collect_submission = require("../module/submission/staff/collect_manual");
const download_submissions = require("../module/submission/staff/download");
const check_submission = require("../module/submission/staff/check");

router.use("/", function(req, res, next) {
    next();
})

// Middleware
router.use("/course/", middleware);

// Role
router.use("/course/:course_id/role/get", get_role);

// Task
router.use("/course/:course_id/task/all", all_tasks);
router.use("/course/:course_id/task/get", get_task);

// Criteria
router.use("/course/:course_id/criteria/all", all_criteria);

// Group
router.use("/course/:course_id/group/all", all_groups);
router.use("/course/:course_id/group/check", check_group);
router.use("/course/:course_id/group/create", create_group);
router.use("/course/:course_id/group/add", add_member);
router.use("/course/:course_id/group/remove", remove_member);
router.use("/course/:course_id/group/extension", change_extension);

// File
router.use("/course/:course_id/file/upload", upload_files);
router.use("/course/:course_id/file/download", download_files);
router.use("/course/:course_id/file/delete", delete_files);

// Mark
router.use("/course/:course_id/mark/one", get_one_mark);
router.use("/course/:course_id/mark/all", get_all_marks);
router.use("/course/:course_id/mark/all_csv", get_all_marks_csv);

// Interview
router.use("/course/:course_id/interview/all", all_interviews);
router.use("/course/:course_id/interview/today", today_interviews);
router.use("/course/:course_id/interview/schedule", schedule_interview);
router.use("/course/:course_id/interview/change", change_interview);
router.use("/course/:course_id/interview/delete", delete_interview);

// Submission
router.use("/course/:course_id/submission/download", download_submissions);
router.use("/course/:course_id/submission/check", check_submission);

module.exports = router;