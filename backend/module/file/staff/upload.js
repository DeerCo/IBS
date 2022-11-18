const express = require("express");
const router = express.Router();
const multer = require('multer');
const fs = require("fs");
const Unzipper = require("decompress-zip");
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
	let unzipper = new Unzipper(zip_path);

	unzipper.on('error', function (log) {
		console.log(log);
		res.status(400).json({ message: "The zip file cannot be unzipped." });
		return;
	});

	unzipper.on('extract', function () {
		res.status(200).json({ message: "The files have been uploaded." });
		return;
	});

	let path = "./files/course_" + res.locals["course_id"] + "/" + req.body["task"];
	console.log(path)
	if (!fs.existsSync(path)) {
        fs.mkdirSync(path, { recursive: true });
    }

	unzipper.extract({ path: path, restrict: false });
})

module.exports = router;