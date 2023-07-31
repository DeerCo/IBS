const express = require("express");
const router = express.Router();
const client = require("../../../setup/db");
const helpers = require("../../../utilities/helpers");

router.get("/", (req, res) => {
    if (req.query["total"] === true || req.query["total"] === "true") {
        var total = true;
    } else {
        var total = false;
    }

    if (res.locals["task"] === "") {
        client.query("SELECT username, task, SUM(mark) AS sum FROM course_" + res.locals["course_id"] + ".mark GROUP BY username, task ORDER BY username", [], (err, pgRes) => {
            if (err) {
                res.status(404).json({ message: "Unknown error." });
            } else {
                helpers.format_marks_all_tasks_csv(pgRes.rows, res.locals["course_id"], res, total);
            }
        });
    } else{
        client.query("SELECT * FROM course_" + res.locals["course_id"] + ".mark WHERE task = ($1) ORDER BY username", [res.locals["task"]], (err, pgRes) => {
            if (err) {
                res.status(404).json({ message: "Unknown error." });
            } else {
                helpers.format_marks_one_task_csv(pgRes.rows, res.locals["course_id"], res.locals["task"], res, total);
            }
        });
    }
})

module.exports = router;