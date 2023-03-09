const express = require("express");
const router = express.Router();
const client = require("../../../setup/db");

router.get("/", (req, res) => {
    let sql_course = "SELECT * FROM course ORDER BY course_id";
    client.query(sql_course, [], (err, pg_res) => {
        if (err) {
            res.status(404).json({ message: "Unknown error." });
        } else {
            res.status(200).json({ count: pg_res.rowCount, course: pg_res.rows });
        }
    });
})

module.exports = router;