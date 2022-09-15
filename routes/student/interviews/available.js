const express = require("express");
const router = express.Router();
const client = require("../../../setup/db");
const constants = require("../../../setup/constants");

router.get("/:task/available", (req, res) => {
    client.query(constants.sql_times, [req.params["task"], constants.tasks[req.params["task"]]["exclude"], res.locals["group"]], (err, pgRes) => {
        if (err) {
            res.status(404).json({ message: "Unknown error." });
        } else {
            let interviews = {};
            for (let interview of pgRes.rows) {
                if (interview["all_count"] - interview["booked_count"] > 0) {
                    if (!(interview["location"] in interviews)) {
                        interviews[interview["location"]] = {};
                    }
                    interviews[interview["location"]][interview["time"]] = interview["all_count"] - interview["booked_count"];
                }
            }
            if (Object.keys(interviews).length != 0) {
                res.json({ name: req.params["task"], length: constants.tasks[req.params["task"]]["length"] + " minutes", availability: interviews });
            } else {
                res.json({ name: req.params["task"], length: constants.tasks[req.params["task"]]["length"] + " minutes", message: "No interview is available." });
            }
        }
    });
})

module.exports = router;