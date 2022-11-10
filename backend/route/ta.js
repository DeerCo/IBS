const express = require("express");
const router = express.Router();
const login = require("../module/ta/login");
const middleware = require("../module/ta/middleware");
const middleware_task = require("../module/ta/middleware_task");
const changePasswordRouter = require("../module/ta/change_password");
const getDdahRouter = require("../module/ta/get_ddah");
const backupAllRouter = require("../module/ta/backup_all");
const backupTaskRouter = require("../module/ta/backup_task");
const allRouter = require("../module/ta/all");
const todayRouter = require("../module/ta/today");
const scheduleRouter = require("../module/ta/schedule");
const changeRouter = require("../module/ta/change");
const deleteRouter = require("../module/ta/delete");
const groupInformationRouter = require("../module/ta/group_information");

router.use(express.static("./public/ta"));
router.get("/ui", (req, res) => {
    res.sendFile("index.html", { root: "./public/ta" });
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