const express = require("express");
const router = express.Router();
const client = require("../../../setup/db");
const helpers = require("../../../utilities/helpers");

router.put("/", (req, res) => {
	if (!("task" in req.body) || helpers.string_validate(req.body["task"])) {
        res.status(400).json({ message: "The task is missing or has invalid format." });
        return;
    }

	let temp_set = helpers.query_set(req.body, 3);
	let set = temp_set["set"];
    let set_data = temp_set["data"];
	let set_data_id = temp_set["data_id"];
	if (set === "") {
		res.status(400).json({ message: "There is nothing to change." });
		return;
	}

	let temp_filter = helpers.query_filter(req.body, set_data_id);
    let filter = temp_filter["filter"];
    let filter_data = temp_filter["data"];
	if (filter === "") {
		res.status(400).json({ message: "Pleaes add at least one condition." });
		return;
	}

	if ("force" in req.body && (req.body["force"].toLowerCase() === "true")) {
		var sql_change = "UPDATE course_" + res.locals["course_id"] + ".interview SET" + set.substring(0, set.length - 1) + " WHERE task = ($1) AND host = ($2)" + filter;
	} else {
		var sql_change = "UPDATE course_" + res.locals["course_id"] + ".interview SET" + set.substring(0, set.length - 1) + " WHERE task = ($1) AND host = ($2) AND group_id IS NULL" + filter;
	}

	client.query(sql_change, [req.body["task"], res.locals["username"]].concat(set_data).concat(filter_data), (err, pgRes) => {
		if (err) {
			if (err.code === "23505") {
				res.status(400).json({ message: "You have another interview at the same time." });
			} else{
				res.status(404).json({ message: "Unknown error." });
			}
		} else if (pgRes.rowCount <= 1){
			let message = pgRes.rowCount + " interview has been changed.";
			res.status(200).json({ message: message });
		}else{
			let message = pgRes.rowCount + " interviews have been changed.";
			res.status(200).json({ message: message });
		}
	});

})

module.exports = router;