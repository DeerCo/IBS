const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const constants = require("../../setup/constants");
const rate_limit = require("../../setup/rate_limit");

router.use("/:task", rate_limit.interviews_limiter, function (req, res, next) {
	const authHeader = req.headers["authorization"];
	const token = authHeader && authHeader.split(" ")[1];
	if (token == null) {
		res.status(401).json({ message: "You need to provide a valid token." });
	} else {
		jwt.verify(token, process.env.TOKEN_SECRET, (err, group) => {
			if (err) {
				res.status(403).json({ message: "Your token is invalid. Please generate a new one." });
			} else {
				if (constants.tasks[req.params.task]["open"]) {
					res.locals.group = group.group;
					res.locals.email = group.email;
					next();
				} else {
					res.status(400).json({ message: "Task is invalid." });
				}
			}
		})
	}
})

module.exports = router;