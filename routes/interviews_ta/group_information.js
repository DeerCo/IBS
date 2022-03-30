const express = require("express");
const router = express.Router();
const constants = require("../../setup/constants");
const helpers = require("../../utilities/helpers");

router.get("/:task/group_information", (req, res) => {
    if (!("group" in req.query) || helpers.name_validate(req.query["group"])) {
        res.status(400).json({ message: "The group name is missing or has invalid format." });
        return;
    }

    helpers.get_group_information_by_group_name(req.query["group"], constants.tasks[req.params["task"]]["markus_id"]).then(data => {
        if (data["status"]) {
            if (data["users"].length === 0) {
                res.status(406).json({ message: "The provided group name is invalid." });
            } else {
                res.status(200).json(data["users"]);
            }
        } else {
            res.status(404).json({ message: "Unknown error." });
        }
    });
})

module.exports = router;