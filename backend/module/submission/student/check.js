const express = require("express");
const router = express.Router();
const client = require("../../../setup/db");
const helpers = require("../../../utilities/helpers");

router.get("/", (req, res) => {
	helpers.get_group_id(res.locals["course_id"], res.locals["task"], res.locals["username"]).then(group_id => {
		if (group_id === -1) {
			res.status(400).json({ message: "You need to join a group before checking your submission." });
			return;
		}

		helpers.get_submission_before_due_date(res.locals["course_id"], group_id).then(result => {
			let sql_criteria = "SELECT commit_id, token_used FROM course_" + res.locals["course_id"] + ".submission WHERE group_id = ($1)";
			client.query(sql_criteria, [group_id], (err_collected, pg_res_collected) => {
				if (err_collected) {
					res.status(404).json({ message: "Unknown error." });
				} else if (pg_res_collected.rowCount === 0) {
					res.status(200).json({ before_due_date: result });
				} else {
					res.status(200).json({ before_due_date: result, collected: pg_res_collected.rows[0] });
				}
			});
		});
	});
})

module.exports = router;