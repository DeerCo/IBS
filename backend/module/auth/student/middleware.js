const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const helpers = require("../../../utilities/helpers");

router.use("/:course_id/", function (req, res, next) {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if (token == null) {
        res.status(401).json({ message: "You need to provide a valid token." });
    } else {
        jwt.verify(token, process.env.TOKEN_SECRET, (err, token_data) => {
            if (err) {
                res.status(401).json({ message: "Your token is invalid. Please generate a new one." });
            } else {
                if (helpers.number_validate(req.params["course_id"])) {
                    res.status(400).json({ message: "The course id is missing or invalid." });
                    return;
                }

                if (token_data["roles"][req.params["course_id"]] !== "student") {
                    res.status(403).json({ message: "You don't have permission to access." });
                    return;
                }

                retrieve_data(req).then(data => {
                    res.locals["course_id"] = req.params["course_id"];
                    res.locals["task"] = data["task"];
                    res.locals["username"] = token_data["username"];
                    res.locals["email"] = token_data["email"];
                    res.locals["type"] = "student";
                    res.locals["change_group"] = data["change_group"];
                    res.locals["hide_interview"] = data["hide_interview"];
                    res.locals["hide_file"] = data["hide_file"];
                    res.locals["interview_group"] = data["interview_group"];
                    next();
                });
            }
        })
    }
})

async function retrieve_data(req) {
    if (req.method === "GET") {
        if ("task" in req.query && !helpers.name_validate(req.query["task"])) {
            var data = await helpers.task_validate(req.params["course_id"], req.query["task"], true);
        } else {
            return { task: "", change_group: true, hide_interview: true, hide_file: true, interview_group: null };
        }
    } else {
        if ("task" in req.body && !helpers.name_validate(req.body["task"])) {
            var data = await helpers.task_validate(req.params["course_id"], req.body["task"], true);
        } else {
            return { task: "", change_group: true, hide_interview: true, hide_file: true, interview_group: null };
        }
    }

    return { task: data["task"], change_group: data["change_group"], hide_interview: data["hide_interview"], hide_file: data["hide_file"], interview_group: data["interview_group"] };
}

module.exports = router;