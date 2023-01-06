const express = require("express");
const router = express.Router();
const helpers = require("../../../utilities/helpers");

router.get("/", (req, res) => {
    if (!("username" in req.query) || helpers.name_validate(req.query["username"])) {
        res.status(400).json({ message: "The username is missing or has invalid format." });
        return;
    }

    helpers.get_max_user_tokens(res.locals["course_id"], req.query["username"]).then(data => {
        res.status(200).json(data);
    });
})

module.exports = router;