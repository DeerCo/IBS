const express = require("express");
const router = express.Router();
const client = require("../../setup/db");
const helpers = require("../../utilities/helpers");

router.get("/:task/backup", (req, res) => {
    let sql_backup = "SELECT * FROM interviews WHERE task = ($1)";
    client.query(sql_backup, [req.params["task"]], (err, pgRes) => {
        if (err) {
            res.status(404).json({ message: "Unknown error." });
        } else {
            helpers.send_csv(pgRes.rows, res, true, req.params["task"]);
        }
    });
})

module.exports = router;