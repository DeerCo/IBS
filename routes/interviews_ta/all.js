const express = require("express");
const router = express.Router();
const client = require("../../setup/db");
const helpers = require("../../utilities/helpers");

router.get("/:task/all", (req, res) => {
    let filter = helpers.query_filter(req.query);
    let sql_times = "SELECT id, task, to_char(time AT time zone 'America/Toronto', 'YYYY-MM-DD HH24:MI') AS time, student, length, location, cancelled, note FROM interviews WHERE task = ($1) AND ta = ($2)" + filter + " ORDER BY time";
    client.query(sql_times, [req.params.task, res.locals.ta], (err, pgRes) => {
        if (err) {
            res.status(404).json({ message: "Unknown error." });
        } else {
            res.json({ name: req.params.task, interviews: pgRes.rows });
        }
    });
})

module.exports = router;