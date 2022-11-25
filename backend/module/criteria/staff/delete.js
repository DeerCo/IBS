const express = require("express");
const router = express.Router();
const client = require("../../../setup/db");
const helpers = require("../../../utilities/helpers");

router.delete("/", (req, res) => {
    if (!("criteria_id" in req.body) || helpers.number_validate(req.body["criteria_id"])) {
        res.status(400).json({ message: "The criteria id is missing or has invalid format." });
        return;
    }
    
    let sql_delete_marks = "DELETE FROM course_" + res.locals["course_id"] + ".mark WHERE criteria_id = ($1)";
    let sql_delete_criteria = "DELETE FROM course_" + res.locals["course_id"] + ".criteria WHERE criteria_id = ($1)";

    client.query(sql_delete_marks, [req.body["criteria_id"]], (err, pg_res) => {
        if (err) {
            res.status(404).json({ message: "Unknown error." });
            console.log(err);
        } else {
            client.query(sql_delete_criteria, [req.body["criteria_id"]], (err, pg_res) => {
                if (err) {
                    res.status(404).json({ message: "Unknown error." });
                    console.log(err);
                } else {
                    if (pg_res.rowCount === 0){
                        res.status(400).json({ message: "There is no criteria associated with this criteria id." });
                    } else{
                        res.status(200).json({ message: "The criteria is deleted." });
                    }
                }
            });
        }
    });
})

module.exports = router;