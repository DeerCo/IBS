const express = require("express");
const router = express.Router();
const moment = require("moment");
require("moment-timezone");
const client = require("../../setup/db");
const constants = require("../../setup/constants");
const helpers = require("../../utilities/helpers");
const rate_limit = require("../../setup/rate_limit");

router.post("/:task/book", rate_limit.interviews_limiter, (req, res) => {
	if (!("time" in req.body) || helpers.time_validate(req.body["time"])) {
		res.status(400).json({ message: "Your desired time is missing or not correct." });
		return;
	}
	let time = req.body["time"] + " America/Toronto";

	client.query(constants.sql_check, [res.locals.group, req.params["task"]], (err, pgRes) => {
		if (err) {
			res.status(404).json({ message: "Unknown error." });
		} else {
			if (pgRes.rowCount === 1) {
				res.status(406).json({ message: "You already have an existing interview for " + req.params["task"] + " at " + pgRes.rows[0]["time"] + "." });
			} else if (pgRes.rowCount > 1) {
				res.status(404).json({ message: "Unknown error." });
			} else {
				if (moment.tz(req.body["time"], "America/Toronto").subtract(5, "minutes") < moment().tz("America/Toronto")) {
					res.status(406).json({ message: req.body["time"] + " was in the past or is within 5 minutes from now. Please choose a new time." });
				} else {
					client.query(constants.sql_book, [res.locals.group, req.params["task"], time, constants.tasks[req.params["task"]]["exclude"]], (err, pgRes) => {
						if (err) {
							res.status(404).json({ message: "Unknown error." });
						} else {
							if (pgRes.rowCount === 0) {
								res.status(409).json({ message: "No available interview exists for " + req.params["task"] + " at " + req.body["time"] + ". Please choose a different time." });
							} else {
								let message = "You have booked your interview for " + req.params["task"] + " at " + req.body["time"] + " successfully.";
								res.status(200).json({ message: message });
								helpers.send_email(res.locals.email, "Your CSC309 Interview Confirmation", message + "\n\nCongratulations!");
							}
						}
					});
				}
			}
		}
	});
})

module.exports = router;