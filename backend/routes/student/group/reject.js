const express = require("express");
const router = express.Router();
const client = require("../../../setup/db");
const helpers = require("../../../utilities/helpers");

router.delete("/reject", (req, res) => {
	if (!("group_id" in req.body) || helpers.number_validate(req.body["group_id"])) {
        res.status(400).json({ message: "The group id is missing or invalid." });
        return;
    }

	let sql_reject = "DELETE FROM course_" + res.locals["course_id"] + ".course_group_user WHERE username = ($1) AND group_id = ($2) AND status = 'pending'";

	client.query(sql_reject, [res.locals["username"], req.body["group_id"]], (err, pgRes) => {
		if (err) {
			res.status(404).json({ message: "Unknown error." });
			console.log(err);
		} else if (pgRes.rowCount === 1) {
			res.status(200).json({ message: "You have rejected the invitation." });
		} else if (pgRes.rowCount === 0) {
			res.status(400).json({ message: "Invitation doesn't exist." });
		}
    });
})

module.exports = router;