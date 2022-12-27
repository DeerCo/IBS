const express = require("express");
const router = express.Router();
const client = require("../../../setup/db");
const helpers = require("../../../utilities/helpers");

router.post("/", (req, res) => {
    if (!("task" in req.body) || helpers.string_validate(req.body["task"])) {
        res.status(400).json({ message: "The task is missing or has invalid format." });
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
    

    let task_group_id = null;
    if ("task_group_id" in req.body) {
        if (helpers.number_validate(req.body["task_group_id"])){
            res.status(400).json({ message: "The token group id is invalid." });
            return;
        } else{
            task_group_id = req.body["task_group_id"];
        }
    }

    let starter_code_url = null;
    if ("starter_code_url" in req.body) {
        if (helpers.string_validate(req.body["starter_code_url"])){
            res.status(400).json({ message: "The starter code url is invalid." });
            return;
        } else{
            starter_code_url = req.body["starter_code_url"];
        }
    }

    let due_date = req.body["due_date"] + " America/Toronto";
    let sql_add = "INSERT INTO course_" + res.locals["course_id"] + ".task (task, due_date, hidden, min_member, max_member, max_token, task_group_id, starter_code_url) VALUES (($1), ($2), ($3), ($4), ($5), ($6), ($7), ($8))";
    let sql_add_data = [req.body["task"], due_date, req.body["hidden"], req.body["min_member"], req.body["max_member"], req.body["max_token"], task_group_id, starter_code_url];

    client.query(sql_add, sql_add_data, (err, pgRes) => {
        if (err) {
            if (err.code === "23503") {
                res.status(409).json({ message: "The task_group_id is not found in the database." });
            } else if (err.code === "23505") {
                res.status(409).json({ message: "Task must have unique name for each course." });
            } else {
                res.status(404).json({ message: "Unknown error." });
                console.log(err);
            }
        } else if (pgRes.rowCount === 1) {
            res.status(200).json({ message: "The task is added." });
        }
    });
})

module.exports = router;