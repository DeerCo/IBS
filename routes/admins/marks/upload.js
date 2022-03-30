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
    let sql_backup = "SELECT * FROM marks WHERE task = '" + req.body["task"] + "'";

    if ("overwrite" in req.body && req.body["overwrite"].toLowerCase() === "true") {
        sql_upload += "ON CONFLICT (student, task, criteria) DO UPDATE SET mark = EXCLUDED.mark, total = EXCLUDED.total";
    } else {
        sql_upload += "ON CONFLICT (student, task, criteria) DO NOTHING";
    }

    client.query(sql_backup, [], (err, pgRes) => {
        if (err) {
            res.status(404).json({ message: "Unknown error." });
        } else {
            helpers.backup_marks(pgRes.rows);

            const csv_path = req.file.destination + req.file.filename;
            csv({
                noheader: true,
                output: "csv"
            }).fromFile(csv_path).then((csv_row) => {
                let all_criteria = [];
                let total = [];
                let data = [];

                for (let i = 1; i < csv_row[0].length; i++) {
                    all_criteria.push(csv_row[0][i]);
                    total.push(parseFloat(csv_row[1][i]));
                }

                for (let j = 2; j < csv_row.length; j++) {
                    for (let k = 0; k < all_criteria.length; k++) {
                        let mark = parseFloat(csv_row[j][k + 1]);
                        if (isNaN(parseFloat(csv_row[j][k + 1]))) {
                            mark = 0;
                        }

                        data.push([csv_row[j][0], req.body["task"], all_criteria[k], mark, total[k]]);
                    }
                }

                client.query(format(sql_upload, data), [], (err, pgRes) => {
                    if (err) {
                        res.status(404).json({ message: "Unknown error." });
                    } else {
                        let message = pgRes.rowCount + " marks are changed. " + (data.length - pgRes.rowCount) + " marks are unchanged.";
                        res.status(200).json({ message: message });
                    }
                });
            })
        }
    });
})

module.exports = router;