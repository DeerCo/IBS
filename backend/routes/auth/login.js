const express = require("express");
const router = express.Router();
const rate_limit = require("../../setup/rate_limit");
const helpers = require("../../utilities/helpers");
const client = require("../../setup/db"); 

router.post("/login", rate_limit.general_limiter, (req, res) => {
    if (!("username" in req.body) || req.body["username"] === "") {
        res.status(400).json({ message: "Your username is missing." });
        return;
    }
    if (!("password" in req.body) || req.body["password"] === "") {
        res.status(400).json({ message: "Your password is missing." });
        return;
    }
    client.query("SELECT * FROM user_info WHERE username = ($1) AND password = ($2)", [req.body["username"], req.body["password"]], (err, pgRes) => {
        if (err) {
            res.status(404).json({ message: "Unknown error." });
            console.log(err);
        } else {
            if (pgRes.rowCount === 0) {
                res.status(401).json({ message: "Your username or password is incorrect." });
            } else {
                res.json({ token: helpers.generateAccessToken(req.body["username"]) });
            }
        }
    });
})

module.exports = router;