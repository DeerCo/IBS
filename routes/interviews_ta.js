const express = require("express");
const router = express.Router();
const middleware = require("./interviews_ta/middleware");
const allRouter = require("./interviews_ta/all");
const todayRouter = require("./interviews_ta/today");
const scheduleRouter = require("./interviews_ta/schedule");
const changeRouter = require("./interviews_ta/change");
const deleteRouter = require("./interviews_ta/delete");

router.use("/", middleware); // Verify if the token and task is valid
router.use("/", allRouter);
router.use("/", todayRouter);
router.use("/", scheduleRouter);
router.use("/", changeRouter);
router.use("/", deleteRouter);

module.exports = router;