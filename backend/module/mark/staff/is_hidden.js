const express = require("express");
const router = express.Router();
const client = require("../../../setup/db");

router.get("/", (req, res) => {
  if (res.locals["task"] === "") {
    res.status(400).json({ message: "The task is missing or invalid." });
    return;
}

  let sql_hidden = "SELECT hidden FROM course_" + res.locals["course_id"] + ".mark WHERE task = ($1)";

  client.query(sql_hidden, [res.locals["task"]], (err, pgRes) => {
    if (err) {
      res.status(404).json({ message: "Unknown error." });
    } else {
      res.status(200).json(pgRes.rows[0]);
    }
  });
})

module.exports = router;