const express = require("express");
const router = express.Router();
const client = require("../../../setup/db");
const helpers = require("../../../utilities/helpers");

router.get("/", (req, res) => {
    if (!("task" in req.query) || helpers.string_validate(req.query["task"])) {
        res.status(400).json({ message: "The task is missing or has invalid format." });
        return;
    }

    let sql_times = "SELECT to_char(time AT TIME ZONE 'America/Toronto', 'YYYY-MM-DD HH24:MI:SS') AS start_time, " +
                    "to_char(time AT TIME ZONE 'America/Toronto' + CONCAT(length,' minutes')::INTERVAL, 'YYYY-MM-DD HH24:MI:SS') AS end_time, " +
                    "COUNT(*) AS all_count, COUNT(group_id) AS booked_count, location FROM course_" + 
                    res.locals["course_id"] + ".interview WHERE task = ($1) AND time > now() GROUP BY time, length, location ORDER BY time";
    client.query(sql_times, [req.query["task"]], (err, pgRes) => {
        if (err) {
            res.status(404).json({ message: "Unknown error." });
            console.log(err)
        } else {
            let interviews = {};
            for (let interview of pgRes.rows) {
                if (interview["all_count"] - interview["booked_count"] > 0){
                    if (!(interview["location"] in interviews)) {
                        interviews[interview["location"]] = {};
                    }
                    let time = interview["start_time"] + " - " + interview["end_time"];
                    interviews[interview["location"]][time] = interview["all_count"] - interview["booked_count"];
                }
            }
            if (Object.keys(interviews).length != 0) {
                res.json({ task: req.query["task"], availability: interviews });
            } else {
                res.json({ task: req.query["task"], message: "No interview is available." });
            }
        }
    });
})

module.exports = router;