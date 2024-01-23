const express = require("express");
const router = express.Router();
const { CourseRole } = require("../../../models"); // Adjust the path as per your project structure
const helpers = require("../../../utilities/helpers");
const adminMiddleware = require("../../auth/admin/middleware"); // Path to your admin middleware

router.delete("/", adminMiddleware, async (req, res) => {
    try {
        if (!("course_id" in req.body) || helpers.number_validate(req.body["course_id"])) {
            return res.status(400).json({ message: "The course id is missing or has invalid format." });
        }

        let deleteCount = 0;

        if ("username" in req.body && !helpers.name_validate(req.body["username"])) {
            deleteCount = await CourseRole.destroy({
                where: {
                    username: req.body["username"].toLowerCase(),
                    course_id: req.body["course_id"]
                }
            });
        } else if ("delete_all" in req.body && !helpers.boolean_validate(req.body["delete_all"])) {
            if (req.body["delete_all"] === true || req.body["delete_all"] === "true") {
                deleteCount = await CourseRole.destroy({
                    where: { course_id: req.body["course_id"] }
                });
            } else {
                return res.status(400).json({ message: "A username must be provided if the delete all property is false." });
            }
        } else {
            return res.status(400).json({ message: "A valid username or delete all property must be provided." });
        }
        if (deleteCount == 1) {
            res.status(200).json({ message: deleteCount + " role is deleted.", count: deleteCount });
        }
        if (deleteCount > 1) {
            res.status(200).json({ message: deleteCount + " roles are deleted.", count: deleteCount });
        } else {
            res.status(200).json({ message: "No roles were deleted.", count: deleteCount });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "An unknown error occurred." });
    }
});

module.exports = router;
