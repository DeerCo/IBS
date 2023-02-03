const express = require("express");
const router = express.Router();
const client = require("../../../setup/db");
const helpers = require("../../../utilities/helpers");

router.put("/", (req, res) => {
    if (!("task_group_id" in req.body) || helpers.number_validate(req.body["task_group_id"])) {
        res.status(400).json({ message: "The task group id is missing or has invalid format." });
        return;
    }
    if (!("max_token" in req.body) || helpers.number_validate(req.body["max_token"])) {
        res.status(400).json({ message: "The max token is missing or has invalid format." });
        return;
    }

    var sql_change = "UPDATE course_" + res.locals["course_id"] + ".task_group SET max_token = ($1) WHERE task_group_id = ($2)";
    var sql_change_data = [req.body["max_token"], req.body["task_group_id"]];

    client.query(sql_change, sql_change_data, (err, pg_res) => {
        if (err) {
            res.status(404).json({ message: "Unknown error." });
            console.log(err);
        } else if (pg_res.rowCount === 0) {
            res.status(400).json({ message: "The task group id is invalid." });
        } else {
            res.status(200).json({ message: "The task group is changed." });
        }
    });
})

module.exports = router;