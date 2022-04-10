const express = require("express");
const router = express.Router();
const client = require("../../setup/db");
const helpers = require("../../utilities/helpers");

router.get("/:task/all", (req, res) => {
    let filter = helpers.query_filter(req.query, res.locals["ta"]);
    let sql_times = "SELECT id, task, to_char(time AT TIME ZONE 'America/Toronto', 'YYYY-MM-DD HH24:MI') AS time, ta, student, length, location, cancelled, note FROM interviews WHERE task = ($1)" + filter + " ORDER BY time";
    client.query(sql_times, [req.params["task"]], (err, pgRes) => {
        if (err) {
            res.status(404).json({ message: "Unknown error." });
        } else {
            helpers.send_interviews_csv(pgRes.rows, res, false);
        }
    });
})

module.exports = router;