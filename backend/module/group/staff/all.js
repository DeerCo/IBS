const express = require("express");
const router = express.Router();
const client = require("../../../setup/db");
const helpers = require("../../../utilities/helpers");

router.get("/", (req, res) => {
    if (res.locals["task"] === "") {
        res.status(400).json({ message: "The task is missing or invalid." });
        return;
    }

    let sql_groups = "SELECT * FROM (course_" + res.locals["course_id"] + ".group AS t1 INNER JOIN (SELECT group_id, array_agg(username) AS users FROM course_" + res.locals["course_id"] + ".group_user WHERE task = ($1) GROUP BY group_id) AS t2 ON t1.group_id = t2.group_id) WHERE array_length(users, 1) != 0";

    client.query(sql_groups, [res.locals["task"]], (err, pg_res_groups) => {
        if (err) {
            res.status(404).json({ message: "Unknown error." });
            console.log(err);
        } else {
            res.status(200).json({ count: pg_res_groups.rows.length, groups: pg_res_groups.rows });
        }
    });
})

module.exports = router;