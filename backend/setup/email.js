const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
	host: 'smtp.teach.cs.toronto.edu',
    port: 25,
    secure: false
});

module.exports = transporter;