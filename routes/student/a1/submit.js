const express = require("express");
const router = express.Router();
const rate_limit = require("../../../setup/rate_limit");

router.post("/submit", rate_limit.general_limiter, (req, res) => {
    if (!("email" in req.body)) {
        res.json({ message: "Something is wrong!" })
    }
    if (!("feedback" in req.body)) {
        res.json({ message: "Something is wrong!" })
    }
    if (req.files.length === 0 || !("originalname" in req.files[0])) {
        res.json({ message: "Something is wrong!" })
    }
    if (!("consent" in req.body)) {
        res.json({ message: "Something is wrong!" })
    }
    res.json({ email: req.body["email"], feedback: req.body["feedback"], attachments: req.files[0]["originalname"], consent: req.body["consent"] });
})

module.exports = router;