const express = require("express");
const router = express.Router();
const constants = require("../../setup/constants");
const rate_limit = require("../../setup/rate_limit");
const helpers = require("../../utilities/helpers");

router.post("/:task/token", rate_limit.interviews_limiter, (req, res) => {
	if (!("group" in req.body) || helpers.name_validate(req.body["group"])) {
		res.status(400).json({ message: "Your group name is missing or has invalid format." });
		return;
	}
	if (!("utorid" in req.body) || helpers.name_validate(req.body["utorid"])) {
		res.status(400).json({ message: "Your utorid is missing or has invalid format." });
		return;
	}
	if (!("student_number" in req.body) || helpers.number_validate(req.body["student_number"])) {
		res.status(400).json({ message: "Your student number is missing or has invalid format." });
		return;
	}
	if (!constants.tasks[req.params["task"]]["open"]) {
		return;
	}

	helpers.get_users_information(req.body["group"], constants.tasks[req.params["task"]]["markus_id"]).then(data => {
		if (data["status"]) {
			if (data["users"].length === 0) {
				res.status(406).json({ message: "The provided group name is invalid." });
			} else {
				let email = "";
				for (let user of data["users"]) {
					if (user["user_name"] === req.body["utorid"] && user["id_number"] === req.body["student_number"]) {
						email = user["email"];
					}
				}
				if (email === "") {
					res.status(406).json({ message: "The provided utorid or student number is invalid." });
				} else {
					const token = helpers.generateAccessToken({ group: req.body["group"], email: email, type: "student", task: req.params["task"] });
					res.send(token);
					// send_email(email, "Your CSC309 Token", token);
				}
			}
		} else {
			res.status(404).json({ message: "Unknown error." });
		}
	});
})

module.exports = router;