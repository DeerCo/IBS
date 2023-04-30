const express = require("express");
const router = express.Router();
const client = require("../../../setup/db");
const helpers = require("../../../utilities/helpers");

router.post("/", (req, res) => {
  console.log("impersonate.js")
    if (!("username" in req.body) || helpers.name_validate(req.body["username"])) {
        res.status(400).json({ message: "The username is missing or has invalid format." });
        return;
    }
    // generate a jwt token to impersonate the user
    let sql_login = "SELECT email, admin FROM user_info WHERE username = ($1)";
    let sql_roles = "SELECT * FROM (course_role JOIN course ON course_role.course_id = course.course_id) WHERE username=($1) AND hidden = false ORDER BY course.course_id";


    client.query(sql_login, [req.body["username"].toLowerCase()], (err_login, pg_res_login) => {
      if (err_login) {
        res.status(404).json({message: "Unknown user"});
        console.log(err_login);
      }

      client.query(sql_roles, [req.body["username"].toLowerCase()], (err_roles, pg_res_roles) => {
        if (err_roles) {
          res.status(404).json({message: "Unknown error."});
          console.log(err_roles);
          return;
        }

        let roles = {};
        let roles_with_details = [];
        for (let row of pg_res_roles.rows) {
          roles[row["course_id"]] = row["role"];
          roles_with_details.push({
            course_id: row["course_id"],
            course_code: row["course_code"],
            course_session: row["course_session"],
            role: row["role"]
          });
        }

        let token = helpers.generateAccessToken(req.body["username"].toLowerCase(), pg_res_login.rows[0]["email"], pg_res_login.rows[0]["admin"], roles);
        res.json({token: token, roles: roles_with_details});
      });
    });
})

module.exports = router;