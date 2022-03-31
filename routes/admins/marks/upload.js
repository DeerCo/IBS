const express = require("express");
const router = express.Router();
const csv = require('csvtojson');
const format = require('pg-format');
const client = require("../../../setup/db");
const helpers = require("../../../utilities/helpers");

router.post("/upload", (req, res) => {
    if (req.file === undefined) {
        res.status(400).json({ message: "The file is missing or has invalid format." });
        return;
    }
    if (!("task" in req.body) || helpers.name_validate(req.body["task"])) {
        res.status(400).json({ message: "The task is missing or has invalid format." });
        return;
    }

    let sql_upload = "INSERT INTO marks (student, task, criteria, mark, total) VALUES %L";

    if ("overwrite" in req.body && req.body["overwrite"].toLowerCase() === "true") {
        sql_upload += " ON CONFLICT (student, task, criteria) DO UPDATE SET mark = EXCLUDED.mark, total = EXCLUDED.total";
    } else {
        sql_upload += " ON CONFLICT (student, task, criteria) DO NOTHING";
    }

    client.query("SELECT * FROM marks WHERE task = ($1)", [req.body["task"]], (err, pgRes) => {
        if (err) {
            res.status(404).json({ message: "Unknown error." });
            return;
        }
        helpers.backup_marks(pgRes.rows);

        const csv_path = req.file.destination + req.file.filename;
        csv({
            noheader: true,
            output: "csv"
        }).fromFile(csv_path).then((csv_row) => {
            let all_criteria = [];
            let total = [];
            let marks_data = [];
            let skipped_count = 0;
            let skipped_user_names = [];

            for (let i = 1; i < csv_row[0].length; i++) {
                all_criteria.push(csv_row[0][i]);

                if (isNaN(parseFloat(csv_row[1][i]))) {
                    total.push(0);
                } else {
                    total.push(parseFloat(csv_row[1][i]));
                }
            }

            helpers.get_all_user_names().then(data => {
                if (!data["status"]) {
                    res.status(404).json({ message: "Unknown error." });
                    return;
                }

                for (let j = 2; j < csv_row.length; j++) {
                    if (data["user_names"].includes(csv_row[j][0])) {
                        for (let k = 0; k < all_criteria.length; k++) {
                            let mark = parseFloat(csv_row[j][k + 1]);
                            if (isNaN(parseFloat(csv_row[j][k + 1]))) {
                                mark = 0;
                            }

                            marks_data.push([csv_row[j][0], req.body["task"], all_criteria[k], mark, total[k]]);
                        }
                    } else {
                        skipped_count += 1;
                        skipped_user_names.push(csv_row[j][0]);
                    }
                }

                if (marks_data.length === 0) {
                    res.status(406).json({ message: "All user names are invalid." });
                }

                client.query(format(sql_upload, marks_data), [], (err, pgRes) => {
                    if (err) {
                        res.status(404).json({ message: "Unknown error." });
                    } else if (skipped_count === 0) {
                        let message = pgRes.rowCount + " marks are changed. " + (marks_data.length - pgRes.rowCount) + " marks are unchanged.";
                        res.status(200).json({ message: message });
                    } else {
                        let message = pgRes.rowCount + " marks are changed. " + (marks_data.length - pgRes.rowCount) + " marks are unchanged. " + skipped_count + " user names are invalid.";
                        res.status(200).json({ message: message, skipped_user_names: skipped_user_names });
                    }
                });
            });
        });
    });
})

module.exports = router;