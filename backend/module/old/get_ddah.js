const express = require("express");
const router = express.Router();
const moment = require("moment");
require("moment-timezone");
const client = require("../../setup/db");
const helpers = require("../../utilities/helpers");

router.get("/ddah", (req, res) => {
    if (res.locals["ta_data"]["ta"] === "Kianoosh" || res.locals["ta_data"]["ta"] === "Howie") {
        client.query("SELECT username, duty, time FROM ddah ORDER BY username, duty", [], (err, pgRes) => {
            if (err) {
                res.status(404).json({ message: "Unknown error." });
            } else {
                res.json({ message: pgRes.rows });
            }
        });
    } else {
        client.query("SELECT username, duty, time FROM ddah WHERE username = ($1)", [res.locals["ta_data"]["ta"]], (err, pgRes) => {
            if (err) {
                res.status(404).json({ message: "Unknown error." });
            } else {
                res.json({ message: pgRes.rows });
            }
        });
    }
})

module.exports = router;