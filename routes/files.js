const express = require("express");
const router = express.Router();
const tokenRouter = require("./auth/token");
const middlewareRouter = require("./auth/middleware");
const resultRouter = require("./files/result");

router.use("/", tokenRouter); // Generate a token based on group and task
router.use("/", middlewareRouter); // Verify if the token and task is valid
router.use("/", resultRouter);

module.exports = router;