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
    if (!("total" in req.body) || helpers.number_validate(req.body["total"])) {
        res.status(400).json({ message: "The total is missing or has invalid format." });
        return;
    }

    if ("description" in req.body && req.body["description"] !== "") {
        if (helpers.string_validate(req.body["description"])) {
            res.status(400).json({ message: "The description has invalid format." });
            return;
        } else {
            var sql_add = "INSERT INTO course_" + res.locals["course_id"] + ".criteria (task, criteria, total, description) VALUES (($1), ($2), ($3), ($4))";
            var sql_add_data = [res.locals["task"], req.body["criteria"], req.body["total"], req.body["description"]];
        }
    } else {
        var sql_add = "INSERT INTO course_" + res.locals["course_id"] + ".criteria (task, criteria, total) VALUES (($1), ($2), ($3))";
        var sql_add_data = [res.locals["task"], req.body["criteria"], req.body["total"]];
    }

    client.query(sql_add, sql_add_data, (err, pgRes) => {
        if (err) {
            if (err.code === "23503") {
                res.status(400).json({ message: "The task is not found in the database." });
            } else if (err.code === "23505") {
                res.status(409).json({ message: "Criteria must have unique name for each task." });
            } else {
                res.status(404).json({ message: "Unknown error." });
                console.log(err);
            }
        } else {
            res.status(200).json({ message: "The criteria is added." });
        }
    });
})

module.exports = router;