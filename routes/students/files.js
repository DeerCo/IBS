const express = require("express");
const router = express.Router();
const middlewareRouter = require("./auth/middleware");
const allRouter = require("./files/all");
const fileRouter = require("./files/file");

router.use("/", middlewareRouter); // Verify if the token and task is valid
router.use("/", allRouter);
router.use("/", fileRouter);

module.exports = router;