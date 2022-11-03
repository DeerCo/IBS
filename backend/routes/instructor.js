const express = require("express");
const router = express.Router();
const middleware = require("./instructor/middleware");
const markRouter = require("./instructor/mark");
const taskRouter = require("./instructor/task");

const middleware_task = require("./ta/middleware_task");
const backupAllRouter = require("./ta/backup_all");
const backupTaskRouter = require("./ta/backup_task");

router.use("/", function (req, res, next) {
    next();
})

router.use("/course/", middleware);
router.use("/course/:course_id/mark", markRouter);
router.use("/course/:course_id/task", taskRouter);

router.use("/", backupAllRouter);
router.use("/", backupTaskRouter);

module.exports = router;