const express = require("express");
const router = express.Router();
const middlewareRouter = require("./auth/middleware");
const resultRouter = require("./files/result");

router.use("/", middlewareRouter); // Verify if the token and task is valid
router.use("/", resultRouter);

module.exports = router;