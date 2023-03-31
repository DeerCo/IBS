const express = require("express");
const router = express.Router();
const format = require('pg-format');
const client = require("../../../setup/db");
const helpers = require("../../../utilities/helpers");

router.post("/", (req, res) => {
    if (res.locals["task"] === "") {
        res.status(400).json({ message: "The task is missing or invalid." });
        return;
    }
    if (!("criteria" in req.body) || helpers.string_validate(req.body["criteria"])) {
        res.status(400).json({ message: "The criteria is missing or has invalid format." });
        return;
    }
    if (!("mark" in req.body) || helpers.number_validate(req.body["mark"])) {
        res.status(400).json({ message: "The mark is missing or has invalid format." });
        return;
    }

    if ("username" in req.body && !helpers.name_validate(req.body["username"])) {
        submit_mark([req.body["username"].toLowerCase()], req, res);
    } else if ("group_id" in req.body && !helpers.name_validate(req.body["group_id"])) {
        helpers.get_group_users(res.locals["course_id"], req.body["group_id"]).then(user => {
            if (user.length === 0) {
                res.status(400).json({ message: "The group id is not found in the database." });
                return;
            }

            submit_mark(user, req, res);
        });
    } else {
        res.status(400).json({ message: "Either group id or username needs to be provided." });
        return;
    }
})

function submit_mark(user_list, req, res) {
    let sql_add = "INSERT INTO course_" + res.locals["course_id"] + ".mark (criteria_id, username, mark, task) VALUES %L";
    if (req.body["overwrite"] === true || req.body["overwrite"] === "true") {
        sql_add += " ON CONFLICT (criteria_id, username) DO UPDATE SET mark = EXCLUDED.mark";
    } else {
        sql_add += " ON CONFLICT (criteria_id, username) DO NOTHING";
    }

    helpers.get_criteria_id(res.locals["course_id"], res.locals["task"], req.body["criteria"]).then(criteria_id => {
        if (criteria_id === -1){
            res.status(400).json({ message: "The criteria is not found in the database." });
        }

        let marks_data = [];
        for (let user of user_list) {
            marks_data.push([criteria_id, user.toLowerCase(), req.body["mark"], res.locals["task"]]);
        }

        client.query(format(sql_add, marks_data), [], (err, pgRes) => {
            if (err) {
                if (err.code === "23503" && err.constraint === "username") {
                    let regex = err.detail.match(/Key \(username\)=\((.*)\) is not present in table "user"\./);
                    res.status(400).json({ message: "The username " + regex[1] + " is not found in the database." });
                } else {
                    console.log(err);
                    res.status(404).json({ message: "Unknown error." });
                }
            } else {
                let message = pgRes.rowCount + " marks are changed. " + (marks_data.length - pgRes.rowCount) + " marks are unchanged.";
                res.status(200).json({ message: message, changed_count: pgRes.rowCount, unchanged_count: marks_data.length - pgRes.rowCount });
            }
        });
    });
}

module.exports = router;