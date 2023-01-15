const express = require("express");
const router = express.Router();
const moment = require("moment");
require("moment-timezone");
const client = require("../../../setup/db");
const helpers = require("../../../utilities/helpers");

router.post("/", (req, res) => {
    if (res.locals["task"] === "") {
        res.status(400).json({ message: "The task is missing or invalid." });
        return;
    }
    if (!("time" in req.body) || helpers.time_validate(req.body["time"])) {
        res.status(400).json({ message: "The time is missing or has invalid format. (YYYY-MM-DD HH:mm:ss)" });
        return;
    }
    if (moment.tz(req.body["time"], "America/Toronto").subtract(30, "minutes") < moment().tz("America/Toronto")) {
        res.status(400).json({ message: req.body["time"] + " was in the past or is within 30 minutes from now. Please choose a new time." });
        return;
    }
    let time = req.body["time"] + " America/Toronto";

    let location = "Zoom";
    if ("location" in req.body) {
        if (helpers.string_validate(req.body["location"])) {
            res.status(400).json({ message: "The location has invalid format." });
            return;
        } else {
            location = req.body["location"];
        }
    }

    if (res.locals["interview_group"] !== "" && res.locals["interview_group"] !== null) {
        var task = res.locals["interview_group"];
    } else {
        var task = res.locals["task"];
    }

    helpers.get_group_id(res.locals["course_id"], task, res.locals["username"]).then(group_id => {
        if (group_id === -1) {
            res.status(400).json({ message: "You need to join a group before booking an interview." });
            return;
        }
        let sql_check = "SELECT to_char(time AT TIME ZONE 'America/Toronto', 'YYYY-MM-DD HH24:MI:SS') AS time FROM course_" + res.locals["course_id"] + ".interview WHERE group_id = ($1) AND task = ($2) AND cancelled = false";
        client.query(sql_check, [group_id, res.locals["task"]], (err, pgRes) => {
            if (err) {
                res.status(404).json({ message: "Unknown error." });
                return;
            }

            if (pgRes.rowCount === 1) {
                res.status(409).json({ message: "You already have an existing interview for " + res.locals["task"] + " at " + pgRes.rows[0]["time"] + "." });
            } else {
                let sql_book = "UPDATE course_" + res.locals["course_id"] + ".interview SET group_id = ($1) WHERE interview_id = (SELECT interview_id FROM course_" + res.locals["course_id"] + ".interview WHERE task = ($2) AND time = ($3) AND group_id IS NULL AND location = ($4) AND cancelled = false LIMIT 1 FOR UPDATE)";
                client.query(sql_book, [group_id, res.locals["task"], time, location], (err, pgRes) => {
                    if (err) {
                        res.status(404).json({ message: "Unknown error." });
                    } else if (pgRes.rowCount === 0) {
                        res.status(400).json({ message: "No available interview exists for " + res.locals["task"] + " at " + req.body["time"] + " at location " + location + ". Please choose a different time." });
                    } else {
                        let message = "You have booked your interview for " + res.locals["task"] + " at " + req.body["time"] + " successfully. The location is " + location + ".";
                        res.status(200).json({ message: message });
                        helpers.send_email_by_group(res.locals["course_id"], group_id, "IBS Interview Confirmation", message);
                    }
                });
            }
        });
    });
})

module.exports = router;