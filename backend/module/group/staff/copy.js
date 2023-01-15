const express = require("express");
const router = express.Router();
const helpers = require("../../../utilities/helpers");

router.post("/", (req, res) => {
	if (!("from_task" in req.body) || helpers.name_validate(req.body["from_task"])) {
		res.status(400).json({ message: "The from task is missing or has invalid format." });
		return;
	}
	if (!("to_task" in req.body) || helpers.name_validate(req.body["to_task"])) {
		res.status(400).json({ message: "The to task is missing or has invalid format." });
		return;
	}

	helpers.copy_groups(res.locals["course_id"], req.body["from_task"], req.body["to_task"]).then(results => {
		if (results.length === 0) {
			res.status(200).json({ message: "Groups have been copied successfully." });
		} else {
			res.status(404).json({ message: "Some groups cannot be copied.", details: results });
		}
	});
})

module.exports = router;