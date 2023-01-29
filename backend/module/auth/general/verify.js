const express = require("express");
const router = express.Router();
const helpers = require("../../../utilities/helpers");
const rate_limit = require("../../../setup/rate_limit");
const client = require("../../../setup/db");

router.post("/", rate_limit.email_limiter, (req, res) => {
    if (!("username" in req.body) || req.body["username"] === "") {
        res.status(400).json({ message: "Your username is missing." });
        return;
    }

    let sql_email = "SELECT email FROM user_info WHERE username = ($1)";
    let sql_verify = "INSERT INTO user_verification (username, code, created_at) VALUES (($1), ($2), NOW()) ON CONFLICT (username) DO UPDATE SET code = ($2), created_at = NOW()"

    client.query(sql_email, [req.body["username"].toLowerCase()], (err_email, pg_res_email) => {
        if (err_email) {
            res.status(404).json({ message: "Unknown error." });
            console.log(err_email);
        } else {
            if (pg_res_email.rowCount === 1) {
                let code = Math.floor(100000 + Math.random() * 900000);
                helpers.send_email(pg_res_email.rows[0]["email"], "IBS Password Reset Request", "We received a request to reset your password. If this was you, please enter code " + code + ". The code will expire in 5 minutes.");
                client.query(sql_verify, [req.body["username"].toLowerCase(), code.toString()]);
            }

            res.status(200).json({ message: "An email has been sent if the username is valid." });
        }
    });
})

module.exports = router;