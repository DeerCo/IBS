const express = require("express");
const router = express.Router();

const login = require("../module/auth/login");
const register = require("../module/auth/register");

router.use("/", function (req, res, next) {
    next();
})

router.use("/auth/login", login);
router.use("/auth/register", register);

module.exports = router;