const express = require("express");
const router = express.Router();
const registerRouter = require("./a3/register");
const textDataRouter = require("./a3/text_data");
const textLikesRouter = require("./a3/text_likes");

router.use("/", function (req, res, next) {
	// next();
	res.sendStatus(403);
})

router.use("/", registerRouter);
router.use("/", textDataRouter);
router.use("/", textLikesRouter);

module.exports = router;