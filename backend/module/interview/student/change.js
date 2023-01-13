const express = require("express");
const router = express.Router();
const moment = require("moment");
require("moment-timezone");
const client = require("../../../setup/db");
const helpers = require("../../../utilities/helpers");

router.put("/", (req, res) => {
    if (res.locals["task"] === "") {
        res.status(400).json({ message: "The task is missing or invalid." });
        return;
    }
    if (!("time" in req.body) || helpers.time_validate(req.body["time"])) {
        res.status(400).json({ message: "Your desired time is missing or not correct." });
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
            res.status(400).json({ message: "Your desired location has invalid format." });
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
            res.status(400).json({ message: "You need to join a group before changing an interview." });
            return;
        }

        let sql_check = "SELECT interview_id, to_char(time AT TIME ZONE 'America/Toronto', 'YYYY-MM-DD HH24:MI:SS') AS time, location FROM course_" + res.locals["course_id"] + ".interview WHERE group_id = ($1) AND task = ($2)";
        client.query(sql_check, [group_id, res.locals["task"]], (err, pg_res_check) => {
            if (err) {
                res.status(404).json({ message: "Unknown error." });
                return;
            }

            if (pg_res_check.rowCount === 0) {
                res.status(400).json({ message: "You don't have a booked interview for " + res.locals["task"] + " yet." });
            } else if (moment.tz(pg_res_check.rows[0]["time"], "America/Toronto").subtract(2, "hours") < moment().tz("America/Toronto")) {
                res.status(400).json({ message: "Your existing interview for " + res.locals["task"] + " at " + pg_res_check.rows[0]["time"] + " was in the past or will take place in 2 hours. You can't book a new one at this time." });
            } else {
                let sql_book = "UPDATE course_" + res.locals["course_id"] + ".interview SET group_id = ($1) WHERE interview_id = (SELECT interview_id FROM course_" + res.locals["course_id"] + ".interview WHERE task = ($2) AND time = ($3) AND group_id IS NULL AND location = ($4) LIMIT 1 FOR UPDATE)";
                client.query(sql_book, [group_id, res.locals["task"], time, location], (err, pg_res_book) => {
                    if (err) {
                        res.status(404).json({ message: "Unknown error." });
                        return;
                    }

                    if (pg_res_book.rowCount === 0) {
                        res.status(400).json({ message: "No available interview exists for " + res.locals["task"] + " at " + req.body["time"] + " at location " + location + ". Please choose a different time." });
                    } else {
                        let message = "You have changed your interview for " + res.locals["task"] + " from " + pg_res_check.rows[0]["time"] + " to " + req.body["time"] + " successfully. The new location is " + location + ".";
                        res.status(200).json({ message: message });
                        helpers.send_email_by_group(res.locals["course_id"], group_id, "IBS Interview Confirmation", message);

                        let sql_cancel = "UPDATE course_" + res.locals["course_id"] + ".interview SET group_id = NULL WHERE interview_id = ($1)";
                        client.query(sql_cancel, [pg_res_check.rows[0]["interview_id"]]);
                    }
                });
            }
        });
    });
})

module.exports = router;