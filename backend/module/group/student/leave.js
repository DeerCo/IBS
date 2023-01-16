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

	let sql_leave = "DELETE FROM course_" + res.locals["course_id"] + ".group_user WHERE username = ($1) AND task = ($2) RETURNING group_id";

	client.query(sql_leave, [res.locals["username"], res.locals["task"]], (err, pr_res_leave) => {
		if (err) {
			res.status(404).json({ message: "Unknown error." });
			console.log(err);
		} else {
			if (pr_res_leave.rowCount === 1) {
				let group_id = pr_res_leave.rows[0]["group_id"];
				helpers.gitlab_remove_user(res.locals["course_id"], group_id, res.locals["username"]);
				res.status(200).json({ message: "You have left the group." });
			} else {
				res.status(400).json({ message: "You were not in the group." });
			}
		}
	});
})

module.exports = router;