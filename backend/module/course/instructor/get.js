const express = require("express");
const router = express.Router();
const client = require("../../../setup/db");
const helpers = require("../../../utilities/helpers");

router.get("/", (req, res) => {
  console.log(`[+] RESPONSE Locals: ${res.locals["course_id"]}`);
  if (res.locals["course_id"] === "") {
    res.status(400).json({ message: "The course id is missing or invalid." });
  }
  let sqlCourse = "SELECT * FROM course WHERE course_id = ($1)";
  client.query(sqlCourse, [res.locals["course_id"]], (err, pgRes) => {
    if (err) {
      res.status(404).json({ message: "Unknown error." });
    } else if (pgRes.rowCount === 1) {
      res
        .status(200)
        .json({
          message: "Course details are returned.",
          course: pgRes.rows[0],
        });
    } else {
      res.status(400).json({ message: "The course id is invalid." });
    }
  });
});

module.exports = router;
