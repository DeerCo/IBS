const express = require("express");
const router = express.Router();
const client = require("../../../setup/db");

router.get("/", (req, res) => {
  if (res.locals["task"] === "") {
    res.status(400).json({ message: "The task is missing or invalid." });
    return;
  }

  let sql_task =
    "SELECT task, to_char(due_date AT TIME ZONE 'America/Toronto', 'YYYY-MM-DD HH24:MI:SS') AS due_date, weight, min_member, max_member, max_token, change_group, hide_interview, interview_group, task_group_id, starter_code_url FROM course_" +
    res.locals["course_id"] +
    ".task WHERE task = ($1)";
  client.query(sql_task, [res.locals["task"]], (err, pg_res) => {
    if (err) {
      res.status(404).json({ message: "Unknown error." });
    } else {
      res
        .status(200)
        .json({ message: "Task details are returned.", task: pg_res.rows[0] });
    }
  });
});

module.exports = router;
