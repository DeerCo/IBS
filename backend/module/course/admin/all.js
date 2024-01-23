const express = require("express");
const router = express.Router();
const { Course } = require("../../../models"); // Adjust the path to your Course model
const adminMiddleware = require("../../auth/admin/middleware"); // Path to your admin middleware

router.get("/", adminMiddleware, async (req, res) => {
    try {
        const courses = await Course.getAllCourses({
        });

        res.status(200).json({
            count: courses.length,
            course: courses.map(course => course.get({ plain: true })) // Convert Sequelize instances to plain objects
        });
    } catch (err) {
        console.error(err);
        res.status(404).json({ message: "Unknown error." });
    }
});

module.exports = router;
