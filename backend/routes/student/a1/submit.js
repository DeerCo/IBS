const express = require("express");
const router = express.Router();
const multer = require('multer');
const rate_limit = require("../../../setup/rate_limit");

const upload = multer({
    dest: './tmp/upload/',
    limits: { fileSize: 1024 }
});

router.post("/submit", rate_limit.upload_limiter, upload.any(), (req, res) => {
    if (!("email" in req.body)) {
        res.status(400).json({ message: "Something is wrong!" })
    } else if (!("feedback" in req.body)) {
        res.status(400).json({ message: "Something is wrong!" })
    } else if (!("files" in req) || req.files.length !== 1 || (req.files[0]["fieldname"] != "attachments") || !("originalname" in req.files[0])) {
        res.status(400).json({ message: "Something is wrong!" })
    } else if (!("consent" in req.body)) {
        res.status(400).json({ message: "Something is wrong!" })
    } else {
        res.json({ email: req.body["email"], feedback: req.body["feedback"], attachments: req.files[0]["originalname"], consent: req.body["consent"] });
    }
})

module.exports = router;