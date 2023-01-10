const express = require("express");
const router = express.Router();
const client = require("../../../setup/db");
const helpers = require("../../../utilities/helpers");

router.get("/", (req, res) => {
    if (res.locals["task"] === "") {
        res.status(400).json({ message: "The task is missing or invalid." });
        return;
    }

    if (res.locals["interview_group"] !== "" && res.locals["interview_group"] !== null) {
        var task = res.locals["interview_group"];
    } else {
        var task = res.locals["task"];
    }

    helpers.get_group_id(res.locals["course_id"], task, res.locals["username"]).then(group_id => {
        if (group_id === -1) {
            res.status(400).json({ message: "You need to join a group before checking." });
            return;
        }

        let sql_check = "SELECT interview_id, to_char(time AT TIME ZONE 'America/Toronto', 'YYYY-MM-DD HH24:MI:SS') AS start_time, " +
            "to_char(time AT TIME ZONE 'America/Toronto' + CONCAT(length,' minutes')::INTERVAL, 'YYYY-MM-DD HH24:MI:SS') AS end_time, " +
            "location FROM course_" + res.locals["course_id"] + ".interview WHERE group_id = ($1) AND task = ($2)";
        client.query(sql_check, [group_id, res.locals["task"]], (err, pgRes) => {
            if (err) {
                res.status(404).json({ message: "Unknown error." });
            } else {
                if (pgRes.rowCount === 0) {
                    res.status(200).json({ message: "You don't have a booked interview for " + res.locals["task"] + " yet." });
                } else {
                    let message = "Your interview for " + res.locals["task"] + " is from " + pgRes.rows[0]["start_time"] + " to " + pgRes.rows[0]["end_time"] + ". The location is " + pgRes.rows[0]["location"] + ".";
                    res.status(200).json({ message: message, start_time: pgRes.rows[0]["start_time"], end_time: pgRes.rows[0]["end_time"], location: pgRes.rows[0]["location"] });
                }
            }
        });
    });
})

module.exports = router;