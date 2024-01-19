const express = require('express');
const bcrypt = require('bcryptjs');
const router = express.Router();
const helpers = require('../../../utilities/helpers');
const User = require('../../../models/user');
const { CourseRole, Course } = require('../../../models');


router.post('/', async (req, res) => {
    const { username, password } = req.body;

    if (!username || username === '') {
        return res.status(400).json({ message: 'Your username is missing.' });
    }
    if (!password || password === '') {
        return res.status(400).json({ message: 'Your password is missing.' });
    }

    try {
        const user = await User.findOne({ where: { username: username.toLowerCase() } });

        if (!user) {
            return res.status(401).json({ message: 'Your username or password is incorrect.' });
        }

        const passwordIsValid = bcrypt.compareSync(password, user.password);

        if (!passwordIsValid) {
            return res.status(401).json({ message: 'Your username or password is incorrect.' });
        }

        // Fetch roles and course details using Sequelize
        const roles = await CourseRole.findAll({
            where: { username: username.toLowerCase() },
            include: [{
                model: Course,
                as: 'Course', // This should match the alias defined in the association
                where: { hidden: false },
                attributes: ['course_id', 'course_code', 'course_session']
            }]
        });
        const rolesMap = roles.reduce((acc, role) => {
            // acc[role.Course.course_id] = {
            //     role: role.role,
            //     course_code: role.Course.course_code,
            //     course_session: role.Course.course_session
            // };
            acc[role.Course.course_id] = role.role;
            return acc;
        }, {});

        let token = helpers.generateAccessToken(username.toLowerCase(), user.email, user.admin, rolesMap);
        // let token = helpers.generateAccessToken(username.toLowerCase(), user.email, user.admin);

        res.json({
            token: token,
            // roles: Object.values(rolesMap)
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Unknown error.' });
    }
});

module.exports = router;
