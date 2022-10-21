const express = require("express");
const router = express.Router();
const rate_limit = require("../../setup/rate_limit");
const helpers = require("../../utilities/helpers");

router.post("/register", rate_limit.token_limiter, (req, res) => {
    if (!("utorid" in req.body) || helpers.name_validate(req.body["utorid"])) {
        res.status(400).json({ message: "Your utorid is missing or has invalid format." });
        return;
    }

;
})

module.exports = router;