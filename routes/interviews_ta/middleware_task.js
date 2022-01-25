const express = require("express");
const router = express.Router();
const constants = require("../../setup/constants");

router.use("/:task", function (req, res, next) {
	const authHeader = req.headers["authorization"];
	const token = authHeader && authHeader.split(" ")[1];
	if (token == null) {
		res.status(401).json({ message: "You need to provide a valid token." });
	} else {
		if (constants.tasks[req.params["task"]]["open"] && req.params["task"] === res.locals["ta_data"]["task"]) {
			res.locals["ta"] = res.locals["ta_data"]["ta"];
			next();
		} else {
			res.status(400).json({ message: "Task is invalid." });
		}
	}
})

module.exports = router;