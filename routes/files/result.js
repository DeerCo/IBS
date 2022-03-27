const express = require("express");
const router = express.Router();
const rate_limit = require("../../setup/rate_limit");

router.get("/:task/result", rate_limit.general_limiter, (req, res) => {
    let file_name = res.locals["group"] + "_result.txt";
    res.sendFile(file_name, { root: "./files/" + req.params["task"], headers: { "Content-Disposition": "attachment; filename=" + file_name } });
})

module.exports = router;