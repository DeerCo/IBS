const nodemailer = require("nodemailer");

// General email
const transporter = nodemailer.createTransport({
	host: 'smtp.mail.yahoo.com',
	port: 465,
	service: 'yahoo',
	auth: {
		user: process.env.EMAIL_USER,
		pass: process.env.EMAIL_PASS
	}
});

// Authorized email
// const transporter = nodemailer.createTransport({
//     host: 'smtp.teach.cs.toronto.edu',
//     port: 25,
//     secure: false
// });

module.exports = transporter;