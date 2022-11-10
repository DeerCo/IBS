const express = require("express");
const router = express.Router();
const client = require("../../../setup/db");
const helpers = require("../../../utilities/helpers");

router.post("/", (req, res) => {
	if (!("task" in req.body) || helpers.string_validate(req.body["task"])) {
        res.status(400).json({ message: "The task is missing or invalid." });
        return;
    }

    let sql_add_group = "INSERT INTO course_" + res.locals["course_id"] + ".group (task) VALUES (($1)) RETURNING group_id";
	let sql_add_user = "INSERT INTO course_" + res.locals["course_id"] + ".group_user (task, username, group_id, status) VALUES (($1), ($2), ($3), 'confirmed')";

    client.query(sql_add_group, [req.body["task"]], (err, pgRes) => {
        if (err) {
        	if (err.code === "23503") {
                res.status(400).json({ message: "The task is not found in the database." });
            } else {
                res.status(404).json({ message: "Unknown error." });
                console.log(err);
            }
        } else if (pgRes.rowCount === 1) {
            let group_id = pgRes.rows[0]["group_id"];
			client.query(sql_add_user, [req.body["task"], res.locals["username"], group_id], (err, pgRes) => {
				if (err) {
					if (err.code === "23505") {
						res.status(409).json({ message: "You can join at most one group for each task." });
					} else {
						res.status(404).json({ message: "Unknown error." });
						console.log(err);
					}
				} else if (pgRes.rowCount === 1) {
					res.status(200).json({ message: "Group has been created." });
				}
			});
        }
    });
})

module.exports = router;