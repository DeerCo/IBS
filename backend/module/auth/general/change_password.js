const express = require("express");
const router = express.Router();
const bcrypt = require('bcryptjs');
const { Op } = require("sequelize"); // Import Sequelize's Op object
const { User, UserVerification } = require("../../../models"); // Adjust the path as per your project structure

router.post("/", async (req, res) => {
    const { username, password, code } = req.body;

    if (!username || username === "") {
        return res.status(400).json({ message: "Your username is missing." });
    }
    if (!password || password === "") {
        return res.status(400).json({ message: "Your password is missing." });
    }
    if (!code || code === "") {
        return res.status(400).json({ message: "Your verification code is missing." });
    }

    try {
        const userVerification = await UserVerification.findOne({
            where: {
                username: username.toLowerCase(),
                code: code,
                created_at: {
                    [Op.gte]: new Date(new Date() - 5 * 60 * 1000) // 5 minutes ago
                }
            }
        });

        if (!userVerification) {
            return res.status(400).json({ message: "Your username or code is invalid." });
        }

        // Delete the verification code
        await UserVerification.destroy({ where: { username: username.toLowerCase() } });

        // Update the user's password
        const hashedPassword = bcrypt.hashSync(password, 8);
        await User.update({ password: hashedPassword }, { where: { username: username.toLowerCase() } });

        res.status(200).json({ message: "Your password is changed." });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Unknown error." });
    }
});

module.exports = router;
