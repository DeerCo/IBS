const express = require("express");
const router = express.Router();
const rate_limit = require("../../../setup/rate_limit");
const helpers = require("../../../utilities/helpers");

router.get("/:task/file/:id", rate_limit.general_limiter, (req, res) => {
    let id = req.params["id"];

    if (isNaN(id) || !(parseInt(Number(id)) == id) || isNaN(parseInt(id, 10))) {
        res.status(400).json({ message: "The file id is not a valid integer." });
        return;
    }

    let files = helpers.search_files(res.locals["group"], req.params["task"] + "/");

    if (parseInt(id) >= files.length || parseInt(id) < 0) {
        res.status(404).json({ message: "There is no file associated with this id." });
        return;
    }

    let name_with_path = files[parseInt(id)];

    let last_index = name_with_path.lastIndexOf('/');
    let sub_dir_path = "";
    let file_name = "";

    if (last_index === -1) {
        file_name = name_with_path;
    } else {
        sub_dir_path = name_with_path.slice(0, last_index);
        file_name = name_with_path.slice(last_index + 1);
    }

    res.sendFile(file_name, { root: "./files/" + sub_dir_path, headers: { "Content-Disposition": "attachment; filename=" + file_name } });
})

module.exports = router;