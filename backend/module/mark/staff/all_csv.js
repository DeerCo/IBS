const express = require("express");
const router = express.Router();
const client = require("../../../setup/db");
const helpers = require("../../../utilities/helpers");

router.get("/", (req, res) => {
    let total = false;

    if ("total" in req.query && req.query["total"].toLowerCase() === "true") {
        total = true;
    }

    if (!("task" in req.query) || helpers.name_validate(req.query["task"])) {
        res.status(400).json({ message: "You need to provide one task." });
    } else {
        client.query("SELECT * FROM course_" + res.locals["course_id"] + ".mark WHERE task = ($1) ORDER BY username DESC", [req.query["task"]], (err, pgRes) => {
            if (err) {
				console.log(err)
                res.status(404).json({ message: "Unknown error." });
            } else {
                helpers.format_marks_one_task_csv(pgRes.rows, res.locals["course_id"], req.query["task"], res, "", total);
            }
        });
    }
})

module.exports = router;