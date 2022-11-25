const express = require("express");
const router = express.Router();
const AdmZip = require("adm-zip");
const fs = require("fs");
const helpers = require("../../../utilities/helpers");

router.get("/", (req, res) => {
    if (!("task" in req.query) || helpers.name_validate(req.query["task"])) {
        res.status(400).json({ message: "The task is missing or has invalid format." });
        return;
    }

    let original_path = "./files/course_" + res.locals["course_id"] + "/" + req.query["task"];
    let zip_root = "./tmp/download/";
    let zip_file_name = req.query["task"] + ".zip";
	if (!fs.existsSync(original_path)) {
        res.status(200).json({ message: "This task has no file." });
        return;
    }

    var zip = new AdmZip();
	zip.addLocalFolder(original_path);
    zip.writeZip(zip_root + zip_file_name);
    res.sendFile(zip_file_name, { root: zip_root, headers: { "Content-Disposition": "attachment; filename=" + zip_file_name } });
})

module.exports = router;