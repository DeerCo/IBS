const express = require("express");
const router = express.Router();
const client = require("../../setup/db");
const helpers = require("../../utilities/helpers");

router.get("/backup", (req, res) => {
	let sql_backup = "SELECT id, task, CONCAT(to_char(time AT TIME ZONE 'America/Toronto', 'YYYY-MM-DD HH24:MI'), ' America/Toronto'), ta, student, length, location, cancelled, note FROM interviews ORDER BY time";
	client.query(sql_backup, [], (err, pgRes) => {
		if (err) {
			res.status(404).json({ message: "Unknown error." });
		} else {
			helpers.send_csv(pgRes.rows, res, true, "complete");
		}
	});
})

module.exports = router;