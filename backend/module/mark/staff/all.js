const express = require("express");
const router = express.Router();
const client = require("../../../setup/db");
const helpers = require("../../../utilities/helpers");

router.get("/", (req, res) => {
    if (!("task" in req.query) || helpers.string_validate(req.query["task"])) {
        let sql_mark = "SELECT username, task, SUM(mark) AS sum FROM course_" + res.locals["course_id"] + ".mark GROUP BY (username, task)";
        client.query(sql_mark, [], (err, pgRes) => {
            if (err) {
                res.status(404).json({ message: "Unknown error." });
            } else {
                helpers.format_marks_all_tasks(pgRes.rows, res.locals["course_id"]).then(marks => {
                    res.json({ marks: marks });
                });
            }
        });
    } else {
        let sql_mark = "SELECT * FROM course_" + res.locals["course_id"] + ".mark WHERE task = ($1) ORDER BY criteria_id";
        client.query(sql_mark, [req.query["task"]], (err, pgRes) => {
            if (err) {
                console.log(err)
                res.status(404).json({ message: "Unknown error." });
            } else {
                helpers.format_marks_one_task(pgRes.rows, res.locals["course_id"], req.query["task"]).then(marks => {
                    res.json({ marks: marks });
                });
            }
        });
    }
})

module.exports = router;