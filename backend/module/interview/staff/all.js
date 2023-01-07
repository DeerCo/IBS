const express = require("express");
const router = express.Router();
const client = require("../../../setup/db");
const helpers = require("../../../utilities/helpers");

router.get("/", (req, res) => {
    if (res.locals["task"] === "") {
        res.status(400).json({ message: "The task is missing or invalid." });
        return;
    }

    let temp = helpers.query_filter(req.query, 2);
    let filter = temp["filter"];
    let data = temp["data"];

    let sql_times = "SELECT to_char(time AT TIME ZONE 'America/Toronto', 'YYYY-MM-DD HH24:MI:SS') AS toronto_time, * FROM course_" + res.locals["course_id"] + ".interview WHERE task = ($1)" + filter + " ORDER BY time";
    client.query(sql_times, [res.locals["task"]].concat(data), (err, pg_res) => {
        if (err) {
            res.status(404).json({ message: "Unknown error." });
            console.log(err)
        } else {
            res.status(200).json({ interviews: pg_res.rows });
        }
    });
})

module.exports = router;