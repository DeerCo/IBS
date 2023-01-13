// General Setup 
const express = require("express");
const app = express();

app.set('trust proxy', 1); // get the real ip address
app.disable('x-powered-by');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Take down the server
app.use(function (req, res, next) {
    let server_down = false;

    if (server_down) {
        if (req.ip !== "127.0.0.1" && req.ip.substring(7) !== "127.0.0.1") {
            res.status(503).json({ message: "We are making the server better! Please try again later." });
            return;
        }
    }

    next();
});

// Handle requests with form-data
const multer = require('multer');
var upload = multer({});

app.use(function (req, res, next) {
    if (req.url.includes("upload")) {
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

// Routes
const rate_limit = require("./setup/rate_limit");
const general = require('./route/general');
const admin = require('./route/admin');
const instructor = require('./route/instructor');
const ta = require('./route/ta');
const student = require('./route/student');

app.use(rate_limit.general_limiter);

app.get("/", (req, res) => {
    res.status(418).json({ message: "Why are you here? We have a UI now :) --Howie" });
})
app.use('/', general);
app.use('/admin/', admin);
app.use('/instructor/', instructor);
app.use('/ta/', ta);
app.use('/', student);


// Error handling
app.use((req, res, next) => {
    res.status(404).json({ message: "Invalid URL or request method." });
})

app.use((err, req, res, next) => {
    if (err instanceof multer.MulterError) {
        if (err.code === "LIMIT_FILE_SIZE") {
            res.status(400).json({ message: "File is too large." });
        } else if (err.code === "LIMIT_UNEXPECTED_FILE") {
            res.status(400).json({ message: "Unexpected file is uploaded. Please check if your URL is correct." });
        } else {
            console.error(err);
            console.log(req);
            res.status(501).json({ message: "Upload fails. Please check error log." });
        }
    } else if (err instanceof SyntaxError) {
        return res.status(400).send({ message: "Invalid data is received." });
    } else {
        console.error(err);
        res.status(500).json({ message: "Unknown error. Please check error log." });
    }
})

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`The server is listening at http://localhost:${port}`)
})