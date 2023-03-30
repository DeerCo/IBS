const express = require("express");
const router = express.Router();
const client = require("../../../setup/db");
const helpers = require("../../../utilities/helpers");

router.put("/", (req, res) => {
    if (!("username" in req.body) || helpers.name_validate(req.body["username"])) {
        res.status(400).json({ message: "The username is missing or has invalid format." });
        return;
    }

    let token_count = -1;
    if ("token_count" in req.body) {
        if (helpers.name_validate(req.body["token_count"])) {
            res.status(400).json({ message: "The token count is missing or has invalid format." });
            return;
        } else {
            token_count = req.body["token_count"];
        }
    }

    var sql_change = "UPDATE course_" + res.locals["course_id"] + ".user SET token_count = ($1) WHERE username = ($2)";
    var sql_change_data = [token_count, req.body["username"].toLowerCase()];

    client.query(sql_change, sql_change_data, (err, pg_res) => {
        if (err) {
            res.status(404).json({ message: "Unknown error." });
            console.log(err);
        } else if (pg_res.rowCount === 0) {
            res.status(400).json({ message: "The username is invalid." });
        } else {
            res.status(200).json({ message: "The token is changed." });
        }
    });
})

module.exports = router;