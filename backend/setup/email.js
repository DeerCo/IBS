const nodemailer = require("nodemailer");

// General email
const transporter = nodemailer.createTransport({
	host: process.env.EMAIL_HOST,
	port: 587
});

// Authorized email
// const transporter = nodemailer.createTransport({
//     host: 'appsmtp.utoronto.ca',
//     port: 25,
//     secure: false,
// });

module.exports = transporter;