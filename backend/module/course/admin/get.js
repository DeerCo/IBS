const express = require("express");
const router = express.Router();
const client = require("../../../setup/db");
const helpers = require("../../../utilities/helpers");

router.get("/", (req, res) => {
    if (!("course_id" in req.query) || helpers.number_validate(req.query["course_id"])) {
        res.status(400).json({ message: "The course id is missing or has invalid format." });
        return;
    }

    let sql_course = "SELECT * FROM course WHERE course_id = ($1)";
    client.query(sql_course, [req.query["course_id"]], (err, pg_res) => {
        if (err) {
            res.status(404).json({ message: "Unknown error." });
        } else if (pg_res.rowCount === 1){
            res.status(200).json({ message: "Course details are returned.", course: pg_res.rows });
        } else{
            res.status(400).json({ message: "The course id is invalid." });
        }
    });
})

module.exports = router;