const express = require("express");
const router = express.Router();
const client = require("../../../setup/db");
const helpers = require("../../../utilities/helpers");

router.post("/", (req, res) => {
    if (!("course_id" in req.body) || helpers.number_validate(req.body["course_id"])) {
        res.status(400).json({ message: "The course id is missing or has invalid format." });
        return;
    }
    if (!("username" in req.body) || helpers.name_validate(req.body["username"])) {
        res.status(400).json({ message: "The username is missing or has invalid format." });
        return;
    }

    let roles = ["admin", "instructor", "ta", "student"];
    if (!("role" in req.body) || !roles.includes(req.body["role"])) {
        res.status(400).json({ message: "The role is missing or invalid." });
        return;
    }
    
    let sql_add = "INSERT INTO course_role (username, course_id, role) VALUES (($1), ($2), ($3))";
    let sql_add_data = [req.body["username"], req.body["course_id"], req.body["role"]];

    client.query(sql_add, sql_add_data, (err, pgRes) => {
        if (err) {
            if (err.code === "23503" && err.constraint === "username") {
                res.status(400).json({ message: "The username is not found in the database." });
            } else if (err.code === "23503" && err.constraint === "course_id") {
                res.status(400).json({ message: "The course id is not found in the database." });
            } else if (err.code === "23505") {
                res.status(409).json({ message: "Only one role can be added for the same user and course." });
            } else {
                res.status(404).json({ message: "Unknown error." });
                console.log(err);
            }
        } else if (pgRes.rowCount === 1) {
            res.status(200).json({ message: "The role is added." });
        }
    });
})

module.exports = router;