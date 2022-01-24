const express = require("express");
const router = express.Router();
const fs = require('fs');
const moment = require("moment");
require("moment-timezone");
const client = require("../../setup/db");

router.get("/:task/backup", (req, res) => {
    let sql_backup = "SELECT * FROM interviews";
    client.query(sql_backup, [], (err, pgRes) => {
        if (err) {
            res.status(404).json({ message: "Unknown error." });
        } else {
            res.json({ data: pgRes.rows });
            fs.writeFile('backup/interviews_' + moment().tz("America/Toronto").format("YYYY-MM-DD-hh-mm-ss") + ".json", JSON.stringify(pgRes.rows), (err) => { });
        }
    });
})

module.exports = router;