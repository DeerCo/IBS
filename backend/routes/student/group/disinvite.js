const express = require("express");
const router = express.Router();
const client = require("../../../setup/db");
const helpers = require("../../../utilities/helpers");

router.delete("/disinvite", (req, res) => {
	if (!("group_id" in req.body) || helpers.number_validate(req.body["group_id"])) {
        res.status(400).json({ message: "The group id is missing or invalid." });
        return;
    }
    if (!("username" in req.body) || helpers.name_validate(req.body["username"])) {
        res.status(400).json({ message: "The username is missing or has invalid format." });
        return;
    }

	let sql_select_user = "SELECT * FROM course_" + res.locals["course_id"] + ".group_user WHERE group_id = ($1) AND username = ($2) AND status = 'confirmed'";
	let sql_disinvite = "DELETE FROM course_" + res.locals["course_id"] + ".group_user WHERE group_id = ($1) AND username = ($2) AND status = 'pending'";

	client.query(sql_select_user, [req.body["group_id"], res.locals["username"]], (err, pgRes) => {
		if (err) {
			res.status(404).json({ message: "Unknown error." });
			console.log(err);
			return;
		} else if (pgRes.rowCount !== 1) {
			res.status(403).json({ message: "You don't have access to cancel the invitation." });
			return;
		} else{
			client.query(sql_disinvite, [req.body["group_id"], req.body["username"]], (err, pgRes) => {
				if (err) {
					res.status(404).json({ message: "Unknown error." });
					console.log(err);
				} else if (pgRes.rowCount === 1) {
					res.status(200).json({ message: "You have cancelled the invitation." });
				} else if (pgRes.rowCount === 0) {
					res.status(400).json({ message: "Invitation doesn't exist." });
				}
			});
		}
	});
})

module.exports = router;