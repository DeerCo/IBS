const express = require("express");
const router = express.Router();
const client = require("../../../setup/db");
const helpers = require("../../../utilities/helpers");

router.put("/", (req, res) => {
	if (!("group_id" in req.body) || helpers.number_validate(req.body["group_id"])) {
		res.status(400).json({ message: "The group id is missing or invalid." });
		return;
	}
	if (!("extension" in req.body) || helpers.number_validate(req.body["extension"])) {
		res.status(400).json({ message: "The extension is missing or has invalid format." });
		return;
	}

	let sql_change = "UPDATE course_" + res.locals["course_id"] + ".group SET extension = ($1) WHERE group_id = ($2) RETURNING task";

	client.query(sql_change, [req.body["extension"], req.body["group_id"]], (err, pg_res_update) => {
		if (err) {
			res.status(404).json({ message: "Unknown error." });
			console.log(err);
		} else {
			if (pg_res_update.rowCount === 1) {
				res.status(200).json({ message: "The extension is changed." });

				let subject = "IBS Extension Confirmation";
				let body = "Your extension request for " + pg_res_update.rows[0]["task"] + " has been approved. The due date is extended by " + req.body["extension"] + " minutes. Please check IBS for details.";
				helpers.send_email_by_group(res.locals["course_id"], req.body["group_id"], subject, body);
			} else {
				res.status(400).json({ message: "The group id doesn't exist." });
			}
		}
	});
})

module.exports = router;