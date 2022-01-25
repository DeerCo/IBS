const express = require("express");
const router = express.Router();
const client = require("../../setup/db");
const constants = require("../../setup/constants");
const helpers = require("../../utilities/helpers");

router.get("/:task/all", (req, res) => {
    if (!constants.tasks[req.params["task"]]["open"] || helpers.string_validate(req.params["ta"])) {
        res.status(400).json({ message: "Task or TA is invalid" });
        return;
    }

    let filter = helpers.query_filter(req.query);
    let sql_times = "SELECT id, task, to_char(time AT time zone 'America/Toronto', 'YYYY-MM-DD HH24:MI') AS time, student, length, location, cancelled, note FROM interviews WHERE task = ($1) AND ta = ($2)" + filter + " ORDER BY time";
    client.query(sql_times, [req.params["task"], res.locals["ta"]], (err, pgRes) => {
        if (err) {
            res.status(404).json({ message: "Unknown error." });
        } else {
            helpers.send_csv(pgRes.rows, res, false);
        }
    });
})

module.exports = router;