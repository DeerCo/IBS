const express = require("express");
const router = express.Router();
const client = require("../../setup/db");
const helpers = require("../../utilities/helpers");

router.put("/:task/change", (req, res) => {
	let filter = helpers.query_filter(req.body);
	let set = helpers.query_set(req.body);

	if (filter === "") {
		res.status(406).json({ message: "Pleaes add at least one condition." });
		return;
	}
	if (set === "") {
		res.status(406).json({ message: "Nothing to change." });
		return;
	}

	if ("force" in req.body && (req.body["force"].toLowerCase() === "true")) {
		var sql_change = "UPDATE interviews SET" + set.substring(0, set.length - 1) + " WHERE task = ($1) AND ta = ($2)" + filter;
	} else {
		var sql_change = "UPDATE interviews SET" + set.substring(0, set.length - 1) + " WHERE task = ($1) AND ta = ($2) AND student IS NULL" + filter;
	}

	client.query(sql_change, [req.params["task"], res.locals["ta"]], (err, pgRes) => {
		if (err) {
			res.status(404).json({ message: "Unknown error." });
		} else {
			let message = pgRes.rowCount + " rows have been changed.";
			res.status(200).json({ message: message });
		}
	});

})

module.exports = router;