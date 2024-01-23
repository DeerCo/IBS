
const express = require("express");
const bcrypt = require("bcryptjs");
const router = express.Router();
const { User } = require("../../../models"); // Adjust the path as per your project structure
const helpers = require("../../../utilities/helpers");

router.post("/", async (req, res) => {
    // Validation checks
    if (!("username" in req.body) || helpers.name_validate(req.body["username"])) {
        return res.status(400).json({ message: "Your username is missing or has invalid format." });
    }

    if (!("password" in req.body) || helpers.password_validate(req.body["password"])) {
        return res.status(400).json({ message: "The password is missing or has invalid format." });
    }

    if (!("email" in req.body) || helpers.email_validate(req.body["email"])) {
        return res.status(400).json({ message: "The email is missing or has invalid format." });
    }

    try {
        // Hash the password
        const hashedPassword = bcrypt.hashSync(req.body.password, 8);

        // Create a new user
        const newUser = await User.create({
            username: req.body.username.toLowerCase(),
            password: hashedPassword,
            email: req.body.email,
            admin: req.body.admin || false // Assuming you have an 'admin' field
        });

        res.status(200).json({ message: "The user is added.", user: newUser });
    } catch (error) {
        if (error.name === 'SequelizeUniqueConstraintError') {
            res.status(409).json({ message: "Username has been taken." });
        } else {
            console.error(error);
            res.status(500).json({ message: "Unknown error." });
        }
    }
});

module.exports = router;
