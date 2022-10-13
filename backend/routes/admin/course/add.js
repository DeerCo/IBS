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
    
    var sql_select = "SELECT * FROM course WHERE course_code = ($1) AND course_session = ($2)";
    var sql_add = "INSERT INTO course (course_code, course_session) VALUES (($1), ($2))";

    client.query(sql_select, [req.body["course_code"], req.body["course_session"]], (err, pgRes) => {
        if (err) {
            res.status(404).json({ message: "Unknown error." });
        } else if (pgRes.rowCount !== 0) {
            res.status(409).json({ message: "The course must have unique course code and session." });
        } else {
            client.query(sql_add, [req.body["course_code"], req.body["course_session"]], (err, pgRes) => {
                if (err) {
                    res.status(404).json({ message: "Unknown error." });
                } else if (pgRes.rowCount === 1) {
                    res.status(200).json({ message: "The course is created." });
                }
            });
        }
    });
})

module.exports = router;