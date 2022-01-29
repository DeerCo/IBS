const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");

router.use("/:task", function (req, res, next) {
	const authHeader = req.headers["authorization"];
	const token = authHeader && authHeader.split(" ")[1];
	if (req.params["task"] === "token") {
		res.status(400).json({ message: "Task is invalid." });
	} else if (token == null) {
		res.status(401).json({ message: "You need to provide a valid token." });
	} else {
		jwt.verify(token, process.env.TOKEN_SECRET, (err, group_data) => {
			if (err) {
				res.status(403).json({ message: "Your token is invalid. Please generate a new one." });
			} else {
				if (req.params["task"] === group_data["task"]) {
					res.locals["group"] = group_data["group"];
					res.locals["email"] = group_data["email"];
					next();
				} else {
					res.status(400).json({ message: "Your token is invalid or is for another task." });
				}
			}
		})
	}
})

module.exports = router;