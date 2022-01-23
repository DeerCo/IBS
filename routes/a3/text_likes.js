const express = require("express");
const router = express.Router();
const client = require("../../setup/db");
const rate_limit = require("../../setup/rate_limit");

router.post("/text/likes", rate_limit.likes_limiter, (req, res) => {
	if (!("paragraph" in req.body) || isNaN(req.body["paragraph"]) || req.body["paragraph"].trim() === "") {
		res.status(400).json({ message: "Paragraph is not valid." });
	} else {
		let sql_likes = "UPDATE text SET likes = (SELECT likes FROM text WHERE paragraph = ($1) FOR UPDATE) + 1 WHERE paragraph = ($1) RETURNING likes";
		client.query(sql_likes, [req.body["paragraph"]], (err, pgRes) => {
			if (err) {
				res.status(404).json({ message: "Unknown error." });
			} else {
				if (pgRes.rowCount === 0) {
					res.status(404).json({ message: "Unknown error." });
				} else {
					res.json({ data: pgRes.rows[0] });
				}
			}
		});
	}
})

module.exports = router;