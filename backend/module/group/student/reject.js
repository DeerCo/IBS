const express = require("express");
const router = express.Router();
const client = require("../../../setup/db");
const helpers = require("../../../utilities/helpers");

router.delete("/", (req, res) => {
	if (res.locals["change_group"] === false || (res.locals["interview_group"] !== "" && res.locals["interview_group"] !== null)) {
		res.status(400).json({ message: "Changing group is not allowed for this task." });
		return;
	}
	if (res.locals["task"] === "") {
		res.status(400).json({ message: "The task is missing or invalid." });
		return;
	}

	let sql_reject = "DELETE FROM course_" + res.locals["course_id"] + ".group_user WHERE username = ($1) AND task = ($2) AND status = 'pending'";

	client.query(sql_reject, [res.locals["username"], res.locals["task"]], (err, pgRes) => {
		if (err) {
			res.status(404).json({ message: "Unknown error." });
			console.log(err);
		} else if (pgRes.rowCount === 1) {
			res.status(200).json({ message: "You have rejected the invitation." });
		} else if (pgRes.rowCount === 0) {
			res.status(400).json({ message: "Invitation doesn't exist." });
		}
	});
})

module.exports = router;