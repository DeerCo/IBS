const express = require("express");
const router = express.Router();
const client = require("../../../setup/db");
const helpers = require("../../../utilities/helpers");

router.post("/", (req, res) => {
    if (!("course_id" in req.body) || helpers.number_validate(req.body["course_id"])) {
        res.status(400).json({ message: "The course id is missing or has invalid format." });
        return;
    }
    if (!("username" in req.body) || helpers.name_validate(req.body["username"])) {
        res.status(400).json({ message: "The username is missing or has invalid format." });
        return;
    }
    if (!("update_user_info" in req.body) || helpers.boolean_validate(req.body["update_user_info"])) {
		res.status(400).json({ message: "The update user info property is missing or invalid." });
		return;
	}

    let email = "ibs-test@utoronto.ca";
    if ("email" in req.body) {
        if (helpers.email_validate(req.body["email"])) {
            res.status(400).json({ message: "The email has invalid format." });
            return;
        } else {
            email = req.body["email"];
        }
    }

    let roles = ["instructor", "ta", "student"];
    if (!("role" in req.body) || !roles.includes(req.body["role"])) {
        res.status(400).json({ message: "The role is missing or invalid." });
        return;
    }

    if (req.body["update_user_info"] === true || req.body["update_user_info"] === "true"){
        var sql_register = "INSERT INTO user_info (username, password, email) VALUES (($1), ($2), ($3)) ON CONFLICT (username) DO UPDATE SET email = EXCLUDED.email";
    } else{
        var sql_register = "INSERT INTO user_info (username, password, email) VALUES (($1), ($2), ($3)) ON CONFLICT (username) DO NOTHING";
    }
    let sql_register_data = [req.body["username"].toLowerCase(), "initial", email];
    let sql_add_1 = "INSERT INTO course_role (username, course_id, role) VALUES (($1), ($2), ($3))";
    let sql_add_1_data = [req.body["username"].toLowerCase(), req.body["course_id"], req.body["role"]];
    let sql_add_2 = "INSERT INTO course_" + req.body["course_id"] + ".user (username) VALUES (($1))";
    let sql_add_2_data = [req.body["username"].toLowerCase()];

    client.query(sql_register, sql_register_data, (err, pgRes) => {
        if (err) {
            res.status(404).json({ message: "Unknown error." });
            console.log(err);
        } else {
            client.query(sql_add_1, sql_add_1_data, (err, pgRes) => {
                if (err) {
                    if (err.code === "23503") {
                        res.status(400).json({ message: "The course id is not found in the database." });
                    } else if (err.code === "23505") {
                        res.status(409).json({ message: "Only one role can be added for the same user and course." });
                    } else {
                        res.status(404).json({ message: "Unknown error." });
                        console.log(err);
                    }
                } else {
                    client.query(sql_add_2, sql_add_2_data, (err, pgRes) => {
                        if (err) {
                            if (err.code === "23505") {
                                res.status(200).json({ message: "The user is registered if needed and the role is added." });
                            } else {
                                res.status(404).json({ message: "Unknown error." });
                                console.log(err);
                            }
                        } else {
                            res.status(200).json({ message: "The user is registered if needed and the role is added." });
                        }
                    });
                }
            });
        }
    });
})

module.exports = router;