// General Setup 
const express = require("express");
const app = express();

app.set('trust proxy', 1); // get the real ip address

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const multer = require('multer');
var upload = multer({});

// Handle all requests with form-data here
app.use(function (req, res, next) {
    if (req.url === "/admin/marks/upload" || req.url === "/a1/submit") {
        next();
    } else {
        let cb = upload.none();
        cb(req, res, next);
    }
});

const cors = require("cors");
app.use(cors());

const dotenv = require("dotenv");
dotenv.config();

const port = process.env.PORT || 3000;

const studentsRouter = require('./routes/student');
const interviewsTaRouter = require('./routes/ta');
const adminsRouter = require('./routes/admin');

const rate_limit = require("./setup/rate_limit");

// Routes 
app.get("/", rate_limit.general_limiter, (req, res) => {
    res.status(418).json({ message: "Why are you here??? LOL --Howie" });
})
app.use('/', studentsRouter);
app.use('/ta', interviewsTaRouter);
app.use('/admin', adminsRouter);

// Error handling
app.use((err, req, res, next) => {
    if (err instanceof multer.MulterError) {
        if (err.code === "LIMIT_FILE_SIZE") {
            res.status(400).json({ message: "File is too large." });
        } else {
            console.error(err.stack);
            res.status(400).json({ message: "Upload fails." });
        }
    } else {
        console.error(err.stack);
        res.status(500).json({ message: "Unknown error. Please check error log." });
    }
})

app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`)
})