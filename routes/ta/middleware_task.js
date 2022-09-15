const express = require("express");
const router = express.Router();

router.use("/:task", function (req, res, next) {
	if (req.params["task"] === res.locals["ta_data"]["task"]) {
		res.locals["ta"] = res.locals["ta_data"]["ta"];
		next();
	} else {
		res.status(400).json({ message: "Task is invalid." });
	}
})

module.exports = router;