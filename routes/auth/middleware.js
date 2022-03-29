const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const constants = require("../../setup/constants");
const helpers = require("../../utilities/helpers");

router.use("/:task", function(req, res, next) {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if (!(req.params["task"] in constants.tasks) || !constants.tasks[req.params["task"]]["open_student"]) {
        res.status(406).json({ message: "Task is invalid." });
        return;
    }

    if (token == null) {
        res.status(401).json({ message: "You need to provide a valid token." });
        return;
    }

    jwt.verify(token, process.env.TOKEN_SECRET, (err, token_data) => {
        if (err) {
            res.status(403).json({ message: "Your token is invalid. Please generate a new one." });
            return;
        }

        helpers.get_group_information(token_data["user_id"], constants.tasks[req.params["task"]]["markus_id"]).then(data => {
            if (data["status"]) {
                if (data["group"] === "") {
                    res.status(406).json({ message: "You are not currently in a group." });
                } else {
                    let group_emails = "";

                    for (let user of data["users"]) {
                        if (group_emails === "") {
                            group_emails += user["email"];
                        } else {
                            group_emails = group_emails + ", " + user["email"];
                        }
                    }

                    res.locals["user_email"] = token_data["email"];
                    res.locals["group"] = data["group"];
                    res.locals["group_emails"] = group_emails;
                    next();
                }
            } else {
                res.status(404).json({ message: "Unknown error." });
            }
        });
    })
})

module.exports = router;