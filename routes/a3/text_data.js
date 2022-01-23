const express = require("express");
const router = express.Router();
const client = require("../../setup/db");
const constants = require("../../setup/constants");

router.get("/text/data", (req, res) => {
	if (!("paragraph" in req.query) || isNaN(req.query["paragraph"]) || req.query["paragraph"].trim() === "") {
		res.status(400).json({ message: "Paragraph is not valid." });
	} else {
		let sql_text = "SELECT * FROM text WHERE paragraph >= ($1) AND paragraph < ($1) + 5 ORDER BY paragraph ASC";
		client.query(sql_text, [req.query["paragraph"]], (err, pgRes) => {
			if (err) {
				res.status(404).json({ message: "Unknown error." });
			} else if (parseInt(req.query["paragraph"]) + 5 > constants.rows_count) {
				res.json({ data: pgRes.rows, next: false });
			} else {
				res.json({ data: pgRes.rows, next: true });
			}
		});
	}
})

module.exports = router;