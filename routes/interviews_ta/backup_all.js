const express = require("express");
const router = express.Router();
const client = require("../../setup/db");
const helpers = require("../../utilities/helpers");

router.get("/backup", (req, res) => {
    let sql_backup = "SELECT * FROM interviews";
    client.query(sql_backup, [], (err, pgRes) => {
        if (err) {
            res.status(404).json({ message: "Unknown error." });
        } else {
            helpers.send_csv(pgRes.rows, res, true, "complete");
        }
    });
})

module.exports = router;