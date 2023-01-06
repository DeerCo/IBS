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

	let sql_select_users = "SELECT * FROM course_" + res.locals["course_id"] + ".group_user WHERE group_id = ($1)";
	let sql_select_max_member = "SELECT max_member FROM course_" + res.locals["course_id"] + ".task WHERE task = ($1)";
	let sql_invite = "INSERT INTO course_" + res.locals["course_id"] + ".group_user (task, username, group_id, status) VALUES (($1), ($2), ($3), 'pending')";

	client.query(sql_select_users, [req.body["group_id"]], (err_select_users, pg_res_select_users) => {
		if (err_select_users) {
			res.status(404).json({ message: "Unknown error." });
			return;
		}

		let has_access = false;
		for (let row of pg_res_select_users.rows){
			if (row["username"] === res.locals["username"] && row["status"] === "confirmed"){
				has_access = true;
			}
		}
		if (!has_access){
			res.status(400).json({ message: "You don't have access to invite." });
			return;
		}

		let task = pg_res_select_users.rows[0]["task"];
		client.query(sql_select_max_member, [task], (err_max_member, pg_res_max_member) => {
			if (err_max_member) {
				res.status(404).json({ message: "Unknown error." });
				return;
			}

			let max_member = pg_res_max_member.rows[0]["max_member"];
			if (pg_res_select_users.rowCount >= max_member){
				res.status(400).json({ message: "No more user can be invited as the maximum has been reached." });
				return;
			}

			client.query(sql_invite, [task, req.body["username"], req.body["group_id"]], (err_invite, pg_res_invite) => {
				if (err_invite) {
					if (err_invite.code === "23503" && err_invite.constraint === "username") {
						res.status(400).json({ message: "The username is not found in the database." });
					} else if (err_invite.code === "23505") {
						res.status(409).json({ message: "The user has joined a group or been invited by another group." });
					} else {
						res.status(404).json({ message: "Unknown error." });
						console.log(err_invite);
					}
				} else {
					res.status(200).json({ message: "User has been invited." });
				}
			});
		});
	});
})

module.exports = router;