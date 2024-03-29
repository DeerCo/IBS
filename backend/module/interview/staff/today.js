const express = require("express");
const router = express.Router();
const moment = require("moment");
require("moment-timezone");
const client = require("../../../setup/db");

router.get("/", (req, res) => {
    if (res.locals["task"] === "") {
        res.status(400).json({ message: "The task is missing or invalid." });
        return;
    }

    let sql_times = "SELECT interview_id, task, to_char(time AT TIME ZONE 'America/Toronto', 'YYYY-MM-DD HH24:MI:SS') AS start_time, to_char(time AT TIME ZONE 'America/Toronto' + CONCAT(length,' minutes')::INTERVAL, 'YYYY-MM-DD HH24:MI:SS') AS end_time, host, group_id, length, location, note, cancelled FROM course_" + res.locals["course_id"] + ".interview WHERE task = ($1) AND host = ($2) AND time BETWEEN ($3) AND ($3) + INTERVAL '24 HOURS' ORDER BY time";
    client.query(sql_times, [res.locals["task"], res.locals["username"], moment().tz("America/Toronto").format("YYYY-MM-DD") + " America/Toronto"], (err, pg_res) => {
        if (err) {
            res.status(404).json({ message: "Unknown error." });
        } else {
            res.status(200).json({ count: pg_res.rowCount, interviews: pg_res.rows });
        }
    });
})

module.exports = router;