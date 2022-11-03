const express = require("express");
const router = express.Router();
const rate_limit = require("../../setup/rate_limit");
const helpers = require("../../utilities/helpers");
const client = require("../../setup/db"); 

router.post("/login", rate_limit.general_limiter, (req, res) => {
    if (!("username" in req.body) || req.body["username"] === "") {
        res.status(400).json({ message: "Your username is missing." });
        return;
    }
    if (!("password" in req.body) || req.body["password"] === "") {
        res.status(400).json({ message: "Your password is missing." });
        return;
    }

    let sql_login = "SELECT (password = crypt(($1), password)) AS authenticated, email, admin FROM user_info WHERE username = ($2)";
    let sql_roles = "SELECT * FROM course_role WHERE username = ($1)";

    client.query(sql_login, [req.body["password"], req.body["username"]], (err_login, pg_res_login) => {
        if (err_login) {
            res.status(404).json({ message: "Unknown error." });
            console.log(err_login);
        } 
        
        if (pg_res_login.rowCount === 0) {
            res.status(404).json({ message: "Unknown error." });
        } else if (pg_res_login.rows[0]["authenticated"] === true) {
            client.query(sql_roles, [req.body["username"]], (err_roles, pg_res_roles) => {
                if (err_roles) {
                    res.status(404).json({ message: "Unknown error." });
                    console.log(err_roles);
                }

                let roles = {};
                for (let row of pg_res_roles.rows){
                    roles[row["course_id"]] = row["role"];
                }

                let token = helpers.generateAccessToken(req.body["username"], req.body["email"], pg_res_login.rows[0]["admin"], roles);
                res.json({ token: token, roles: roles});
            });
        } else {
            res.status(401).json({ message: "Your username or password is incorrect." });
        }
    });
})

module.exports = router;