const express = require("express");
const router = express.Router();
const marksRouter = require("./admins/marks");

router.use("/", function(req, res, next) {
    next();
})

router.use("/marks", marksRouter);

module.exports = router;