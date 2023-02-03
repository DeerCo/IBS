const express = require("express");
const router = express.Router();
const client = require("../../../setup/db");
const helpers = require("../../../utilities/helpers");

router.put("/", (req, res) => {
    if (!("username" in req.body) || helpers.name_validate(req.body["username"])) {
        res.status(400).json({ message: "The username is missing or has invalid format." });
        return;
    }
    if (!("email" in req.body) || helpers.email_validate(req.body["email"])) {
        res.status(400).json({ message: "The email is missing or has invalid format." });
        return;
    }

    let sql_update = "UPDATE user_info SET email = ($1) WHERE username = ($2)";
    let sql_update_data = [req.body["email"], req.body["username"]];

    client.query(sql_update, sql_update_data, (err, pg_res) => {
        if (err) {
            res.status(404).json({ message: "Unknown error." });
            console.log(err);
        } else if (pg_res.rowCount === 0) {
            res.status(400).json({ message: "The username is invalid." });
        } else {
            res.status(200).json({ message: "The user info is changed." });
        }
    });
})

module.exports = router;