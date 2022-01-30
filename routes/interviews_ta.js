const express = require("express");
const router = express.Router();
const middleware = require("./interviews_ta/middleware");
const middleware_task = require("./interviews_ta/middleware_task");
const backupAllRouter = require("./interviews_ta/backup_all");
const backupTaskRouter = require("./interviews_ta/backup_task");
const allRouter = require("./interviews_ta/all");
const todayRouter = require("./interviews_ta/today");
const scheduleRouter = require("./interviews_ta/schedule");
const changeRouter = require("./interviews_ta/change");
const deleteRouter = require("./interviews_ta/delete");

router.use(express.static("./public"));
router.get("/ui", (req, res) => {
	res.sendFile("index.html", { root: "./public/" });
});

router.use("/", middleware);
router.use("/", backupAllRouter);
router.use("/", middleware_task);
router.use("/", backupTaskRouter);
router.use("/", allRouter);
router.use("/", todayRouter);
router.use("/", scheduleRouter);
router.use("/", changeRouter);
router.use("/", deleteRouter);

module.exports = router;