const express = require('express');
const bcrypt = require('bcryptjs');
const router = express.Router();
const helpers = require('../../../utilities/helpers');
const User = require('../../../models/user'); // Adjust the path as per your project structure

router.post('/', async (req, res) => {
    const { username, password } = req.body;

    // Check if username and password are provided
    if (!username || username === '') {
        return res.status(400).json({ message: 'Your username is missing.' });
    }
    if (!password || password === '') {
        return res.status(400).json({ message: 'Your password is missing.' });
    }

    try {
        // Find the user by username
        const user = await User.findOne({ where: { username: username.toLowerCase()  } });

        // Check if user exists
        if (!user) {
            return res.status(401).json({ message: 'Your username or password is incorrect.' });
        }

        // Compare the provided password with the stored hashed password
        const passwordIsValid = bcrypt.compareSync(password, user.password);

        // Check if password is valid
        if (!passwordIsValid) {
            return res.status(401).json({ message: 'Your username or password is incorrect.' });
        }

        // Generate a token for the authenticated user
        let token = helpers.generateAccessToken(username.toLowerCase(), user.email, user.admin /*, roles */);

        // Respond with token and other user details as needed
        res.json({
            token: token,
            // Include other user details or roles as needed
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Unknown error.' });
    }
});

module.exports = router;
