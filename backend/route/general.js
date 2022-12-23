const express = require("express");
const router = express.Router();

const login = require("../module/auth/general/login");
const register = require("../module/auth/general/register");
const verify = require("../module/auth/general/verify");
const change_password = require("../module/auth/general/change_password");

router.use("/", function (req, res, next) {
    next();
})

router.use("/auth/login", login);
router.use("/auth/register", register);
router.use("/auth/verify", verify);
router.use("/auth/change_password", change_password);

module.exports = router;