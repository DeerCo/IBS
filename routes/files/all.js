const express = require("express");
const router = express.Router();
const rate_limit = require("../../setup/rate_limit");
const helpers = require("../../utilities/helpers");

router.get("/:task/all", rate_limit.general_limiter, (req, res) => {
    let files = helpers.search_files(res.locals["group"], req.params["task"] + "/");
    let files_json = {};

    for (let i = 0; i < files.length; i++) {
        files_json[i] = "/" + files[i];
    }

    res.json({ keyword: res.locals["group"], files: files_json });
})

module.exports = router;