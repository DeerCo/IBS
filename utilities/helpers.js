const jwt = require("jsonwebtoken");
const moment = require("moment");
require("moment-timezone");
const bent = require("bent")
const getJSON = bent("json")
const transporter = require("../setup/email");

function generateAccessToken(group) {
	return jwt.sign(group, process.env.TOKEN_SECRET, { expiresIn: "1h" });
}

function name_validate(name) {
	let regex_name = new RegExp("^[0-9a-zA-Z_]{1,30}$");

	if (!regex_name.test(name)) {
		return 1;
	}
	return 0;
}

function number_validate(number) {
	let regex_number = new RegExp("^[0-9]{9,10}$");

	if (!regex_number.test(number)) {
		return 1;
	}
	return 0;
}

function time_validate(time) {
	let regex = new RegExp("^([12][0-9]{3}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])) (([0-9]|0[0-9]|1[0-9]|2[0-3]):[0-5][0-9])$");

	if (!regex.test(time) || !moment(time.substring(0, 10), "YYYY-MM-DD", true).isValid()) {
		return 1;
	} else {
		return 0;
	}
}

function send_email(email, subject, body) {
	let mailOptions = {
		from: "Han Xian Xu Huang <csc309@outlook.com>",
		to: email,
		subject: subject,
		text: body + "\n\n(Please do not reply to this email, as no one monitors it. Post your question to Piazza instead.)"
	};

	transporter.sendMail(mailOptions, function (error, info) { if (error) { console.log(error); } });
}

async function get_users_information(user_group, markus_id) {
	try {
		let groups = await getJSON(process.env.MARKUS_API + "assignments/" + markus_id + "/groups.json", null, { "Authorization": "MarkUsAuth " + process.env.MARKUS_AUTH });

		let users_requests = [];
		for (let group of groups) {
			if (group["group_name"] === user_group) {
				for (let member of group["members"]) {
					users_requests.push(await getJSON(process.env.MARKUS_API + "users/" + member["user_id"] + ".json", null, { "Authorization": "MarkUsAuth " + process.env.MARKUS_AUTH }));
				}
			}
		}
		let users = await Promise.all(users_requests);
		return { status: true, users: users };
	} catch (e) {
		return { status: false };
	}
}

module.exports = {
	generateAccessToken: generateAccessToken,
	name_validate: name_validate,
	number_validate: number_validate,
	time_validate: time_validate,
	send_email: send_email,
	get_users_information: get_users_information
}