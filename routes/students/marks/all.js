const express = require("express");
const router = express.Router();
const client = require("../../../setup/db");
const helpers = require("../../../utilities/helpers");

router.get("/all", (req, res) => {
    console.log(res.locals["user_name"]);
    res.status(200).json({ message: "ok" });
})

module.exports = router;