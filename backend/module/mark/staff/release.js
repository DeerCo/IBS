const express = require("express");
const router = express.Router();
const client = require("../../../setup/db");

router.put("/", (req, res) => {
    let sql_release = "UPDATE course_" + res.locals["course_id"] + ".mark SET hidden = false WHERE task = ($1)";

    client.query(sql_release, [res.locals["task"]], (err, pgRes) => {
        if (err) {
                res.status(404).json({ message: "Unknown error." });
                console.log(err);
        } else {
            if (pgRes.rowCount <= 1) {
                res.status(200).json({ message: pgRes.rowCount + " mark is released." });
            } else{
                res.status(200).json({ message: pgRes.rowCount + " marks are released." });
            }
        }
    });
})

module.exports = router;