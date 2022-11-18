const express = require("express");
const router = express.Router();

const middleware = require("../module/auth/admin/middleware");
const add_course = require("../module/course/admin/add");
const get_role = require("../module/role/admin/get");
const add_role = require("../module/role/admin/add");
const delete_role = require("../module/role/admin/delete");

router.use("/", function (req, res, next) {
    next();
})

// Middleware
router.use("/", middleware);

// Course
router.use("/course/add", add_course);

// Role
router.use("/role/get", get_role);
router.use("/role/add", add_role);
router.use("/role/delete", delete_role);

module.exports = router;