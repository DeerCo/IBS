const express = require("express");
const router = express.Router();
const client = require("../../../setup/db");
const helpers = require("../../../utilities/helpers");

router.put("/", (req, res) => {
    if (!("course_id" in req.body) || helpers.number_validate(req.body["course_id"])) {
        res.status(400).json({ message: "The course id is missing or has invalid format." });
        return;
    }
    if (!("course_code" in req.body) || helpers.name_validate(req.body["course_code"])) {
        res.status(400).json({ message: "The course code is missing or has invalid format." });
        return;
    }
    if (!("course_session" in req.body) || helpers.name_validate(req.body["course_session"])) {
        res.status(400).json({ message: "The course session is missing or has invalid format." });
        return;
    }
    if (!("gitlab_group_id" in req.body) || (req.body["gitlab_group_id"] !== "" && helpers.number_validate(req.body["gitlab_group_id"]))) {
        res.status(400).json({ message: "The Gitlab group id is missing or not correct." });
        return;
    }
    if (!("default_token_count" in req.body) || helpers.number_validate(req.body["default_token_count"])) {
        res.status(400).json({ message: "The default token count is missing or has invalid format." });
        return;
    }
    if (!("token_length" in req.body) || helpers.name_validate(req.body["token_length"])) {
        res.status(400).json({ message: "The token length is missing or has invalid format." });
        return;
    }
    if (!("hidden" in req.body) || helpers.boolean_validate(req.body["hidden"])) {
        res.status(400).json({ message: "The hidden property is missing or not correct." });
        return;
    }

    let sql_change = "UPDATE course SET course_code = ($1), course_session = ($2), gitlab_group_id = ($3), default_token_count = ($4), token_length = ($5), hidden = ($6) WHERE course_id = ($7)";
    let sql_change_data = [req.body["course_code"], req.body["course_session"], req.body["gitlab_group_id"], req.body["default_token_count"], req.body["token_length"], req.body["hidden"], req.body["course_id"]];

    client.query(sql_change, sql_change_data, (err, pg_res) => {
        if (err) {
            if (err.code === "23505" && err.constraint === "course_course_code_course_session_key") {
                res.status(409).json({ message: "The course must have unique course code and session." });
            } else if (err.code === "23505" && err.constraint === "course_gitlab_group_id_key") {
                res.status(409).json({ message: "The course must have unique Gitlab group id." });
            } else {
                res.status(404).json({ message: "Unknown error." });
                console.log(err);
            }
        } else if (pg_res.rowCount === 0) {
            res.status(400).json({ message: "There is no course associated with this course id." });
        } else {
            res.status(200).json({ message: "The course is changed." });
        }
    });
})

module.exports = router;
