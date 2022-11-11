const express = require("express");
const router = express.Router();
const all_interviews = require("../module/interview/staff/all");
const today_interviews = require("../module/interview/staff/today");
const schedule_interview = require("../module/interview/staff/schedule");
const change_interview = require("../module/interview/staff/change");
const delete_interview = require("../module/interview/staff/delete");

router.use("/", all_interviews);
router.use("/", today_interviews);
router.use("/", schedule_interview);
router.use("/", change_interview);
router.use("/", delete_interview);


module.exports = router;