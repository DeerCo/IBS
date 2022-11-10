const express = require("express");
const router = express.Router();
const client = require("../../../setup/db");
const helpers = require("../../../utilities/helpers");

router.delete("/", (req, res) => {
	if (!("group_id" in req.body) || helpers.number_validate(req.body["group_id"])) {
        res.status(400).json({ message: "The group id is missing or invalid." });
        return;
    }

	let sql_leave = "DELETE FROM course_" + res.locals["course_id"] + ".group_user WHERE username = ($1) AND group_id = ($2)";
	let sql_select= "SELECT * FROM course_" + res.locals["course_id"] + ".group_user WHERE group_id = ($1)";
	let sql_delete = "DELETE FROM course_" + res.locals["course_id"] + ".group WHERE group_id = ($1)";

	client.query(sql_leave, [res.locals["username"], req.body["group_id"]], (err, pgRes) => {
		if (err) {
			res.status(404).json({ message: "Unknown error." });
			console.log(err);
		} else {
			client.query(sql_select, [req.body["group_id"]], (err, pgRes) => {
				if (err) {
					res.status(404).json({ message: "Unknown error." });
					console.log(err);
				} else if (pgRes.rowCount === 0) {
					client.query(sql_delete, [req.body["group_id"]]);
				}
			});
			if (pgRes.rowCount === 1){
				res.status(200).json({ message: "You have left the group." });
			} else {
				res.status(400).json({ message: "You were not in the group." });
			}
		}
    });
})

module.exports = router;