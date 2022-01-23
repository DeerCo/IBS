const express = require("express");
const router = express.Router();
const client = require("../../setup/db");
const constants = require("../../setup/constants");

router.get("/:task/check", (req, res) => {
	client.query(constants.sql_check, [res.locals.group, req.params.task], (err, pgRes) => {
		if (err) {
			res.status(404).json({ message: "Unknown error." });
		} else {
			if (pgRes.rowCount === 0) {
				res.status(406).json({ message: "You don't have a booked interview for " + req.params.task + " yet." });
			} else if (pgRes.rowCount > 1) {
				res.status(404).json({ message: "Unknown error." });
			} else {
				res.status(200).json({ message: "Your interview for " + req.params.task + " is booked at " + pgRes.rows[0]["time"] + "." });
			}
		}
	});
})

module.exports = router;