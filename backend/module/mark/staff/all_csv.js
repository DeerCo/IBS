const express = require("express");
const router = express.Router();
const client = require("../../../setup/db");
const helpers = require("../../../utilities/helpers");

router.get("/", (req, res) => {
    if (res.locals["task"] === "") {
        res.status(400).json({ message: "The task is missing or invalid." });
        return;
    }

    if (req.query["total"] === true || req.query["total"] === "true") {
        var total = true;
    } else {
        var total = false;
    }

    client.query("SELECT * FROM course_" + res.locals["course_id"] + ".mark WHERE task = ($1) ORDER BY username DESC", [res.locals["task"]], (err, pgRes) => {
        if (err) {
            console.log(err)
            res.status(404).json({ message: "Unknown error." });
        } else {
            helpers.format_marks_one_task_csv(pgRes.rows, res.locals["course_id"], res.locals["task"], res, "", total);
        }
    });
})

module.exports = router;