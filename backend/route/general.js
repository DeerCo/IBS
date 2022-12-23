const express = require("express");
const router = express.Router();

const login = require("../module/auth/login");
const register = require("../module/auth/register");
const verify = require("../module/auth/verify");
const change_password = require("../module/auth/change_password");

router.use("/", function (req, res, next) {
    next();
})

router.use("/auth/login", login);
router.use("/auth/register", register);
router.use("/auth/verify", verify);
router.use("/auth/change_password", change_password);

module.exports = router;