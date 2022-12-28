const express = require("express");
const router = express.Router();
const client = require("../../../setup/db");
const helpers = require("../../../utilities/helpers");

router.post("/", (req, res) => {
	if (!("group_id" in req.body) || helpers.number_validate(req.body["group_id"])) {
		res.status(400).json({ message: "The group id is missing or invalid." });
		return;
	}

	helpers.collect_submissions(res.locals["course_id"], req.body["group_id"]).then(result => {
		res.status(200).json({ message: "ok", result: result });
	});
})

module.exports = router;