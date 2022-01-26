const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
	service: "outlook",
	auth: {
		user: "csc309@outlook.com",
		pass: "obaumyyualujrfug"
	}
});

module.exports = transporter;