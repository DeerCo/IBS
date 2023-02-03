const express = require("express");
const router = express.Router();
const client = require("../../../setup/db");
const helpers = require("../../../utilities/helpers");

router.delete("/", (req, res) => {
    if (!("course_id" in req.body) || helpers.number_validate(req.body["course_id"])) {
        res.status(400).json({ message: "The course id is missing or has invalid format." });
        return;
    }
    
    if ("username" in req.body && !helpers.name_validate(req.body["username"])) {
        var sql_delete = "DELETE FROM course_role WHERE username = ($1) and course_id = ($2)";
        var sql_delete_data = [req.body["username"], req.body["course_id"]];
    } else if ("delete_all" in req.body && !helpers.boolean_validate(req.body["delete_all"])) {
        if (req.body["delete_all"] === true || req.body["delete_all"] === "true"){
            var sql_delete = "DELETE FROM course_role WHERE course_id = ($1)";
            var sql_delete_data = [req.body["course_id"]];
        } else{
            res.status(400).json({ message: "A username must be provided if the delete all property is false." });
            return;
        }
    } else{
        res.status(400).json({ message: "A valid username or delete all property must be provided." });
        return;
    }

    client.query(sql_delete, sql_delete_data, (err, pgRes) => {
        if (err) {
            res.status(404).json({ message: "Unknown error." });
            console.log(err);
        } else if (pgRes.rowCount <= 1) {
            res.status(200).json({ message: pgRes.rowCount + " role is deleted.", count: pgRes.rowCount });
        } else {
            res.status(200).json({ message: pgRes.rowCount + " roles are deleted.", count: pgRes.rowCount });
        }
    });
})

module.exports = router;