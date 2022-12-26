const express = require("express");
const router = express.Router();
const client = require("../../../setup/db");
const helpers = require("../../../utilities/helpers");

router.get("/", (req, res) => {
	if (res.locals["task"] === "") {
        res.status(400).json({ message: "The task is missing or invalid." });
        return;
    }

	let sql_select_group = "SELECT * FROM course_" + res.locals["course_id"] + ".group_user WHERE username = ($1) AND task = ($2)";
	let sql_select_members = "SELECT username, status FROM course_" + res.locals["course_id"] + ".group_user WHERE group_id = ($1)";
	let sql_select_gitlab_url = "SELECT * FROM course_" + res.locals["course_id"] + ".group WHERE group_id = ($1)";

	client.query(sql_select_group, [res.locals["username"], res.locals["task"]], (err, pg_res_group) => {
		if (err) {
			res.status(404).json({ message: "Unknown error." });
			console.log(err);
		} else if (pg_res_group.rowCount === 1) {
			let group_id = pg_res_group.rows[0]["group_id"];
			client.query(sql_select_members, [group_id], (err, pg_res_members) => {
				if (err) {
					res.status(404).json({ message: "Unknown error." });
					console.log(err);
				} else {
					client.query(sql_select_gitlab_url, [group_id], (err, pg_res_url) => {
						if (err) {
							res.status(404).json({ message: "Unknown error." });
							console.log(err);
						} else{
							if (pg_res_group.rows[0]["status"] === "pending"){
								let message = "You have been invited to join a group.";
								res.status(200).json({ message: message, group_id: group_id, members: pg_res_members.rows });
							} else{
								let gitlab_url = pg_res_url.rows[0]["gitlab_url"];
								let message = "You have joined a group.";
								res.status(200).json({ message: message, group_id: group_id, members: pg_res_members.rows, gitlab_url: gitlab_url });
							}
						}
					});
				}
			});
		} else if (pg_res_group.rowCount === 0) {
			res.status(200).json({ message: "You are not in a group." });
		}
    });
})

module.exports = router;