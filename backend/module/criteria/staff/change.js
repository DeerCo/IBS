const express = require("express");
const router = express.Router();
const client = require("../../../setup/db");
const helpers = require("../../../utilities/helpers");

router.put("/", (req, res) => {
    if (!("criteria_id" in req.body) || helpers.number_validate(req.body["criteria_id"])) {
        res.status(400).json({ message: "The criteria id is missing or has invalid format." });
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

    if ("description" in req.body && (req.body["description"] === "" || !helpers.string_validate(req.body["description"]))) {
        var sql_change = "UPDATE course_" + res.locals["course_id"] + ".criteria SET criteria = ($1), total = ($2), description = ($3) WHERE criteria_id = ($4)";
        var sql_change_data = [req.body["criteria"], req.body["total"], req.body["description"], req.body["criteria_id"]];
    } else {
        res.status(400).json({ message: "The description is missing or has invalid format." });
        return;
    }

    client.query(sql_change, sql_change_data, (err, pg_res) => {
        if (err) {
            res.status(404).json({ message: "Unknown error." });
            console.log(err);
        } else if (pg_res.rowCount === 0) {
            res.status(400).json({ message: "The criteria id is invalid." });
        } else {
            res.status(200).json({ message: "The criteria is changed." });
        }
    });
})

module.exports = router;