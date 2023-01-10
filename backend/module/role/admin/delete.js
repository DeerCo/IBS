const express = require("express");
const router = express.Router();
const client = require("../../../setup/db");
const helpers = require("../../../utilities/helpers");

router.delete("/", (req, res) => {
    if (!("course_id" in req.body) || helpers.number_validate(req.body["course_id"])) {
        res.status(400).json({ message: "The course id is missing or has invalid format." });
        return;
    }
    if (!("username" in req.body) || helpers.name_validate(req.body["username"])) {
        res.status(400).json({ message: "The username is missing or has invalid format." });
        return;
    }

    let sql_add = "DELETE FROM course_role WHERE username = ($1) and course_id = ($2)";
    let sql_add_data = [req.body["username"], req.body["course_id"]];

    client.query(sql_add, sql_add_data, (err, pgRes) => {
        if (err) {
            res.status(404).json({ message: "Unknown error." });
            console.log(err);
        } else if (pgRes.rowCount <= 1) {
            res.status(200).json({ message: pgRes.rowCount + " role is deleted.", count: pgRes.rowCount });
        } else {
            res.status(200).json({ message: pgRes.rowCount + " roles are deleted.", count: pgRes.rowCount });
        }
    });
})

module.exports = router;