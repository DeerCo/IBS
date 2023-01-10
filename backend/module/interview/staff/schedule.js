const express = require("express");
const router = express.Router();
const client = require("../../../setup/db");
const helpers = require("../../../utilities/helpers");

router.post("/", (req, res) => {
	if (res.locals["task"] === "") {
		res.status(400).json({ message: "The task is missing or invalid." });
		return;
	}
	if (!("length" in req.body) || helpers.number_validate(req.body["length"])) {
		res.status(400).json({ message: "The length is missing or has invalid format." });
		return;
	}

	let location = "";
	if ("location" in req.body && helpers.string_validate(req.body["location"])) {
		res.status(400).json({ message: "The location has invalid format." });
		return;
	} else if ("location" in req.body && !helpers.string_validate(req.body["location"])) {
		location = req.body["location"];
	} else {
		location = "Zoom";
	}

	if (!("time" in req.body) || helpers.time_validate(req.body["time"])) {
		res.status(400).json({ message: "The time is missing or has invalid format. (YYYY-MM-DD HH:MM:SS)" });
		return;
	}
	let time = req.body["time"] + " America/Toronto";

	let sql_schedule = "INSERT INTO course_" + res.locals["course_id"] + ".interview (task, time, host, location, length) VALUES (($1), ($2), ($3), ($4), ($5))";
	let sql_schedule_data = [res.locals["task"], time, res.locals["username"], location, req.body["length"]];
	client.query(sql_schedule, sql_schedule_data, (err, pgRes) => {
		if (err) {
			if (err.code === "23503" && err.constraint === "task") {
				res.status(400).json({ message: "The task is not found in the database." });
			} else if (err.code === "23503" && err.constraint === "username") {
				res.status(400).json({ message: "The username is not found in the database." });
			} else if (err.code === "23505") {
				res.status(400).json({ message: "You have another interview at the same time." });
			} else {
				res.status(404).json({ message: "Unknown error." });
			}
		} else {
			let message = "You have scheduled an interview for " + res.locals["task"] + " at " + req.body["time"] + " successfully.";
			res.status(200).json({ message: message });
		}
	});
})

module.exports = router;