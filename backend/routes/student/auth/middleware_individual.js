const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");

router.use("/", function (req, res, next) {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if (token == null) {
        res.status(401).json({ message: "You need to provide a valid token." });
        return;
    }

    jwt.verify(token, process.env.TOKEN_SECRET, (err, token_data) => {
        if (err) {
            res.status(403).json({ message: "Your token is invalid. Please generate a new one." });
        } else {
            res.locals["user_name"] = token_data["user_name"];
            next();
        }
    })
})

module.exports = router;