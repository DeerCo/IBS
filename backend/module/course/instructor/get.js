const express = require("express");
const router = express.Router();
const helpers = require("../../../utilities/helpers");
const { Course } = require("../../../models");

router.get("/", async (req, res) => {
  const courseId = res.locals["course_id"];

  if (!courseId || helpers.number_validate(courseId)) {
    return res.status(400).json({ message: "The course id is missing or invalid." });
  }

  try {
    const course = await Course.findOne({
      where: { course_id: courseId }
    });

    if (!course) {
      return res.status(400).json({ message: "The course id is invalid." });
    }

    res.status(200).json({
      message: "Course details are returned.",
      course: course
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Unknown error." });
  }
});

module.exports = router;
