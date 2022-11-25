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

	let sql_select_user = "SELECT * FROM course_" + res.locals["course_id"] + ".group_user WHERE group_id = ($1) AND username = ($2) AND status = 'confirmed'";
	let sql_select_group = "SELECT * FROM course_" + res.locals["course_id"] + ".group WHERE group_id = ($1)";
	let sql_invite = "INSERT INTO course_" + res.locals["course_id"] + ".group_user (task, username, group_id, status) VALUES (($1), ($2), ($3), 'pending')";

	client.query(sql_select_user, [req.body["group_id"], res.locals["username"]], (err, pgRes) => {
		if (err) {
			res.status(404).json({ message: "Unknown error." });
			console.log(err);
			return;
		} else if (pgRes.rowCount !== 1) {
			res.status(403).json({ message: "You don't have access to invite." });
			return;
		}

		client.query(sql_select_group, [req.body["group_id"]], (err, pgRes) => {
			if (err) {
				res.status(404).json({ message: "Unknown error." });
				console.log(err);
			} else if (pgRes.rowCount === 1) {
				let task = pgRes.rows[0]["task"];
				client.query(sql_invite, [task, req.body["username"], req.body["group_id"]], (err, pgRes) => {
					if (err) {
						if (err.code === "23503" && err.constraint === "username") {
							res.status(400).json({ message: "The username is not found in the database." });
						} else if (err.code === "23505") {
							res.status(409).json({ message: "The user has joined a group or been invited by another group." });
						} else {
							res.status(404).json({ message: "Unknown error." });
							console.log(err);
						}
					} else if (pgRes.rowCount === 1) {
						res.status(200).json({ message: "User has been invited." });
					}
				});
			} else {
				res.status(400).json({ message: "The group id is not found in the database." });
			}
		});
	});
})

module.exports = router;