const express = require("express");
const router = express.Router();
const login = require("./ta/login");
const middleware = require("./ta/middleware");
const middleware_task = require("./ta/middleware_task");
const changePasswordRouter = require("./ta/change_password");
const getDdahRouter = require("./ta/get_ddah");
const backupAllRouter = require("./ta/backup_all");
const backupTaskRouter = require("./ta/backup_task");
const allRouter = require("./ta/all");
const todayRouter = require("./ta/today");
const scheduleRouter = require("./ta/schedule");
const changeRouter = require("./ta/change");
const deleteRouter = require("./ta/delete");
const groupInformationRouter = require("./ta/group_information");

router.use(express.static("./public"));
router.get("/ui", (req, res) => {
    res.sendFile("index.html", { root: "./public/" });
});

router.use("/", login);
router.use("/", middleware);
router.use("/", changePasswordRouter);
router.use("/", getDdahRouter);
// router.use("/", backupAllRouter);
router.use("/", middleware_task);
// router.use("/", backupTaskRouter);
router.use("/", allRouter);
router.use("/", todayRouter);
router.use("/", scheduleRouter);
router.use("/", changeRouter);
router.use("/", deleteRouter);
router.use("/", groupInformationRouter);

module.exports = router;