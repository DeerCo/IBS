const express = require("express");
const router = express.Router();
const middlewareIndividualRouter = require("./auth/middleware_individual");
const createRouter = require("./group/create");
const inviteRouter = require("./group/invite");
const acceptRouter = require("./group/accept");
const rejectRouter = require("./group/reject");

router.use("/", middlewareIndividualRouter);
router.use("/", createRouter);
router.use("/", inviteRouter);
router.use("/", acceptRouter);
router.use("/", rejectRouter);

module.exports = router;