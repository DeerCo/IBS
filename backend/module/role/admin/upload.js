const express = require("express");
const router = express.Router();
const multer = require('multer');
const csv = require('csvtojson');
const format = require('pg-format');
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
    if (!("course_id" in req.body) || helpers.number_validate(req.body["course_id"])) {
        res.status(400).json({ message: "The course id is missing or has invalid format." });
        return;
    }

    let sql_upload = "INSERT INTO course_role (username, course_id, role) VALUES %L ON CONFLICT (username, course_id) DO NOTHING";

    const csv_path = req.file.destination + req.file.filename;
    csv({
        noheader: true,
        output: "csv"
    }).fromFile(csv_path).then((csv_row) => {
        let students = [];
        for (let j = 1; j < csv_row.length; j++) {
            students.push([csv_row[j][0], req.body["course_id"], "student"]);
        }
    
        client.query(format(sql_upload, students), [], (err, pgRes) => {
            if (err) {
                if (err.code === "23503" && err.constraint === "username") {
                    let username = err.detail.match(/Key \(username\)=\((.*)\) is not present in table "user_info"\./);
                    res.status(400).json({ message: "The username " + username[1] + " is not found in the database." });
                } else {
                    res.status(404).json({ message: "Unknown error." });
                    console.log(err);
                }
            } else{
                res.status(200).json({ message: "All students are added." });
            }
        });
    });
})

module.exports = router;