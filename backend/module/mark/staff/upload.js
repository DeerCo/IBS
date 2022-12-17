const express = require("express");
const router = express.Router();
const multer = require('multer');
const csv = require('csvtojson');
const format = require('pg-format');
const path = require('path');
const client = require("../../../setup/db");
const helpers = require("../../../utilities/helpers");

const upload = multer({
    dest: './tmp/upload/'
});

router.post("/", upload.single("file"), (req, res) => {
    if (req.file === undefined) {
        res.status(400).json({ message: "The file is missing or has invalid format." });
        return;
    }
    if (path.extname(req.file.originalname) !== ".csv"){
		res.status(200).json({ message: "The file must be a csv file." });
		return;
	}
    if (!("task" in req.body) || helpers.name_validate(req.body["task"])) {
        res.status(400).json({ message: "The task is missing or has invalid format." });
        return;
    }

    let sql_upload = "INSERT INTO course_" + res.locals["course_id"] + ".mark (criteria_id, username, mark, task) VALUES %L";
    if ("overwrite" in req.body && req.body["overwrite"].toLowerCase() === "true") {
        sql_upload += " ON CONFLICT (criteria_id, username) DO UPDATE SET mark = EXCLUDED.mark";
    } else {
        sql_upload += " ON CONFLICT (criteria_id, username) DO NOTHING";
    }

    const csv_path = req.file.destination + req.file.filename;
    csv({
        noheader: true,
        output: "csv"
    }).fromFile(csv_path).then((csv_row) => {
        let all_criteria = [];
        let marks_data = [];

        helpers.get_criteria(res.locals["course_id"], req.body["task"]).then(db_all_criteria => {
            if (csv_row[0].length <= 1){
                res.status(400).json({ message: "At least one criteria is required." });
                return;
            }
            for (let i = 1; i < csv_row[0].length; i++) {
                let found = false;
                for (let temp_criteria in db_all_criteria){
                    if (db_all_criteria[temp_criteria]["criteria"] === csv_row[0][i]){
                        all_criteria.push(temp_criteria);
                        found = true;
                    }
                }
                if (!found){
                    res.status(400).json({ message: "Criteria " + csv_row[0][i]+ " is not found in the database." });
                    return;
                }
            }
    
            for (let j = 2; j < csv_row.length; j++) {
                for (let k = 0; k < all_criteria.length; k++) {
                    let mark = parseFloat(csv_row[j][k + 1]);
                    if (isNaN(parseFloat(csv_row[j][k + 1]))) {
                        mark = 0;
                    }

                    marks_data.push([all_criteria[k], csv_row[j][0], mark, req.body["task"]]);
                }
            }
            if (marks_data.length === 0){
                res.status(200).json({ message: "The file must contain at least 1 mark." });
                return;
            }
    
            client.query(format(sql_upload, marks_data), [], (err, pgRes) => {
                if (err) {
                    if (err.code === "23503" && err.constraint === "username") {
                        let username = err.detail.match(/Key \(username\)=\((.*)\) is not present in table "user_info"\./);
                        res.status(400).json({ message: "The username " + username[1] + " is not found in the database." });
                    } else if (err.code === "21000") {
                        res.status(400).json({ message: "Rows must have unique username." });
                    } else {
                        res.status(404).json({ message: "Unknown error." });
                        console.log(err);
                    }
                } else{
                    let message = pgRes.rowCount + " marks are changed. " + (marks_data.length - pgRes.rowCount) + " marks are unchanged.";
                    res.status(200).json({ message: message });
                }
            });
        });
    });
})

module.exports = router;