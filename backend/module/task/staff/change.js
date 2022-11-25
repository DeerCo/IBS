const express = require("express");
const router = express.Router();
const client = require("../../../setup/db");
const helpers = require("../../../utilities/helpers");

router.put("/", (req, res) => {
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

    let due_date = req.body["due_date"] + " America/Toronto";
    let sql_update = "UPDATE course_" + res.locals["course_id"] + ".task SET due_date = ($1), hidden = ($2), min_member = ($3), max_member = ($4) WHERE task = ($5)";
    let sql_update_data = [due_date, req.body["hidden"], req.body["min_member"], req.body["max_member"], req.body["task"]];

    client.query(sql_update, sql_update_data, (err, pg_res) => {
        if (err) {
            res.status(404).json({ message: "Unknown error." });
            console.log(err);
        } else if (pg_res.rowCount === 0){
            res.status(400).json({ message: "There is no task associated with this task id." });
        } else{
            res.status(200).json({ message: "The task is changed." });
        }
    });
})

module.exports = router;