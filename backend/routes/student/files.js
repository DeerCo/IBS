const express = require("express");
const router = express.Router();
const middlewareGroupRouter = require("./middleware_group");
const allRouter = require("./files/all");
const fileRouter = require("./files/file");

router.use("/", middlewareGroupRouter);
router.use("/", allRouter);
router.use("/", fileRouter);

module.exports = router;