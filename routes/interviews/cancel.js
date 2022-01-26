const express = require("express");
const router = express.Router();
const moment = require("moment");
require("moment-timezone");
const client = require("../../setup/db");
const constants = require("../../setup/constants");
const helpers = require("../../utilities/helpers");

router.delete("/:task/cancel", (req, res) => {
	client.query(constants.sql_check, [res.locals["group"], req.params["task"]], (err, pgRes) => {
		if (err) {
			res.status(404).json({ message: "Unknown error." });
		} else {
			if (pgRes.rowCount === 0) {
				res.status(406).json({ message: "You don't have a booked interview for " + req.params["task"] + " yet." });
			} else if (pgRes.rowCount > 1) {
				res.status(404).json({ message: "Unknown error." });
			} else if (moment.tz(pgRes.rows[0]["time"], "America/Toronto").subtract(2, "hours") < moment().tz("America/Toronto")) {
				res.status(406).json({ message: "Your interview for " + req.params["task"] + " at " + pgRes.rows[0]["time"] + " was in the past or will take place in 2 hours. You can't cancel it at this time." });
			} else {
				client.query(constants.sql_cancel, [pgRes.rows[0]["id"]], (err, pgRes1) => {
					if (err) {
						res.status(404).json({ message: "Unknown error." });
					} else {
						let message = "You have cancelled your interview for " + req.params["task"] + " at " + pgRes.rows[0]["time"] + " successfully.";
						res.status(200).json({ message: message });
						// helpers.send_email(res.locals["email"], "Your CSC309 Interview Confirmation", message + "\n\nCongratulations!");
					}
				});
			}
		}
	});
})

module.exports = router;