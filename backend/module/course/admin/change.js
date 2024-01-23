const express = require('express');
const router = express.Router();
const helpers = require('../../../utilities/helpers');
const { Course } = require('../../../models');

router.put('/', async (req, res) => {
    try {
        const { course_id, course_code, course_session, gitlab_group_id, default_token_count, token_length, hidden } = req.body;

        // Validate the input data
        if (!course_id || helpers.number_validate(course_id)) {
            return res.status(400).json({ message: 'The course id is missing or has invalid format.' });
        }
        if (!course_code || helpers.name_validate(course_code)) {
            return res.status(400).json({ message: 'The course code is missing or has invalid format.' });
        }
        // ... other validations

        // Update the course
        const [updatedRows] = await Course.update({
            course_code,
            course_session,
            gitlab_group_id,
            default_token_count,
            token_length,
            hidden
        }, {
            where: { course_id },
        });

        if (updatedRows === 0) {
            return res.status(400).json({ message: 'The course id is invalid.' });
        }

        return res.status(200).json({ message: 'The course is changed.' });

    } catch (error) {
        if (error.name === 'SequelizeUniqueConstraintError') {
            if (error.fields.course_code && error.fields.course_session) {
                return res.status(409).json({
                    message: 'The course must have unique course code and session.'
                });
            } else if (error.fields.gitlab_group_id) {
                return res.status(409).json({ message: 'The course must have unique Gitlab group id.' });
            }
        }

        console.error(error);
        res.status(500).json({ message: 'Unknown error.' });
    }
});

module.exports = router;
