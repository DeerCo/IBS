const express = require("express");
const router = express.Router();
const constants = require("../../setup/constants");
const rate_limit = require("../../setup/rate_limit");
const helpers = require("../../utilities/helpers");
const client = require("../../setup/db");

router.put("/password", rate_limit.general_limiter, (req, res) => {
    if (!("password1" in req.body) || req.body["password1"] === "") {
        res.status(400).json({ message: "Your password is missing." });
        return;
    }

    if (!("password2" in req.body) || req.body["password2"] === "") {
        res.status(400).json({ message: "Your password is missing." });
        return;
    }

    if (req.body["password1"] !== req.body["password2"]) {
        res.status(400).json({ message: "Your passwords don't match." });
        return;
    }

    client.query("UPDATE ta SET password = ($1) WHERE username = ($2)", [req.body["password1"], res.locals["ta_data"]["ta"]], (err, pgRes) => {
        if (err) {
            res.status(404).json({ message: "Unknown error." });
        } else {
            if (pgRes.rowCount !== 1) {
                res.status(401).json({ message: "Unknown error." });
            } else {
                res.status(200).json({ message: "Your password is changed." });
            }
        }
    });
})

module.exports = router;