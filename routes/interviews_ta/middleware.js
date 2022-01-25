const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const rate_limit = require("../../setup/rate_limit");

router.use("/", rate_limit.interviews_limiter, function (req, res, next) {
	const authHeader = req.headers["authorization"];
	const token = authHeader && authHeader.split(" ")[1];
	if (token == null) {
		res.status(401).json({ message: "You need to provide a valid token." });
	} else {
		jwt.verify(token, process.env.TOKEN_SECRET, (err, ta_data) => {
			if (err) {
				res.status(401).json({ message: "Your token is invalid. Please generate a new one." });
			} else {
				if (ta_data.type !== "ta") {
					res.status(403).json({ message: "You are not authorized to access." });
				} else {
					res.locals["ta_data"] = ta_data;
					next();
				}
			}
		})
	}
})

module.exports = router;