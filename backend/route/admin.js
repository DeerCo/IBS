const express = require("express");
const router = express.Router();

const middleware = require("../module/auth/admin/middleware");
const all_course = require("../module/course/admin/all");
const get_course = require("../module/course/admin/get");
const add_course = require("../module/course/admin/add");
const change_course = require("../module/course/admin/change");
const get_user = require("../module/user/admin/get");
const change_user = require("../module/user/admin/change");
const get_role = require("../module/role/admin/get");
const add_role = require("../module/role/admin/add");
const upload_role = require("../module/role/admin/upload");
const delete_role = require("../module/role/admin/delete");
const get_all_marks = require("../module/mark/staff/all");
const impersonate = require("../module/impersonate/admin/impersonate");

router.use("/", function (req, res, next) {
  next();
});

// Middleware
router.use("/", middleware);

// Course
router.use("/course/all", all_course);
router.use("/course/get", get_course);
router.use("/course/add", add_course);
router.use("/course/change", change_course);

// User
router.use("/user/get", get_user);
router.use("/user/change", change_user);

// Role
router.use("/role/get", get_role);
router.use("/role/add", add_role);
router.use("/role/upload", upload_role);
router.use("/role/delete", delete_role);

// Mark
router.use("/course/:course_id/mark/all", get_all_marks);

// impersonate
router.use("/impersonate", impersonate);

module.exports = router;
