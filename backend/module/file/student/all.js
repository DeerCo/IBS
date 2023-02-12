const express = require("express");
const router = express.Router();
const helpers = require("../../../utilities/helpers");

router.get("", (req, res) => {
    if (res.locals["task"] === "") {
        res.status(400).json({ message: "The task is missing or invalid." });
        return;
    }

    helpers.get_group_id(res.locals["course_id"], res.locals["task"], res.locals["username"]).then(group_id => {
        let files = helpers.search_files(res.locals["username"], group_id, res.locals["course_id"], res.locals["task"] + "/");
        let files_list = [];

        for (let i = 0; i < files.length; i++) {
            files_list.push({ file_id: i, file_name: files[i].replace(res.locals["task"], "") });
        }

        if (files.length === 0) {
            res.json({ message: "You don't have any files for this task.", count: 0, files: [] });
        } else {
            res.json({ message: "Files are returned", count: files_list.length, files: files_list });
        }
    });
})

module.exports = router;