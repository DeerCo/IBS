const express = require("express");
const router = express.Router();
const client = require("../../../setup/db");
const helpers = require("../../../utilities/helpers");

router.get("/raw", (req, res) => {
    client.query("SELECT task, criteria, mark, total, description FROM marks WHERE student = ($1)", [res.locals["user_name"]], (err, pgRes) => {
        if (err) {
            res.status(404).json({ message: "Unknown error." });
        } else {
            let marks = helpers.calculate_marks(pgRes.rows);
            res.json({ marks: marks });
        }
    });
})

module.exports = router;