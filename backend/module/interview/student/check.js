const express = require("express");
const router = express.Router();
const client = require("../../../setup/db");
const helpers = require("../../../utilities/helpers");

router.get("/", (req, res) => {
    if (res.locals["task"] === "") {
        res.status(400).json({ message: "The task is missing or invalid." });
        return;
    }

    helpers.get_group_id(res.locals["course_id"], res.locals["task"], res.locals["username"]).then(group_id => {
        let sql_check = "SELECT interview_id, to_char(time AT TIME ZONE 'America/Toronto', 'YYYY-MM-DD HH24:MI:SS') AS time, location FROM course_" + res.locals["course_id"] + ".interview WHERE group_id = ($1) AND task = ($2)";
        client.query(sql_check, [group_id, res.locals["task"]], (err, pgRes) => {
            if (err) {
                res.status(404).json({ message: "Unknown error." });
            } else {
                if (pgRes.rowCount === 0) {
                    res.status(200).json({ message: "You don't have a booked interview for " + res.locals["task"] + " yet." });
                } else {
                    let message = "Your interview for " + res.locals["task"] + " is booked at " + pgRes.rows[0]["time"] + ". The location is " + pgRes.rows[0]["location"] + ".";
                    res.status(200).json({ message: message });
                }
            }
        });
    });
})

module.exports = router;