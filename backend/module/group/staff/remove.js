const express = require("express");
const router = express.Router();
const client = require("../../../setup/db");
const helpers = require("../../../utilities/helpers");

router.delete("/", (req, res) => {
	if (!("group_id" in req.body) || helpers.number_validate(req.body["group_id"])) {
		res.status(400).json({ message: "The group id is missing or invalid." });
		return;
	}
	if (!("username" in req.body) || helpers.name_validate(req.body["username"])) {
		res.status(400).json({ message: "The username is missing or has invalid format." });
		return;
	}

	let sql_remove = "DELETE FROM course_" + res.locals["course_id"] + ".group_user WHERE username = ($1) AND group_id = ($2)";
	let sql_select = "SELECT * FROM course_" + res.locals["course_id"] + ".group_user WHERE group_id = ($1)";
	let sql_delete = "DELETE FROM course_" + res.locals["course_id"] + ".group WHERE group_id = ($1)";

	client.query(sql_remove, [req.body["username"], req.body["group_id"]], (err, pr_res_remove) => {
		if (err) {
			res.status(404).json({ message: "Unknown error." });
			console.log(err);
		} else {
			if (pr_res_remove.rowCount === 1) {
				helpers.gitlab_remove_user(res.locals["course_id"], req.body["group_id"], req.body["username"]);
				res.status(200).json({ message: "The student is removed from the group." });
			} else {
				res.status(400).json({ message: "The student was not in the group." });
			}

			// Delete the entire group if the last member is removed
			// client.query(sql_select, [req.body["group_id"]], (err, pg_res_select) => {
			// 	if (err) {
			// 		console.log(err);
			// 	} else if (pg_res_select.rowCount === 0) {
			// 		client.query(sql_delete, [req.body["group_id"]]);
			// 	}
			// });
		}
	});
})

module.exports = router;