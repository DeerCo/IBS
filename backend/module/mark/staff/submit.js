const express = require("express");
const router = express.Router();
const client = require("../../../setup/db");
const helpers = require("../../../utilities/helpers");

router.post("/", (req, res) => {
    if (res.locals["task"] === "") {
        res.status(400).json({ message: "The task is missing or invalid." });
        return;
    }
    if (!("criteria" in req.body) || helpers.string_validate(req.body["criteria"])) {
        res.status(400).json({ message: "The criteria is missing or has invalid format." });
        return;
    }
    if (!("username" in req.body) || helpers.name_validate(req.body["username"])) {
        res.status(400).json({ message: "The username is missing or has invalid format." });
        return;
    }
    if (!("mark" in req.body) || helpers.number_validate(req.body["mark"])) {
        res.status(400).json({ message: "The mark is missing or has invalid format." });
        return;
    }

    helpers.get_criteria_id(res.locals["course_id"], res.locals["task"], req.body["criteria"]).then(criteria_id => {
        let sql_add = "INSERT INTO course_" + res.locals["course_id"] + ".mark (criteria_id, username, mark, task) VALUES (($1), ($2), ($3), ($4))";
        let sql_add_data = [criteria_id, req.body["username"], req.body["mark"], res.locals["task"]];

        if (req.body["overwrite"] === true || req.body["overwrite"] === "true"){
            sql_add += " ON CONFLICT (criteria_id, username) DO UPDATE SET mark = EXCLUDED.mark";
        } else{
            sql_add += " ON CONFLICT (criteria_id, username) DO NOTHING";
        }

        client.query(sql_add, sql_add_data, (err, pgRes) => {
            if (err) {
                if (err.code === "23503" && err.constraint === "criteria_id") {
                    res.status(400).json({ message: "The criteria is not found in the database." });
                } else if (err.code === "23503" && err.constraint === "username") {
                    res.status(400).json({ message: "The username is not found in the database." });
                } else {
                    res.status(404).json({ message: "Unknown error." });
                    console.log(err);
                }
            } else {
                if (pgRes.rowCount === 0) {
                    res.status(200).json({ message: "The mark is unchanged." });
                } else if (pgRes.rowCount === 1) {
                    res.status(200).json({ message: "The mark is changed." });
                } else {
                    res.status(404).json({ message: "Unknown error." });
                }
            }
        });
    });
})

module.exports = router;