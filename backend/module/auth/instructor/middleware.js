const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const rate_limit = require("../../../setup/rate_limit");
const helpers = require("../../../utilities/helpers");

router.use("/:course_id/", rate_limit.general_limiter, function (req, res, next) {
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

                if (!token_data["admin"] && token_data["roles"][req.params["course_id"]] !== "instructor") {
                    res.status(403).json({ message: "You don't have permission to access." });
                    return;
                }

                retrieve_data(req).then(data => {
                    res.locals["course_id"] = req.params["course_id"];
                    res.locals["task"] = data["task"];
                    res.locals["username"] = token_data["username"];
                    res.locals["email"] = token_data["email"];
                    next();
                });
            }
        })
    }
})

async function retrieve_data(req){
    let task = "";

    if (req.method === "GET"){
        if ("task" in req.query && !helpers.string_validate(req.query["task"])) {
            task = await helpers.task_validate(req.params["course_id"], req.query["task"], false);
        }
    } else{
        if ("task" in req.body && !helpers.string_validate(req.body["task"])) {
            task = await helpers.task_validate(req.params["course_id"], req.body["task"], false);
        }
    }

    return {task: task};
}

module.exports = router;