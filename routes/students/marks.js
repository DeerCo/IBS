const express = require("express");
const router = express.Router();
const middlewareIndividualRouter = require("./auth/middleware_individual");
const allRouter = require("./marks/all");

router.use("/", middlewareIndividualRouter);
router.use("/", allRouter);

module.exports = router;