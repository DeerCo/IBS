const express = require("express");
const router = express.Router();
const client = require("../../setup/db");
const constants = require("../../setup/constants");

router.get("/:task/available", (req, res) => {
	client.query(constants.sql_times, [req.params["task"], constants.tasks[req.params["task"]]["exclude"], res.locals["group"]], (err, pgRes) => {
		if (err) {
			res.status(404).json({ message: "Unknown error." });
		} else {
			let interviews = {};
			for (let interviews_times of pgRes.rows) {
				if (interviews_times["all_count"] - interviews_times["booked_count"] > 0) {
					interviews[interviews_times["time"]] = interviews_times["all_count"] - interviews_times["booked_count"];
				}
			}
			res.json({ name: req.params["task"], availability: interviews });
		}
	});
})

module.exports = router;