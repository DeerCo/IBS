const express = require("express");
const router = express.Router();
const { Course } = require("../../../models"); // Adjust the path to your Course model
const adminMiddleware = require("../../auth/admin/middleware"); // Path to your admin middleware
const helpers = require("../../../utilities/helpers");

router.get("/", adminMiddleware, async (req, res) => {
    if (!("course_id" in req.query) || helpers.number_validate(req.query["course_id"])) {
        return res.status(400).json({ message: "The course id is missing or has invalid format." });
    }

    try {
        const course = await Course.findOne({
            where: { course_id: req.query["course_id"] }
        });

        if (course) {
            res.status(200).json({ message: "Course details are returned.", course: course.get({ plain: true }) });
        } else {
            res.status(400).json({ message: "The course id is invalid." });
        }
    } catch (err) {
        console.error(err);
        res.status(404).json({ message: "Unknown error." });
    }
});

module.exports = router;
