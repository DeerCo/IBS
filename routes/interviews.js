const express = require("express");
const router = express.Router();
const tokenRouter = require("./interviews/token");
const middleware = require("./interviews/middleware");
const allRouter = require("./interviews/all");
const availableRouter = require("./interviews/available");
const checkRouter = require("./interviews/check");
const bookRouter = require("./interviews/book");
const changeRouter = require("./interviews/change");
const cancelRouter = require("./interviews/cancel");

router.use("/", tokenRouter); // Generate a token based on group and task
router.use("/", middleware); // Verify if the token and task is valid
router.use("/", allRouter);
router.use("/", availableRouter);
router.use("/", checkRouter);
router.use("/", bookRouter);
router.use("/", changeRouter);
router.use("/", cancelRouter);

module.exports = router;