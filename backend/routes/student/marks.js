const express = require("express");
const router = express.Router();
const middlewareRouter = require("./middleware");
const rawRouter = require("./marks/raw");

router.use("/", middlewareRouter);
router.use("/", rawRouter);

module.exports = router;