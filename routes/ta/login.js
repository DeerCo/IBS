const express = require("express");
const router = express.Router();
const constants = require("../../setup/constants");
const rate_limit = require("../../setup/rate_limit");
const helpers = require("../../utilities/helpers");
const client = require("../../setup/db");

router.post("/:task/login", rate_limit.general_limiter, (req, res) => {
    if (!("username" in req.body) || req.body["username"] === "") {
        res.status(400).json({ message: "Your username is missing." });
        return;
    }
    if (!("password" in req.body) || req.body["password"] === "") {
        res.status(400).json({ message: "Your password is missing." });
        return;
    }
    if (!("task" in req.body) || req.body["task"] === "" || !(req.body["task"] in constants.tasks) || !constants.tasks[req.body["task"]]["open_ta"]) {
        res.status(400).json({ message: "Your task is missing or invalid." });
        return;
    }

    client.query("SELECT * FROM ta WHERE username = ($1) AND password = ($2)", [req.body["username"], req.body["password"]], (err, pgRes) => {
        if (err) {
            res.status(404).json({ message: "Unknown error." });
        } else {
            if (pgRes.rowCount === 0) {
                res.status(401).json({ message: "Your username or password is incorrect." });
            } else if (pgRes.rowCount > 1) {
                res.status(404).json({ message: "Unknown error." });
            } else {
                res.json({ token: helpers.generateTaAccessToken(req.body["username"], req.body["task"]) });
            }
        }
    });
})

module.exports = router;