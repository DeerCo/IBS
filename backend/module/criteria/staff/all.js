const express = require("express");
const router = express.Router();
const client = require("../../../setup/db");

router.get("/", (req, res) => {
    if (res.locals["task"] === "") {
        res.status(400).json({ message: "The task is missing or invalid." });
        return;
    }
    
    let sql_criteria = "SELECT * FROM course_" + res.locals["course_id"] + ".criteria WHERE task = ($1)";
    client.query(sql_criteria, [res.locals["task"]], (err, pg_res) => {
        if (err) {
            res.status(404).json({ message: "Unknown error." });
        } else {
            res.status(200).json({ criteria: pg_res.rows });
        }
    });
})

module.exports = router;