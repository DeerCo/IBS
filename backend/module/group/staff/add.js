const express = require("express");
const router = express.Router();
const client = require("../../../setup/db");
const helpers = require("../../../utilities/helpers");

router.post("/", (req, res) => {
	if (!("group_id" in req.body) || helpers.number_validate(req.body["group_id"])) {
		res.status(400).json({ message: "The group id is missing or invalid." });
		return;
	}
	if (!("username" in req.body) || helpers.name_validate(req.body["username"])) {
		res.status(400).json({ message: "The username is missing or has invalid format." });
		return;
	}

	let sql_select_group = "SELECT * FROM course_" + res.locals["course_id"] + ".group WHERE group_id = ($1)";
	let sql_add = "INSERT INTO course_" + res.locals["course_id"] + ".group_user (task, username, group_id, status) VALUES (($1), ($2), ($3), 'confirmed')";

	client.query(sql_select_group, [req.body["group_id"]], (err_select_group, pg_res_select_group) => {
		if (err_select_group) {
			res.status(404).json({ message: "Unknown error." });
			console.log(err_add);
		} else {
			if (pg_res_select_group.rowCount !== 1) {
				res.status(400).json({ message: "The group id is not found in the database." });
			} else {
				client.query(sql_add, [pg_res_select_group.rows[0]["task"], req.body["username"], req.body["group_id"]], (err_add, pg_res_add) => {
					if (err_add) {
						if (err_add.code === "23503" && err_add.constraint === "username") {
							res.status(400).json({ message: "The username is not found in the database." });
						} else if (err_add.code === "23505") {
							res.status(409).json({ message: "The user has joined a group or been invited by another group. Please remove them from the existing group first." });
						} else {
							res.status(404).json({ message: "Unknown error." });
							console.log(err_add);
						}
					} else {
						helpers.gitlab_add_user_without_gitlab_group_id(res.locals["course_id"], req.body["group_id"], req.body["username"]).then(result => {
							if (result["success"] === true) {
								let message = "User has been added to the group.";
								res.status(200).json({ message: message, group_id: req.body["group_id"], gitlab_url: result["gitlab_url"] });
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
					}
				});
			}
		}
	});
})

module.exports = router;