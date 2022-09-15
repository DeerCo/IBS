const express = require("express");
const router = express.Router();
const tokenRouter = require("./auth/token");

router.use("/", tokenRouter);

module.exports = router;