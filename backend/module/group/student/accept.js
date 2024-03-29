const express = require("express");
const router = express.Router();
const client = require("../../../setup/db");
const helpers = require("../../../utilities/helpers");

router.put("/", (req, res) => {
	if (res.locals["change_group"] === false || (res.locals["interview_group"] !== "" && res.locals["interview_group"] !== null)) {
		res.status(400).json({ message: "Changing group is not allowed for this task." });
		return;
	}
	if (res.locals["task"] === "") {
		res.status(400).json({ message: "The task is missing or invalid." });
		return;
	}

	let sql_accept = "UPDATE course_" + res.locals["course_id"] + ".group_user SET status = 'confirmed' WHERE username = ($1) AND task = ($2) AND status = 'pending' RETURNING group_id";

	client.query(sql_accept, [res.locals["username"], res.locals["task"]], (err, pgRes) => {
		if (err) {
			res.status(404).json({ message: "Unknown error." });
			console.log(err);
		} else if (pgRes.rowCount === 1) {
			let group_id = pgRes.rows[0]["group_id"];
			helpers.gitlab_add_user_without_gitlab_group_id(res.locals["course_id"], group_id, res.locals["username"]).then(result => {
				if (result["success"] === true) {
					let message = "User has been added to the group.";
					res.status(200).json({ message: message, group_id: group_id, gitlab_url: result["gitlab_url"] });
				} else if (result["code"] === "project_not_exist") {
					res.status(404).json({ message: "A Gitlab project wasn't created for this group. Please contact system admin." });
				} else if (result["code"] === "failed_add_user") {
					res.status(404).json({ message: "Unable to add the user to the Gitlab project. Please contact system admin." });
				} else if (result["code"] === "gitlab_invalid_username") {
					res.status(404).json({ message: "User cannot be found on Gitlab. Please contact system admin to be added to Gitlab." });
				} else {
					res.status(404).json({ message: "Unknown error. Please contact system admin." });
				}
			});
		} else if (pgRes.rowCount === 0) {
			res.status(400).json({ message: "Invitation doesn't exist." });
		}
	});
})

module.exports = router;