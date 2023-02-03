const express = require("express");
const router = express.Router();
const helpers = require("../../../utilities/helpers");

router.get("/", (req, res) => {
    if (res.locals["task"] === "") {
        res.status(400).json({ message: "The task is missing or invalid." });
        return;
    }

    if (!("file_id" in req.query) || helpers.number_validate(req.query["file_id"])) {
        res.status(400).json({ message: "The file id is not a valid integer." });
        return;
    }

    helpers.get_group_id(res.locals["course_id"], res.locals["task"], res.locals["username"]).then(group_id => {
        let files = helpers.search_files(res.locals["username"], group_id, res.locals["course_id"], res.locals["task"] + "/");

        if (parseInt(req.query["file_id"]) >= files.length || parseInt(req.query["file_id"]) < 0) {
            res.status(404).json({ message: "The file id is invalid." });
            return;
        }

        let name_with_path = files[parseInt(req.query["file_id"])];
        let last_index = name_with_path.lastIndexOf('/');
        let sub_dir_path = "";
        let file_name = "";

        if (last_index === -1) {
            file_name = name_with_path;
        } else {
            sub_dir_path = name_with_path.slice(0, last_index);
            file_name = name_with_path.slice(last_index + 1);
        }

        let complate_folder_path = "./files/course_" + res.locals["course_id"] + "/" + sub_dir_path;
        res.sendFile(file_name, { root: complate_folder_path, headers: { "Content-Disposition": "attachment; filename=" + file_name } });
    });
})

module.exports = router;