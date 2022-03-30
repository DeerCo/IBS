const express = require("express");
const router = express.Router();
const client = require("../../../setup/db");
const helpers = require("../../../utilities/helpers");

router.post("/submit", (req, res) => {
    if (!("student" in req.body) || helpers.name_validate(req.body["student"])) {
        res.status(400).json({ message: "The student is missing or has invalid format." });
        return;
    }
    if (!("task" in req.body) || helpers.name_validate(req.body["task"])) {
        res.status(400).json({ message: "The task is missing or has invalid format." });
        return;
    }
    if (!("criteria" in req.body) || helpers.name_validate(req.body["criteria"])) {
        res.status(400).json({ message: "The criteria is missing or has invalid format." });
        return;
    }
    if (!("mark" in req.body) || isNaN(req.body["mark"]) || isNaN(parseFloat(req.body["mark"]))) {
        res.status(400).json({ message: "The mark is missing or has invalid format." });
        return;
    }
    if (!("total" in req.body) || isNaN(req.body["total"]) || isNaN(parseFloat(req.body["total"]))) {
        res.status(400).json({ message: "The total is missing or has invalid format." });
        return;
    }

    if (!("description" in req.body)) {
        var sql_add = "INSERT INTO marks (student, task, criteria, mark, total) VALUES (($1), ($2), ($3), ($4), ($5))";
        var sql_add_data = [req.body["student"], req.body["task"], req.body["criteria"], req.body["mark"], req.body["total"]];
    } else if (!helpers.string_validate(req.body["description"])) {
        res.status(400).json({ message: "The description has invalid format." });
        return;
    } else {
        var sql_add = "INSERT INTO marks (student, task, criteria, mark, total, description) VALUES (($1), ($2), ($3), ($4), ($5), ($6))";
        var sql_add_data = [req.body["student"], req.body["task"], req.body["criteria"], req.body["mark"], req.body["total"], req.body["description"]];
    }

    if ("overwrite" in req.body && req.body["overwrite"].toLowerCase() === "true") {
        sql_add += "ON CONFLICT (student, task, criteria) DO UPDATE SET mark = EXCLUDED.mark, total = EXCLUDED.total";
    } else {
        sql_add += "ON CONFLICT (student, task, criteria) DO NOTHING";
    }

    client.query("SELECT * FROM marks WHERE task = ($1)", [req.body["task"]], (err, pgRes) => {
        if (err) {
            res.status(404).json({ message: "Unknown error." });
        } else {
            helpers.backup_marks(pgRes.rows);
            client.query(sql_add, sql_add_data, (err, pgRes) => {
                if (err) {
                    res.status(404).json({ message: "Unknown error." });
                } else {
                    if (pgRes.rowCount === 0) {
                        res.status(200).json({ message: "The mark is unchanged." });
                    } else if (pgRes.rowCount === 1) {
                        res.status(200).json({ message: "The mark is changed." });
                    } else {
                        res.status(404).json({ message: "Unknown error." });
                    }
                }
            });
        }
    });
})

module.exports = router;