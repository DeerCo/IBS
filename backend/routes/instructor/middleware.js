const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const rate_limit = require("../../setup/rate_limit");
const helpers = require("../../utilities/helpers");

router.use("/", rate_limit.general_limiter, function (req, res, next) {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    if (token == null) {
        res.status(401).json({ message: "You need to provide a valid token." });
    } else {
        jwt.verify(token, process.env.TOKEN_SECRET, (err, token_data) => {
            if (err) {
                res.status(401).json({ message: "Your token is invalid. Please generate a new one." });
            } else {
                if (!("course_id" in req.body) || helpers.number_validate(req.body["course_id"])) {
                    res.status(400).json({ message: "The course id is missing or invalid." });
                    return;
                }
                if (!token_data["admin"] && token_data["roles"][req.body["course_id"]] !== "instructor") {
                    res.status(403).json({ message: "You don't have permission to access." });
                    return;
                }

                res.locals["token_data"] = token_data;
                next();
            }
        })
    }
})

module.exports = router;