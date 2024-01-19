const express = require("express");
const router = express.Router();
const { Course } = require("../../../models"); // Adjust the path to your Course model
const helpers = require("../../../utilities/helpers");
const adminMiddleware = require("../../auth/admin/middleware"); // Path to your admin middleware

router.post("/", adminMiddleware, async (req, res) => {
    // Validation for input data
    if (!("course_code" in req.body) || helpers.name_validate(req.body["course_code"])) {
        return res.status(400).json({ message: "The course code is missing or has invalid format." });
    }
    if (!("course_session" in req.body) || helpers.string_validate(req.body["course_session"])) {
        return res.status(400).json({ message: "The course session is missing or has invalid format." });
    }

    // Additional fields processing
    const hidden = req.body["hidden"] === true || req.body["hidden"] === "true";
    const defaultTokenCount = "default_token_count" in req.body ? parseInt(req.body["default_token_count"], 10) : 0;
    const tokenLength = "token_length" in req.body ? parseInt(req.body["token_length"], 10) : 0;
    const gitlabGroupId = "gitlab_group_id" in req.body && !helpers.number_validate(req.body["gitlab_group_id"]) ? req.body["gitlab_group_id"] : null;

    try {
        const newCourse = await Course.create({
            course_code: req.body["course_code"],
            course_session: req.body["course_session"],
            gitlab_group_id: gitlabGroupId,
            default_token_count: defaultTokenCount,
            token_length: tokenLength,
            hidden: hidden
        });

        return res.status(200).json({
            message: "The course is added and the course specific tables have been created.",
            course_id: newCourse.course_id
        });
    } catch (err) {
        if (err.name === 'SequelizeUniqueConstraintError') {
            if (err.fields.course_code && err.fields.course_session) {
                return res.status(409).json({ message: "The course must have unique course code and session." });
            } else if (err.fields.gitlab_group_id) {
                return res.status(409).json({ message: "The course must have unique Gitlab group id." });
            }
        }
        console.error(err);
        return res.status(404).json({ message: "Unknown error." });
    }
});

module.exports = router;
