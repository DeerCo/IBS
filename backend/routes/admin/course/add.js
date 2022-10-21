const express = require("express");
const router = express.Router();
const client = require("../../../setup/db");
const helpers = require("../../../utilities/helpers");

router.post("/add", (req, res) => {
    if (!("course_code" in req.body) || helpers.string_validate(req.body["course_code"])) {
        res.status(400).json({ message: "The course code is missing or has invalid format." });
        return;
    }
    if (!("course_session" in req.body) || helpers.string_validate(req.body["course_session"])) {
        res.status(400).json({ message: "The course session is missing or has invalid format." });
        return;
    }
    
    let sql_add = "INSERT INTO course (course_code, course_session) VALUES (($1), ($2))";
    let sql_add_data = [req.body["course_code"], req.body["course_session"]];

    client.query(sql_add, sql_add_data, (err, pgRes) => {
        if (err) {
            if (err.code === "23505") {
                res.status(409).json({ message: "The course must have unique course code and session." });
            } else {
                res.status(404).json({ message: "Unknown error." });
                console.log(err);
            }
        } else if (pgRes.rowCount === 1) {
            res.status(200).json({ message: "The course is added." });
        }
    });
})

module.exports = router;