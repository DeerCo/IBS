const express = require("express");
const router = express.Router();

const middleware = require("../module/auth/admin/middleware");
const add_course = require("../module/course/admin/add");
const add_role = require("../module/role/admin/add");

router.use("/", function (req, res, next) {
    next();
})

// Middleware
router.use("/", middleware);

// Course
router.use("/course/add", add_course);

// Role
router.use("/role/add", add_role);

module.exports = router;