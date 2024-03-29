const express = require("express");
const router = express.Router();
const helpers = require("../../../utilities/helpers");

router.post("/", (req, res) => {
	if (!("group_id" in req.body) || helpers.number_validate(req.body["group_id"])) {
		res.status(400).json({ message: "The group id is missing or invalid." });
		return;
	}
	if (!("overwrite" in req.body) || helpers.boolean_validate(req.body["overwrite"])) {
		res.status(400).json({ message: "The overwrite property is missing or invalid." });
		return;
	}

	if (req.body["overwrite"] === true || req.body["overwrite"] === "true") {
		var overwrite = true;
	} else {
		var overwrite = false;
	}

	helpers.collect_one_submission(res.locals["course_id"], req.body["group_id"], overwrite).then(result => {
		res.status(200).json({ result: result });
	});
})

module.exports = router;