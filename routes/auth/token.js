const express = require("express");
const router = express.Router();
const rate_limit = require("../../setup/rate_limit");
const helpers = require("../../utilities/helpers");

router.post("/token", rate_limit.token_limiter, (req, res) => {
    if (!("utorid" in req.body) || helpers.name_validate(req.body["utorid"])) {
        res.status(400).json({ message: "Your utorid is missing or has invalid format." });
        return;
    }

    helpers.get_user_information(req.body["utorid"]).then(data => {
        if (data["status"]) {
            if (Object.keys(data["user"]).length === 0) {
                res.status(406).json({ message: "The provided utorid is invalid." });
            } else {
                const token = helpers.generateAccessToken({ user_id: data["user"]["id"], user_name: req.body["utorid"], email: data["user"]["email"], type: "student" });
                res.status(200).json({ message: "Your token has been sent to your email." });
                helpers.send_email(data["user"]["email"], "Your CSC309 Token", token);
            }
        } else {
            res.status(404).json({ message: "Unknown error." });
        }
    });
})

module.exports = router;