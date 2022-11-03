const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const helpers = require("../../utilities/helpers");

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

                if (!token_data["admin"] && token_data["roles"][req.params["course_id"]] !== "student") {
                    res.status(403).json({ message: "You don't have permission to access." });
                    return;
                }

                res.locals["course_id"] = req.params["course_id"];
                res.locals["username"] = token_data["username"];
                res.locals["email"] = token_data["email"];
                next();
            }
        })
    }
})

module.exports = router;