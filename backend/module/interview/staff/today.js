const express = require("express");
const router = express.Router();
const moment = require("moment");
require("moment-timezone");
const client = require("../../../setup/db");
const helpers = require("../../../utilities/helpers");

router.get("/", (req, res) => {
    if (!("task" in req.query) || helpers.string_validate(req.query["task"])) {
        res.status(400).json({ message: "The task is missing or has invalid format." });
        return;
    }

    let sql_times = "SELECT to_char(time AT TIME ZONE 'America/Toronto', 'YYYY-MM-DD HH24:MI:SS') AS toronto_time, * FROM course_" + res.locals["course_id"] + ".interview WHERE task = ($1) AND host = ($2) AND time BETWEEN ($3) AND ($3) + INTERVAL '24 HOURS' ORDER BY time";
    client.query(sql_times, [req.query["task"], res.locals["username"], moment().tz("America/Toronto").format("YYYY-MM-DD") + " America/Toronto"], (err, pg_res) => {
        if (err) {
            res.status(404).json({ message: "Unknown error." });
        } else {
            res.status(200).json({ interviews: pg_res.rows });
        }
    });
})

module.exports = router;