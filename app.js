/* 
    General Setup 
*/
const express = require("express");
const app = express();

app.set('trust proxy', 1); // get the real ip address

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(function (error, req, res, next) {
    if (error instanceof SyntaxError) {
        return res.status(500).send({ message: "Invalid data" });
    } else {
        next();
    }
});

const multer = require('multer');
var upload = multer({ dest: './tmp/upload/' });
app.use(upload.any());

const cors = require("cors");
app.use(cors());

const dotenv = require("dotenv");
dotenv.config();

const port = process.env.PORT || 3000;

const studentsRouter = require('./routes/student');
const interviewsTaRouter = require('./routes/ta');
const adminsRouter = require('./routes/admin');

const rate_limit = require("./setup/rate_limit");

/* 
    Routes 
*/
app.get("/", rate_limit.general_limiter, (req, res) => {
    res.status(418).json({ message: "Why are you here??? LOL --Howie" });
})
app.use('/', studentsRouter);
app.use('/ta', interviewsTaRouter);
app.use('/admin', adminsRouter);

app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`)
})