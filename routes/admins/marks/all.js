const express = require("express");
const router = express.Router();
const client = require("../../../setup/db");
const helpers = require("../../../utilities/helpers");

router.get("/all", (req, res) => {
    if (!("task" in req.query) || helpers.name_validate(req.query["task"])) {
        res.status(400).json({ message: "The task is missing or has invalid format." });
        return;
    }

    let total = false;
    if ("total" in req.query && req.query["total"].toLowerCase() === "true") {
        total = true;
    }

    client.query("SELECT * FROM marks WHERE task = ($1) ORDER BY student, mark DESC", [req.query["task"]], (err, pgRes) => {
        if (err) {
            res.status(404).json({ message: "Unknown error." });
        } else {
            helpers.send_marks_csv(pgRes.rows, res, req.query["task"], total);
        }
    });
})

module.exports = router;