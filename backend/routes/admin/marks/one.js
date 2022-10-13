const express = require("express");
const router = express.Router();
const client = require("../../../setup/db");
const helpers = require("../../../utilities/helpers");

router.get("/one", (req, res) => {
    if (!("student" in req.query) || helpers.name_validate(req.query["student"])) {
        res.status(400).json({ message: "The student is missing or has invalid format." });
        return;
    }

    client.query("SELECT task, criteria, mark, total, description FROM marks WHERE student = ($1)", [req.query["student"]], (err, pgRes) => {
        if (err) {
            res.status(404).json({ message: "Unknown error." });
        } else {
            let marks = helpers.calculate_marks(pgRes.rows);
            res.json({ marks: marks });
        }
    });
})

module.exports = router;