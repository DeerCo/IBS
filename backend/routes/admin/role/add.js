const express = require("express");
const router = express.Router();
const client = require("../../../setup/db");
const helpers = require("../../../utilities/helpers");

router.post("/add", (req, res) => {
    if (!("course_id" in req.body) || helpers.number_validate(req.body["course_id"])) {
        res.status(400).json({ message: "The course id is missing or has invalid format." });
        return;
    }

    let roles = ["admin", "instructor", "ta", "student"];
    if (!("role" in req.body) || !roles.includes(req.body["role"])) {
        res.status(400).json({ message: "The role is missing or invalid." });
        return;
    }
    
    var sql_select = "SELECT * FROM course_role WHERE username = ($1) AND course_id = ($2)";
    var sql_add = "INSERT INTO course_role (username, course_id, role) VALUES (($1), ($2), ($3))";

    client.query(sql_select, [res.locals["admin"], req.body["course_id"]], (err, pgRes) => {
        if (err) {
            res.status(404).json({ message: "Unknown error." });
            console.log(err);
        } else if (pgRes.rowCount !== 0) {
            res.status(409).json({ message: "Only one role can be added for the same user and course." });
        } else {
            client.query(sql_add, [res.locals["admin"], req.body["course_id"], req.body["role"]], (err, pgRes) => {
                if (err) {
                    res.status(404).json({ message: "Unknown error." });
                    console.log(err);
                } else if (pgRes.rowCount === 1) {
                    res.status(200).json({ message: "The role is created." });
                }
            });
        }
    });
})

module.exports = router;