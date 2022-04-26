const express = require("express");
const router = express.Router();
const client = require("../../../setup/db");
const helpers = require("../../../utilities/helpers");

router.get("/all", (req, res) => {
    if (!("task" in req.query) || helpers.name_validate(req.query["task"])) {
        client.query("SELECT task, student, SUM(mark) as marks_sum, SUM(total) as totals_sum FROM marks GROUP BY task, student ORDER BY student", [], (err, pgRes) => {
            if (err) {
                res.status(404).json({ message: "Unknown error." });
            } else {
                helpers.send_final_marks_csv(pgRes.rows, res);
            }
        });
    } else {
        let total = false;
        if ("total" in req.query && req.query["total"].toLowerCase() === "true") {
            total = true;
        }

        client.query("SELECT * FROM marks WHERE task = ($1) ORDER BY student, mark DESC", [req.query["task"]], (err, pgRes) => {
            if (err) {
                res.status(404).json({ message: "Unknown error." });
            } else {
                helpers.send_marks_csv(pgRes.rows, res, req.query["task"], total);
            }
        });
    }
})

module.exports = router;