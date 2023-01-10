const express = require("express");
const router = express.Router();
const multer = require('multer');
const csv = require('csvtojson');
const format = require('pg-format');
const path = require('path');
const client = require("../../../setup/db");
const helpers = require("../../../utilities/helpers");
const e = require("express");

const upload = multer({
    dest: './tmp/upload/'
});

router.post("/", upload.single("file"), (req, res) => {
    if (req.file === undefined) {
        res.status(400).json({ message: "The file is missing or has invalid format." });
        return;
    }
    if (path.extname(req.file.originalname) !== ".csv") {
        res.status(200).json({ message: "The file must be a csv file." });
        return;
    }
    if (!("course_id" in req.body) || helpers.number_validate(req.body["course_id"])) {
        res.status(400).json({ message: "The course id is missing or has invalid format." });
        return;
    }

    let sql_register = "INSERT INTO user_info (username, password, email) VALUES %L ON CONFLICT (username) DO NOTHING";
    let sql_upload = "INSERT INTO course_role (username, course_id, role) VALUES %L ON CONFLICT (username, course_id) DO NOTHING; "
        + "INSERT INTO course_" + req.body["course_id"] + ".user (username) VALUES %L ON CONFLICT (username) DO NOTHING";

    const csv_path = req.file.destination + req.file.filename;
    csv({
        noheader: true,
        output: "csv"
    }).fromFile(csv_path).then((csv_row) => {
        let invalid_username = 0;
        let invalid_email = 0;
        let upload_data_all = [];
        let upload_data_users = [];
        let register_data = [["test", "initial", "test@utoronto.ca"]];

        for (let j = 1; j < csv_row.length; j++) {
            if (csv_row[j].length >= 1 && !(helpers.name_validate(csv_row[j][0]))) {
                upload_data_users.push([csv_row[j][0]]);
                upload_data_all.push([csv_row[j][0], req.body["course_id"], "student"]);
                if (csv_row[j].length >= 2 && csv_row[j][1] != "") {
                    if (helpers.email_validate(csv_row[j][1])) {
                        invalid_email += 1;
                    } else {
                        register_data.push([csv_row[j][0], 'initial', csv_row[j][1]]);
                    }
                }
            } else {
                invalid_username += 1;
            }
        }
        if (upload_data_users.length === 0) {
            res.status(200).json({ message: "The file must contain at least 1 valid username." });
        }

        client.query(format(sql_register, register_data), [], (err, pg_res_register) => {
            if (err) {
                res.status(404).json({ message: "Unknown error." });
                console.log(err);
            } else {
                client.query(format(sql_upload, upload_data_all, upload_data_users), [], (err, pg_res_upload) => {
                    if (err) {
                        if (err.code === "23503" && err.constraint === "username") {
                            let username = err.detail.match(/Key \(username\)=\((.*)\) is not present in table "user_info"\./);
                            res.status(400).json({ message: "The username " + username[1] + " is not found in the database and a valid email is not provided." });
                        } else {
                            res.status(404).json({ message: "Unknown error." });
                            console.log(err);
                        }
                    } else {
                        let message = pg_res_upload[0].rowCount + " students are added to the course.";
                        res.status(200).json({ message: message, added: pg_res_upload[0].rowCount, registered: pg_res_register.rowCount, invalid_username: invalid_username, invalid_email: invalid_email });
                    }
                });
            }
        });
    });
})

module.exports = router;