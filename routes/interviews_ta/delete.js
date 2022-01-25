const express = require("express");
const router = express.Router();
const client = require("../../setup/db");

router.delete("/:task/delete", (req, res) => {
	if (!("id" in req.body) || isNaN(req.body["id"]) || req.body["id"].trim() === "") {
		res.status(404).json({ message: "Id is missing or has invalid format." });
		return;
	}

	let sql_delete = "DELETE FROM interviews WHERE task = ($1) AND ta = ($2) AND student IS NULL AND id = ($3)";
	client.query(sql_delete, [req.params["task"], res.locals["ta"], req.body["id"]], (err, pgRes) => {
		if (err) {
			res.status(404).json({ message: "Unknown error." });
		} else {
			let message = pgRes.rowCount + " rows have been deleted.";
			res.status(200).json({ message: message });
		}
	});
})

module.exports = router;