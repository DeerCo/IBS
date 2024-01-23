const express = require("express");
const router = express.Router();
const helpers = require("../../../utilities/helpers");
const rate_limit = require("../../../setup/rate_limit");
const { User, UserVerification } = require("../../../models"); // Adjust the path as per your project structure

router.post("/", rate_limit.email_limiter, async (req, res) => {
    const username = req.body.username;

    if (!username || username === "") {
        return res.status(400).json({ message: "Your username is missing." });
    }

    try {
        const user = await User.findOne({ where: { username: username.toLowerCase() } });

        if (user) {
            const code = Math.floor(100000 + Math.random() * 900000).toString();
            const existingVerification = await UserVerification.findOne({ where: { username: username.toLowerCase() } });

            if (existingVerification) {
                // Update existing record
                await existingVerification.update({ code: code, created_at: new Date() });
            } else {
                // Create new record
                await UserVerification.create({ username: username.toLowerCase(), code: code, created_at: new Date() });
            }

            helpers.send_email(user.email, "IBS Password Reset Request",
                "We received a request to reset your password. If this was you, please enter code " + code + ". The code will expire in 5 minutes.");
        }

        res.status(200).json({ message: "An email has been sent if the username is valid." });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Unknown error." });
    }
});

module.exports = router;
