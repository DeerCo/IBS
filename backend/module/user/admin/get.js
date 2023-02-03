const express = require("express");
const router = express.Router();
const client = require("../../../setup/db");
const helpers = require("../../../utilities/helpers");

router.get("/", (req, res) => {
    if ("username" in req.query) {
        if (!helpers.name_validate(req.query["username"])) {
            var sql_user = "SELECT username, email, admin FROM user_info WHERE username = ($1)";
            var sql_user_data = [req.query["username"]];
        } else {
            res.status(400).json({ message: "The username has invalid format." });
            return;
        }
    } else {
        var sql_user = "SELECT username, email, admin FROM user_info";
        var sql_user_data = [];
    }


    client.query(sql_user, sql_user_data, (err, pg_res) => {
        if (err) {
            res.status(404).json({ message: "Unknown error." });
        } else {
            res.status(200).json({ count: pg_res.rows.length, user: pg_res.rows });
        }
    });
})

module.exports = router;