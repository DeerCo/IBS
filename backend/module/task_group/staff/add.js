const express = require("express");
const router = express.Router();
const client = require("../../../setup/db");
const helpers = require("../../../utilities/helpers");

router.post("/", (req, res) => {
    if (!("max_token" in req.body) || helpers.number_validate(req.body["max_token"])) {
        res.status(400).json({ message: "The max token is missing or has invalid format." });
        return;
    }

    if (!("name" in req.body) || helpers.name_validate(req.body["name"])) {
        res.status(400).json({ message: "The task group name is missing or has invalid format." });
        return;
    }

    let sql_add =
        "INSERT INTO course_" +
        res.locals["course_id"] +
        ".task_group (max_token, name) VALUES (($1), ($2))";
    let sql_add_data = [req.body["max_token"], req.body["name"]];

    client.query(sql_add, sql_add_data, (err, pgRes) => {
        if (err) {
            res.status(404).json({ message: "Unknown error." });
            console.log(err);
        } else {
            res.status(200).json({ message: "The task group is added." });
        }
    });
});

module.exports = router;
