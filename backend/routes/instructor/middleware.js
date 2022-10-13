const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const rate_limit = require("../../setup/rate_limit");

router.use("/", rate_limit.general_limiter, function (req, res, next) {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    if (token == null) {
        res.status(401).json({ message: "You need to provide a valid token." });
    } else {
        jwt.verify(token, process.env.TOKEN_SECRET, (err, instructor_data) => {
            if (err) {
                res.status(401).json({ message: "Your token is invalid. Please generate a new one." });
            } else {
                if (instructor_data["type"] !== "instructor") {
                    res.status(403).json({ message: "You are not authorized to access." });
                } else {
                    res.locals["instructor_data"] = instructor_data;
                    next();
                }
            }
        })
    }
})

module.exports = router;