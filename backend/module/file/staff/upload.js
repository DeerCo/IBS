const express = require("express");
const router = express.Router();
const multer = require('multer');
const fs = require("fs");
const path = require('path');
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
	if (path.extname(req.file.originalname) !== ".zip"){
		res.status(200).json({ message: "The file must be a zip file." });
		return;
	}
	if (res.locals["task"] === "") {
        res.status(400).json({ message: "The task is missing or invalid." });
        return;
    }

	let zip_path = req.file.destination + req.file.filename;
	var zip = new AdmZip(zip_path);

	let dest_path = "./files/course_" + res.locals["course_id"] + "/" + res.locals["task"];
	if (!fs.existsSync(dest_path)) {
        fs.mkdirSync(dest_path, { recursive: true });
    }

	zip.extractAllTo(dest_path, true);
	res.status(200).json({ message: "The file has been uploaded." });
})

module.exports = router;