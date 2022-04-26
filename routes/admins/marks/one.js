const express = require("express");
const router = express.Router();
const client = require("../../../setup/db");
const helpers = require("../../../utilities/helpers");
const constants = require("../../../setup/constants");

router.get("/one", (req, res) => {
    if (!("student" in req.query) || helpers.name_validate(req.query["student"])) {
        res.status(400).json({ message: "The student is missing or has invalid format." });
        return;
    }
    client.query("SELECT task, criteria, mark, total, description FROM marks WHERE student = ($1)", [req.query["student"]], (err, pgRes) => {
        if (err) {
            res.status(404).json({ message: "Unknown error." });
        } else {
            let marks = { summary: {} };

            for (let row of pgRes.rows) {
                let temp_mark = parseFloat(row["mark"]);
                let temp_total = parseFloat(row["total"]);

                if (row["description"]) {
                    var temp_data = { criteria: row["criteria"], mark: temp_mark, out_of: temp_total, description: row["description"] };
                } else {
                    var temp_data = { criteria: row["criteria"], mark: temp_mark, out_of: temp_total };
                }

                if (row["task"] in marks) {
                    marks[row["task"]].push(temp_data);
                    marks["summary"][row["task"]]["total"] += temp_mark;
                    marks["summary"][row["task"]]["out_of"] += temp_total;
                } else {
                    marks[row["task"]] = [temp_data];
                    marks["summary"][row["task"]] = { total: temp_mark, out_of: temp_total };
                }
            }

            let final_mark = 0;
            for (let task in marks["summary"]) {
                if (task in constants["max"] && marks["summary"][task]["total"] > constants["max"][task]) {
                    marks["summary"][task]["total"] = constants["max"][task];
                }
                if (marks["summary"][task]["out_of"] != 0) {
                    let weighted_mark = marks["summary"][task]["total"] / marks["summary"][task]["out_of"] * constants["weights"][task];
                    final_mark += weighted_mark;
                }
            }
            marks["summary"]["final"] = { total: final_mark, out_of: 100 };

            res.json({ marks: marks });
        }
    });
})

module.exports = router;