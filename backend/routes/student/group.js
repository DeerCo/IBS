const express = require("express");
const router = express.Router();
const checkRouter = require("./group/check");
const createRouter = require("./group/create");
const leaveRouter = require("./group/leave");
const inviteRouter = require("./group/invite");
const disinviteRouter = require("./group/disinvite");
const acceptRouter = require("./group/accept");
const rejectRouter = require("./group/reject");

router.use("/", checkRouter);
router.use("/", createRouter);
router.use("/", leaveRouter);
router.use("/", inviteRouter);
router.use("/", disinviteRouter);
router.use("/", acceptRouter);
router.use("/", rejectRouter);

module.exports = router;