const express = require("express");
const router = express.Router();
const client = require("../../../setup/db");
const helpers = require("../../../utilities/helpers");

router.post("/", (req, res) => {
	if (!("group_id" in req.body) || helpers.number_validate(req.body["group_id"])) {
		res.status(400).json({ message: "The group id missing or has invalid format." });
		return;
	}
	if (!("commit_id" in req.body) || helpers.string_validate(req.body["commit_id"])) {
		res.status(400).json({ message: "The commit id is missing or has invalid format." });
		return;
	}
	if (!("token_used" in req.body) || helpers.number_validate(req.body["token_used"])) {
		res.status(400).json({ message: "The token used is missing or has invalid format." });
		return;
	}

	helpers.get_group_task(res.locals["course_id"], req.body["group_id"]).then(task => {
		if (task === "") {
			res.status(400).json({ message: "The group id is not found in the database." });
			return;
		}

		let sql_add_submission = "INSERT INTO course_" + res.locals["course_id"] + ".submission (task, group_id, commit_id, token_used) VALUES (($1), ($2), ($3), ($4))  ON CONFLICT (group_id) DO UPDATE SET commit_id = EXCLUDED.commit_id, token_used = EXCLUDED.token_used";
		let sql_add_submission_data = [task, req.body["group_id"], req.body["commit_id"], req.body["token_used"]];

		client.query(sql_add_submission, sql_add_submission_data, (err, pgRes) => {
			if (err) {
				res.status(404).json({ message: "Unknown error." });
				console.log(err);
			} else {
				res.status(200).json({ message: "The submission is added." });
			}
		});
	});
})

module.exports = router;