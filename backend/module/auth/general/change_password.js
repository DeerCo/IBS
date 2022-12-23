const express = require("express");
const router = express.Router();
const client = require("../../../setup/db"); 

router.post("/", (req, res) => {
    if (!("username" in req.body) || req.body["username"] === "") {
        res.status(400).json({ message: "Your username is missing." });
        return;
    }
    if (!("password" in req.body) || req.body["password"] === "") {
        res.status(400).json({ message: "Your password is missing." });
        return;
    }
    if (!("code" in req.body) || req.body["code"] === "") {
        res.status(400).json({ message: "Your verification code is missing." });
        return;
    }

    let sql_verify = "SELECT * FROM user_verification WHERE username = ($1) AND code = ($2) AND (NOW() - created_at <= INTERVAL '5 minutes')";
    let sql_delete_code = "DELETE FROM user_verification WHERE username = ($1)";
    let sql_change_password = "UPDATE user_info SET password = crypt(($1), gen_salt('md5')) WHERE username = ($2)";

    client.query(sql_verify, [req.body["username"], req.body["code"]], (err_verify, pg_res_verify) => {
        client.query(sql_delete_code, [req.body["username"]]);

        if (err_verify) {
            res.status(404).json({ message: "Unknown error." });
        } else if (pg_res_verify.rowCount === 1){
            client.query(sql_change_password, [req.body["password"], req.body["username"]], (err_change_password, pg_res_change_password) => {
                if (err_change_password) {
                    res.status(404).json({ message: "Unknown error." });
                    console.log(err_change_password)
                } else{
                    res.status(200).json({ message: "Your password is changed." });
                }
            });
        } else{
            res.status(404).json({ message: "Your username or code is invalid." });
        }
    });
})

module.exports = router;