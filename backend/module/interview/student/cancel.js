const express = require("express");
const router = express.Router();
const moment = require("moment");
require("moment-timezone");
const client = require("../../../setup/db");
const helpers = require("../../../utilities/helpers");
const rate_limit = require("../../../setup/rate_limit");

router.delete("/", rate_limit.email_limiter, (req, res) => {
    if (res.locals["task"] === "") {
        res.status(400).json({ message: "The task is missing or invalid." });
        return;
    }
    if (res.locals["hide_interview"] === true) {
        res.status(400).json({ message: "The interviews are not ready yet." });
        return;
    }

    if (res.locals["interview_group"] !== "" && res.locals["interview_group"] !== null) {
        var task = res.locals["interview_group"];
    } else {
        var task = res.locals["task"];
    }

    helpers.get_group_id(res.locals["course_id"], task, res.locals["username"]).then(group_id => {
        if (group_id === -1) {
            res.status(400).json({ message: "You need to join a group before cancelling your interview." });
            return;
        }

        let sql_check = "SELECT interview_id, to_char(time AT TIME ZONE 'America/Toronto', 'YYYY-MM-DD HH24:MI:SS') AS time, location FROM course_" + res.locals["course_id"] + ".interview WHERE group_id = ($1) AND task = ($2) AND cancelled = false";
        client.query(sql_check, [group_id, res.locals["task"]], (err, pg_res_check) => {
            if (err) {
                res.status(404).json({ message: "Unknown error." });
            } else {
                if (pg_res_check.rowCount === 0) {
                    res.status(400).json({ message: "You don't have a booked interview for " + res.locals["task"] + " yet." });
                } else if (moment.tz(pg_res_check.rows[0]["time"], "America/Toronto").subtract(2, "hours") < moment().tz("America/Toronto")) {
                    res.status(400).json({ message: "Your interview for " + res.locals["task"] + " at " + pg_res_check.rows[0]["time"] + " was in the past or will take place in 2 hours. You can't cancel it at this time." });
                } else {
                    let sql_cancel = "UPDATE course_" + res.locals["course_id"] + ".interview SET group_id = NULL WHERE interview_id = ($1)";
                    client.query(sql_cancel, [pg_res_check.rows[0]["interview_id"]], (err, pr_res_cancel) => {
                        if (err) {
                            res.status(404).json({ message: "Unknown error." });
                        } else {
                            let message = "You have cancelled your interview for " + res.locals["task"] + " at " + pg_res_check.rows[0]["time"] + " successfully.";
                            res.status(200).json({ message: message });
                            helpers.send_email_by_group(res.locals["course_id"], group_id, "IBS Interview Confirmation", message);
                        }
                    });
                }
            }
        });
    });
})

module.exports = router;