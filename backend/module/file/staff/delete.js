const express = require("express");
const router = express.Router();
const AdmZip = require("adm-zip");
const fs = require("fs");
const helpers = require("../../../utilities/helpers");

router.delete("/", (req, res) => {
    if (!("task" in req.body) || helpers.name_validate(req.body["task"])) {
        res.status(400).json({ message: "The task is missing or has invalid format." });
        return;
    }

    let path = "./files/course_" + res.locals["course_id"] + "/" + req.body["task"];

    if (!fs.existsSync(path)) {
        res.status(200).json({ message: "This task has no file." });
        return;
    }

    fs.rmSync(path, { recursive: true, force: true });
    res.status(200).json({ message: "All files have been deleted." });
})

module.exports = router;