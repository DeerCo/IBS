const express = require("express");
const router = express.Router();
const client = require("../../../setup/db");
const helpers = require("../../../utilities/helpers");

router.get("/", (req, res) => {
    if (!("username" in req.query) || helpers.name_validate(req.query["username"])) {
        res.status(400).json({ message: "The username is missing or has invalid format." });
        return;
    }

    let sql_task = "SELECT * FROM course_role WHERE username = ($1)";
    client.query(sql_task, [req.query["username"]], (err, pg_res) => {
        if (err) {
            res.status(404).json({ message: "Unknown error." });
        } else {
            res.status(200).json({ role: pg_res.rows });
        }
    });
})

module.exports = router;