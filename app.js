/* 
    General Setup 
*/
const express = require("express");
const app = express();

app.set('trust proxy', 1); // get the real ip address

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(function(error, req, res, next) {
    if (error instanceof SyntaxError) {
        return res.status(500).send({ message: "Invalid data" });
    } else {
        next();
    }
});

const multer = require('multer');
var upload = multer({ dest: './tmp/upload/' });
app.use(upload.single('file'));

const cors = require("cors");
app.use(cors());

const dotenv = require("dotenv");
dotenv.config();

const port = process.env.PORT || 3000;

const a3Router = require('./routes/a3');
const authRouter = require('./routes/auth');
const interviewsRouter = require('./routes/interviews');
const interviewsTaRouter = require('./routes/interviews_ta');
const filesRouter = require('./routes/files');
const marksRouter = require('./routes/marks');

const rate_limit = require("./setup/rate_limit");

/* 
    Routes 
*/
app.get("/", rate_limit.general_limiter, (req, res) => {
    res.status(418).json({ message: "Why are you here??? LOL --Howie" });
})

app.use('/a3', a3Router);

app.use('/auth', authRouter);

app.use('/interviews', interviewsRouter);

app.use('/interviews_ta', interviewsTaRouter);

app.use('/marks', marksRouter);

app.use('/files', filesRouter);

app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`)
})