const express = require("express");
const router = express.Router();
const client = require("../../../setup/db");
const helpers = require("../../../utilities/helpers");

router.put("/", (req, res) => {
    if (!("course_id" in req.body) || helpers.number_validate(req.body["course_id"])) {
        res.status(400).json({ message: "The course id is missing or has invalid format." });
        return;
    }
    if (!("course_code" in req.body) || helpers.string_validate(req.body["course_code"])) {
        res.status(400).json({ message: "The course code is missing or has invalid format." });
        return;
    }
    if (!("course_session" in req.body) || helpers.string_validate(req.body["course_session"])) {
        res.status(400).json({ message: "The course session is missing or has invalid format." });
        return;
    }
    if (!("hidden" in req.body) || helpers.boolean_validate(req.body["hidden"])) {
        res.status(400).json({ message: "The hidden property is missing or not correct." });
		return;
    }

    let sql_change = "UPDATE course SET course_code = ($1), course_session = ($2), hidden = ($3) WHERE course_id = ($4)";
    let sql_change_data = [req.body["course_code"], req.body["course_session"], req.body["hidden"], req.body["course_id"]];

    client.query(sql_change, sql_change_data, (err, pg_res) => {
        if (err) {
            res.status(404).json({ message: "Unknown error." });
            console.log(err);
        } else if (pg_res.rowCount === 0){
            res.status(400).json({ message: "There is no course associated with this course id." });
        } else{
            res.status(200).json({ message: "The course is changed." });
        }
    });
})

module.exports = router;