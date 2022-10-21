const express = require("express");
const router = express.Router();
const loginRouter = require("./auth/login");
const registerRouter = require("./auth/register");

// to disable login and register functionality 
// if return, then can't route to login and register
router.use("/", function (req, res, next) {
    next();
})

router.use("/login", loginRouter);
router.use("/register", registerRouter);

module.exports = router;