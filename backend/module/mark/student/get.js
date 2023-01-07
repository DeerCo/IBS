const express = require("express");
const router = express.Router();
const client = require("../../../setup/db");
const helpers = require("../../../utilities/helpers");

router.get("/", (req, res) => {
    if (res.locals["task"] === "") {
        let sql_mark = "SELECT username, task, SUM(mark) AS sum FROM course_" + res.locals["course_id"] + ".mark WHERE username = ($1) AND hidden = false GROUP BY (username, task)";
        client.query(sql_mark, [res.locals["username"]], (err, pgRes) => {
            if (err) {
                res.status(404).json({ message: "Unknown error." });
            } else {
                helpers.format_marks_all_tasks(pgRes.rows, res.locals["course_id"]).then(marks => {
                    res.json({ marks: marks });
                });
            }
        });
    } else {
        let sql_mark = "SELECT * FROM course_" + res.locals["course_id"] + ".mark WHERE username = ($1) AND task = ($2) AND hidden = false ORDER BY criteria_id";
        client.query(sql_mark, [res.locals["username"], res.locals["task"]], (err, pgRes) => {
            if (err) {
                res.status(404).json({ message: "Unknown error." });
            } else {
                helpers.format_marks_one_task(pgRes.rows, res.locals["course_id"], res.locals["task"]).then(marks => {
                    res.json({ marks: marks });
                });
            }
        });
    }
})

module.exports = router;