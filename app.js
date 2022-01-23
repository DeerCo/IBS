/* 
	General Setup 
*/
const express = require("express");
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const port = process.env.PORT || 3000;

const cors = require("cors");
app.use(cors());

const dotenv = require("dotenv");
dotenv.config();

const a3Router = require('./routes/a3');
const interviewsRouter = require('./routes/interviews');

/* 
	Routes 
*/
app.get("/", (req, res) => {
	res.status(418).json({ message: "Why are you here??? LOL --Howie" });
})

app.use('/a3', a3Router);

app.use('/interviews', interviewsRouter);

app.listen(port, () => {
	console.log(`Example app listening at http://localhost:${port}`)
})