const express = require("express");
const router = express.Router();
const client = require("../../../setup/db");
const helpers = require("../../../utilities/helpers");

router.get("/", (req, res) => {
  if (
    "username" in req.query &&
    !helpers.name_validate(req.query["username"])
  ) {
    var sql_role =
      "SELECT course_role.username, email, role, course_id FROM course_role LEFT JOIN user_info ON course_role.username = user_info.username WHERE course_role.username = ($1)";
    var sql_role_data = [req.query["username"]];
  } else if (
    "course_id" in req.query &&
    !helpers.number_validate(req.query["course_id"])
  ) {
    var sql_role =
      "SELECT course_role.username, email, role, course_id FROM course_role LEFT JOIN user_info ON course_role.username = user_info.username WHERE course_id = ($1)";
    var sql_role_data = [req.query["course_id"]];
  } else {
    res.status(200).json({ count: pg_res.rows.length, role: pg_res.rows });
  }
});

module.exports = router;
