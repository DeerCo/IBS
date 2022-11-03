const express = require("express");
const router = express.Router();
const loginRouter = require("./auth/login");
const registerRouter = require("./auth/register");

router.use("/", function (req, res, next) {
    next();
})

router.use("/", loginRouter);
router.use("/", registerRouter);

module.exports = router;