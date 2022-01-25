const express = require("express");
const router = express.Router();
const client = require("../../setup/db");
const helpers = require("../../utilities/helpers");

router.post("/:task/schedule", (req, res) => {
	if (!("time" in req.body) || helpers.time_validate(req.body["time"])) {
		res.status(400).json({ message: "Your desired time is missing or not correct." });
		return;
	}
	let time = req.body["time"] + " America/Toronto";

	if (!("length" in req.body) || isNaN(req.body["length"]) || req.body["length"].trim() === "") {
		res.status(400).json({ message: "Your desired length is missing or has invalid format." });
		return;
	}

	let location = "";
	if ("location" in req.body && helpers.string_validate(req.body["location"])) {
		res.status(400).json({ message: "Your desired location is missing or has invalid format." });
		return;
	} else if ("location" in req.body && !helpers.string_validate(req.body["location"])) {
		location = req.body["location"];
	} else {
		location = "Zoom";
	}

	let sql_schedule = "INSERT INTO interviews (task, time, ta, length, location) VALUES (($1), ($2), ($3), ($4), ($5))";
	client.query(sql_schedule, [req.params["task"], time, res.locals.ta, req.body["length"], location], (err, pgRes) => {
		if (err) {
			res.status(404).json({ message: "Unknown error." });
		} else {
			if (pgRes.rowCount !== 1) {
				res.status(404).json({ message: "Unknown error." });
			} else {
				let message = "You have scheduled an interview for " + req.params["task"] + " at " + req.body["time"] + " successfully.";
				res.status(200).json({ message: message });
			}
		}
	});
})

module.exports = router;