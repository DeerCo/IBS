const express = require("express");
const router = express.Router();
const client = require("../../../setup/db");
const helpers = require("../../../utilities/helpers");

router.get("/", (req, res) => {
	if (!("task" in req.query) || helpers.string_validate(req.query["task"])) {
        res.status(400).json({ message: "The course task is missing or invalid." });
        return;
    }

	let sql_select = "SELECT * FROM course_" + res.locals["course_id"] + ".group_user WHERE username = ($1) AND task = ($2)";

	client.query(sql_select, [res.locals["username"], req.query["task"]], (err, pgRes) => {
		if (err) {
			res.status(404).json({ message: "Unknown error." });
			console.log(err);
		} else if (pgRes.rowCount === 1) {
			if (pgRes.rows[0]["status"] === "pending"){
				res.status(200).json({ message: "You have been invited to join a group.", group_id: pgRes.rows[0]["group_id"] });
			} else{
				res.status(200).json({ message: "You have joined a group.", group_id: pgRes.rows[0]["group_id"] });
			}
		} else if (pgRes.rowCount === 0) {
			res.status(200).json({ message: "You are not in a group." });
		}
    });
})

module.exports = router;