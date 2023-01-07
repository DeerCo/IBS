const express = require("express");
const router = express.Router();
const client = require("../../../setup/db");
const helpers = require("../../../utilities/helpers");

router.post("/", (req, res) => {
	if (res.locals["task"] === "") {
        res.status(400).json({ message: "The task is missing or invalid." });
        return;
    }
	if (!("username" in req.body) || helpers.name_validate(req.body["username"])) {
        res.status(400).json({ message: "The username is missing or has invalid format." });
        return;
    }

    let sql_add_group = "INSERT INTO course_" + res.locals["course_id"] + ".group (task) VALUES (($1)) RETURNING group_id";
	let sql_add_user = "INSERT INTO course_" + res.locals["course_id"] + ".group_user (task, username, group_id, status) VALUES (($1), ($2), ($3), 'confirmed')";

    client.query(sql_add_group, [res.locals["task"]], (err, pgRes) => {
        if (err) {
            res.status(404).json({ message: "Unknown error." });
            console.log(err);
        } else if (pgRes.rowCount === 1) {
            let group_id = pgRes.rows[0]["group_id"];
			client.query(sql_add_user, [res.locals["task"], req.body["username"], group_id], (err, pgRes) => {
				if (err) {
					if (err.code === "23505") {
						res.status(409).json({ message: "The student can join at most one group for each task." });
					} else {
						res.status(404).json({ message: "Unknown error." });
						console.log(err);
					}
				} else if (pgRes.rowCount === 1) {
					helpers.gitlab_create_group_and_project(res.locals["course_id"], group_id, req.body["username"], res.locals["task"]).then(result => {
						if (result["success"] === true){
							let message = "Group and Gitlab repo have been created. Student has been added to the Gitlab project.";
							res.status(200).json({ message: message, group_id: group_id, url: result["url"] });
						} else if (result["code"] === "failed_create_project"){
							res.status(404).json({ message: "Unable to create the Gitlab project. Please contact system admin." });
						} else if (result["code"] === "failed_add_user"){
							res.status(404).json({ message: "Unable to add the student to the Gitlab group. Please contact system admin." });
						} else if (result["code"] === "gitlab_invalid_username"){
							res.status(404).json({ message: "Student cannot be found on Gitlab. Please contact system admin to be added to Gitlab." });
						} else{
							res.status(404).json({ message: "Unknown error. Please contact system admin." });
						}
					});
				}
			});
        }
    });
})

module.exports = router;