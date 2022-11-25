const express = require("express");
const router = express.Router();
const multer = require('multer');
const fs = require("fs");
const AdmZip = require("adm-zip");
const helpers = require("../../../utilities/helpers");

const upload = multer({
    dest: './tmp/upload/'
});

router.post("/", upload.single("file"), (req, res) => {
	if (req.file === undefined) {
		res.status(400).json({ message: "The file is missing or has invalid format." });
		return;
	}
	if (!("task" in req.body) || helpers.name_validate(req.body["task"])) {
        res.status(400).json({ message: "The task is missing or has invalid format." });
        return;
    }

	let zip_path = req.file.destination + req.file.filename;
	var zip = new AdmZip(zip_path);

	let path = "./files/course_" + res.locals["course_id"] + "/" + req.body["task"];
	if (!fs.existsSync(path)) {
        fs.mkdirSync(path, { recursive: true });
    }

	zip.extractAllTo(path, true);
	res.status(400).json({ message: "The file has been uploaded." });
})

module.exports = router;