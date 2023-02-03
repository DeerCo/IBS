const express = require("express");
const router = express.Router();
const client = require("../../../setup/db");
const helpers = require("../../../utilities/helpers");

router.delete("/", (req, res) => {
    if (!("task_group_id" in req.body) || helpers.number_validate(req.body["task_group_id"])) {
        res.status(400).json({ message: "The task group id is missing or has invalid format." });
        return;
    }

    let sql_delete_task_group = "DELETE FROM course_" + res.locals["course_id"] + ".task_group WHERE task_group_id = ($1)";

    client.query(sql_delete_task_group, [req.body["task_group_id"]], (err, pg_res) => {
        if (err) {
            res.status(404).json({ message: "Unknown error." });
            console.log(err);
        } else {
            if (pg_res.rowCount === 0) {
                res.status(400).json({ message: "The task group id is invalid." });
            } else {
                res.status(200).json({ message: "The task group is deleted." });
            }
        }
    });
})

module.exports = router;