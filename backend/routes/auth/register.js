const express = require("express");
const router = express.Router();
const rate_limit = require("../../setup/rate_limit");
const helpers = require("../../utilities/helpers");
const client = require("../../setup/db");
router.post("/register", rate_limit.token_limiter, (req, res) => {
    if (!("username" in req.body) || helpers.name_validate(req.body["username"])) {
        res.status(400).json({ message: "Your username is missing or has invalid format." });
        return;
    }

    if (!("password" in req.body) || helpers.password_validate(req.body["password"])) {
        
        res.status(400).json({ message: "The password is missing or has invalid format." });
        return;
    } 

    if (!("email" in req.body) || helpers.email_validate(req.body["email"])) {
        res.status(400).json({ message: "The email is missing or has invalid format." });
        return;
    }
    
    let sql_add = "INSERT INTO user_info (username, password, email) VALUES (($1), ($2), ($3))";
    let sql_add_data = [req.body["username"], req.body["password"], req.body["email"]];

    client.query(sql_add, sql_add_data, (err, pgRes) => {
        if (err) {
            if (err.code === "23505") {
                res.status(409).json({ message: "The user must have unique username." });
            } else {
                res.status(404).json({ message: "Unknown error." });
                console.log(err);
            }
        } else if (pgRes.rowCount === 1) {
            res.status(200).json({ message: "The user is added." });
        }
    })
   
;
})

module.exports = router;
