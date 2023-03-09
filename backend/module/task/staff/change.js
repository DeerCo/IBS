const express = require("express");
const router = express.Router();
const client = require("../../../setup/db");
const helpers = require("../../../utilities/helpers");

router.put("/", (req, res) => {
    if (res.locals["task"] === "") {
        res.status(400).json({ message: "The task is missing or invalid." });
        return;
    }
    if (!("due_date" in req.body) || helpers.time_validate(req.body["due_date"])) {
        res.status(400).json({ message: "The due date is missing or not correct." });
        return;
    }
    if (!("hidden" in req.body) || helpers.boolean_validate(req.body["hidden"])) {
        res.status(400).json({ message: "The hidden property is missing or not correct." });
        return;
    }
    if (!("min_member" in req.body) || helpers.number_validate(req.body["min_member"])) {
        res.status(400).json({ message: "The min member is missing or invalid." });
        return;
    }
    if (!("max_member" in req.body) || helpers.number_validate(req.body["max_member"])) {
        res.status(400).json({ message: "The max member is missing or invalid." });
        return;
    }
    if (!("max_token" in req.body) || helpers.number_validate(req.body["max_token"])) {
        res.status(400).json({ message: "The max token is missing or invalid." });
        return;
    }
    if (!("hide_interview" in req.body) || helpers.boolean_validate(req.body["hide_interview"])) {
        res.status(400).json({ message: "The hide interview property is missing or not correct." });
        return;
    }
    if (!("change_group" in req.body) || helpers.boolean_validate(req.body["change_group"])) {
        res.status(400).json({ message: "The change group property is missing or not correct." });
        return;
    }

    let interview_group = null;
    if ("interview_group" in req.body) {
        if (req.body["interview_group"] === "") {
            interview_group = null;
        } else if (helpers.name_validate(req.body["interview_group"])) {
            res.status(400).json({ message: "The interview group is invalid." });
            return;
        } else {
            interview_group = req.body["interview_group"];
        }
    }

    let task_group_id = null;
    if ("task_group_id" in req.body) {
        if (req.body["task_group_id"] === "") {
            task_group_id = null;
        } else if (helpers.number_validate(req.body["task_group_id"])) {
            res.status(400).json({ message: "The task group id is invalid." });
            return;
        } else {
            task_group_id = req.body["task_group_id"];
        }
    }

    let starter_code_url = null;
    if ("starter_code_url" in req.body) {
        if (req.body["starter_code_url"] === "") {
            starter_code_url = null;
        } else if (helpers.string_validate(req.body["starter_code_url"])) {
            res.status(400).json({ message: "The starter code url is invalid." });
            return;
        } else {
            starter_code_url = req.body["starter_code_url"];
        }
    }

    let due_date = req.body["due_date"] + " America/Toronto";
    let sql_update = "UPDATE course_" + res.locals["course_id"] + ".task SET due_date = ($1), hidden = ($2), min_member = ($3), max_member = ($4) , max_token = ($5), change_group = ($6), hide_interview = ($7), interview_group = ($8), task_group_id = ($9), starter_code_url = ($10) WHERE task = ($11)";
    let sql_update_data = [due_date, req.body["hidden"], req.body["min_member"], req.body["max_member"], req.body["max_token"], req.body["change_group"], req.body["hide_interview"], interview_group, task_group_id, starter_code_url, res.locals["task"]];

    client.query(sql_update, sql_update_data, (err, pg_res) => {
        if (err) {
            if (err.code === "23503") {
                res.status(400).json({ message: "The task_group_id is not found in the database." });
            } else {
                res.status(404).json({ message: "Unknown error." });
                console.log(err);
            }
        } else if (pg_res.rowCount === 0) {
            res.status(400).json({ message: "The task is invalid." });
        } else {
            res.status(200).json({ message: "The task is changed." });
        }
    });
})

module.exports = router;