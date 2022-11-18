const express = require("express");
const router = express.Router();
const client = require("../../../setup/db");

router.get("/", (req, res) => {
    let sql_task = "SELECT * FROM course_" + res.locals["course_id"] + ".task";
    client.query(sql_task, [], (err, pg_res) => {
        if (err) {
            res.status(404).json({ message: "Unknown error." });
        } else {
            res.status(200).json({ task: pg_res.rows });
        }
    });
})

module.exports = router;