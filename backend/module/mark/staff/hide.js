const express = require("express");
const router = express.Router();
const client = require("../../../setup/db");

router.put("/", (req, res) => {
    if (res.locals["task"] === "") {
        res.status(400).json({ message: "The task is missing or invalid." });
        return;
    }

    let sql_release = "UPDATE course_" + res.locals["course_id"] + ".mark SET hidden = true WHERE task = ($1)";

    client.query(sql_release, [res.locals["task"]], (err, pgRes) => {
        if (err) {
            res.status(404).json({ message: "Unknown error." });
            console.log(err);
        } else {
            if (pgRes.rowCount <= 1) {
                res.status(200).json({ message: pgRes.rowCount + " mark is hidden.", count: pgRes.rowCount });
            } else {
                res.status(200).json({ message: pgRes.rowCount + " marks are hidden.", count: pgRes.rowCount });
            }
        }
    });
})

module.exports = router;