const express = require("express");
const router = express.Router();
const client = require("../../../setup/db");
const helpers = require("../../../utilities/helpers");

router.get("/", (req, res) => {
  let sql_role = "";
  let sql_role_data = "";
  if (
    "username" in req.query &&
    !helpers.name_validate(req.query["username"])
  ) {
    sql_role =
      "SELECT course_role.username, email, role, course_id FROM course_role LEFT JOIN user_info ON course_role.username = user_info.username WHERE course_role.username = ($1)";
    sql_role_data = [req.query["username"]];
  } else if (
    "course_id" in req.query &&
    !helpers.number_validate(req.query["course_id"])
  ) {
    sql_role =
      "SELECT course_role.username, email, role, course_id FROM course_role LEFT JOIN user_info ON course_role.username = user_info.username WHERE course_id = ($1)";
    sql_role_data = [req.query["course_id"]];
  }
  client.query(sql_role, sql_role_data, (err, pg_res) => {
    if (err) {
      res.status(404).json({ message: "Unknown error." });
    } else {
      res.status(200).json({ count: pg_res.rows.length, role: pg_res.rows });
    }
  });
});

module.exports = router;
