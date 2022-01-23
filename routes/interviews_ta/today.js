const express = require("express");
const router = express.Router();
const client = require("../../setup/db");
const moment = require("moment");
require("moment-timezone");

router.get("/:task/today", (req, res) => {
    let sql_times = "SELECT id, task, to_char(time AT time zone 'America/Toronto', 'YYYY-MM-DD HH24:MI') AS time, student, length, location, cancelled, note FROM interviews WHERE task = ($1) AND ta = ($2) AND time BETWEEN ($3) AND ($3) + INTERVAL '24 HOURS' ORDER BY time";
    client.query(sql_times, [req.params.task, res.locals.ta, moment().tz("America/Toronto").format("YYYY-MM-DD") + " America/Toronto"], (err, pgRes) => {
        if (err) {
            res.status(404).json({ message: "Unknown error." });
        } else {
            res.json({ name: req.params.task, interviews: pgRes.rows });
        }
    });
})

module.exports = router;