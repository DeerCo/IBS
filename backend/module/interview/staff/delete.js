const express = require("express");
const router = express.Router();
const client = require("../../../setup/db");
const helpers = require("../../../utilities/helpers");

router.delete("/", (req, res) => {
	if (res.locals["task"] === "") {
        res.status(400).json({ message: "The task is missing or invalid." });
        return;
    }
	if (!("interview_id" in req.body) || isNaN(req.body["interview_id"]) || req.body["interview_id"].trim() === "") {
		res.status(404).json({ message: "The interview id is missing or has invalid format." });
		return;
	}

	let sql_delete = "DELETE FROM course_" + res.locals["course_id"] + ".interview WHERE task = ($1) AND host = ($2) AND group_id IS NULL AND interview_id = ($3)";
	client.query(sql_delete, [res.locals["task"], res.locals["username"], req.body["interview_id"]], (err, pgRes) => {
		if (err) {
			res.status(404).json({ message: "Unknown error." });
		} else {
			let message = pgRes.rowCount + " row has been deleted.";
			res.status(200).json({ message: message });
		}
	});
})

module.exports = router;