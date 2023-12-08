const express = require("express");
const router = express.Router();
const client = require("../../../setup/db");
const helpers = require("../../../utilities/helpers");
const adminMiddleware = require("../../auth/admin/middleware"); // Path to your admin middleware

router.post("/", adminMiddleware, (req, res) => {
    // Validation for input data
    if (!("course_code" in req.body) || helpers.name_validate(req.body["course_code"])) {
        return res.status(400).json({ message: "The course code is missing or has invalid format." });
    }
    if (!("course_session" in req.body) || helpers.string_validate(req.body["course_session"])) {
        return res.status(400).json({ message: "The course session is missing or has invalid format." });
    }

    // Additional fields processing
    const hidden = req.body["hidden"] === true || req.body["hidden"] === "true";
    const default_token_count = "default_token_count" in req.body ? parseInt(req.body["default_token_count"], 10) : 0;
    const token_length = "token_length" in req.body ? parseInt(req.body["token_length"], 10) : 0;
    const gitlab_group_id = "gitlab_group_id" in req.body && !helpers.number_validate(req.body["gitlab_group_id"]) ? req.body["gitlab_group_id"] : null;

    // SQL Query to add course
    const sql_add_course = "INSERT INTO Courses (course_code, course_session, gitlab_group_id, default_token_count, token_length, hidden) VALUES ($1, $2, $3, $4, $5, $6) RETURNING course_id";
    const sql_add_data = [req.body["course_code"], req.body["course_session"], gitlab_group_id, default_token_count, token_length, hidden];

    // Execute the query
    client.query(sql_add_course, sql_add_data, (err, pg_res_add_course) => {
        if (err) {
            if (err.code === "23505" && err.constraint === "course_course_code_course_session_key") {
                return res.status(409).json({ message: "The course must have unique course code and session." });
            } else if (err.code === "23505" && err.constraint === "course_gitlab_group_id_key") {
                return res.status(409).json({ message: "The course must have unique Gitlab group id." });
            } else {
                return res.status(404).json({ message: "Unknown error." });
            }
        } else if (pg_res_add_course.rowCount === 1) {
            return res.status(200).json({ message: "The course is added and the course specific tables have been created.", course_id: pg_res_add_course.rows[0]["course_id"] });
        }
    });
});

module.exports = router;
