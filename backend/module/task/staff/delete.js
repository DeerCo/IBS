const express = require("express");
const router = express.Router();
const client = require("../../../setup/db");

router.delete("/", (req, res) => {

  if (res.locals["task"] === "") {
    res.status(400).json({ message: "The task is missing or invalid." });
    return;
  }

  let sql_delete_task = "DELETE FROM course_" + res.locals["course_id"] + ".task WHERE task = ($1)";

  client.query(sql_delete_task, [res.locals["task"]], (err, pg_res) => {
    if (err) {
      res.status(404).json({ message: "Unknown error." });
      console.log(err);
    } else {
      if (pg_res.rowCount === 0) {
        res.status(400).json({ message: "The task is invalid." });
      } else {
        res.status(200).json({ message: "The task is deleted." });
      }
    }
  });
})

module.exports = router;