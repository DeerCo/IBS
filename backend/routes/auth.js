const express = require("express");
const router = express.Router();
const loginRouter = require("./auth/login");
const registerRouter = require("./auth/register");

// to disable login and register functionality 
// if return, then can't route to login and register
router.use("/", function (req, res, next) {
    next();
})

router.use("/", loginRouter);
router.use("/", registerRouter);

module.exports = router;