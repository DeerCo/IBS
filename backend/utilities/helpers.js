const jwt = require("jsonwebtoken");
const moment = require("moment");
require("moment-timezone");
const fs = require("fs");
const json2csv = require("json2csv");
const bent = require("bent")
const getJSON = bent("json")
const transporter = require("../setup/email");
const constants = require("../setup/constants");
const db = require("../setup/db");
const { tasks } = require("../setup/constants");

function generateAccessToken(username, email, admin, roles) {
    return jwt.sign({ username: username, email: email, admin: admin, roles: roles }, process.env.TOKEN_SECRET, { expiresIn: "2h" });
}

function name_validate(name) {
    let regex_name = new RegExp("^[0-9a-zA-Z_]{1,30}$");

    if (!regex_name.test(name)) {
        return 1;
    }
    return 0;
}

function string_validate(string) {
    let regex_string = new RegExp("^[0-9a-zA-Z_ \.]{1,500}$");

    if (!regex_string.test(string)) {
        return 1;
    }
    return 0;
}

function boolean_validate(string) {
    if (string !== "true" && string !== "false") {
        return 1;
    }
    return 0;
}

function number_validate(number) {
    let regex_number = new RegExp("^[0-9]+$");

    if (!regex_number.test(number)) {
        return 1;
    }
    return 0;
}

function email_validate(email) {
    let regex_email = new RegExp(".");
///^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
    if (!regex_email.test(email)) {
        return 1;
    }
    return 0;
}

function date_validate(date) {
    let regex = new RegExp("^([12][0-9]{3}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01]))$");

    if (!regex.test(date) || !moment(date, "YYYY-MM-DD", true).isValid()) {
        return 1;
    } else {
        return 0;
    }
}

function time_validate(time) {
    let regex = new RegExp("^([12][0-9]{3}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])) (([0-9]|0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]:[0-5][0-9])$");

    if (!regex.test(time) || !moment(time.substring(0, 10), "YYYY-MM-DD", true).isValid()) {
        return 1;
    } else {
        return 0;
    }
}

//Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character:

function password_validate(password) {
    let regex = new RegExp(".");
// ^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$
    if (!regex.test(password)) {
        return 1;
    } else {
        return 0;
    }
}
function query_filter(query, ta = "") {
    let filter = "";
    if ("id" in query && !isNaN(query["id"]) && query["id"].trim() != "") {
        filter = filter + " AND id = " + query["id"];
    }
    if ("time" in query && !time_validate(query["time"])) {
        filter = filter + " AND time = '" + query["time"] + " America/Toronto'";
    }
    if ("date" in query && !date_validate(query["date"])) {
        filter = filter + " AND time BETWEEN '" + query["date"] + " America/Toronto'::date AND '" + query["date"] + " America/Toronto'::date + INTERVAL '24 HOURS'";
    }
    if ("student" in query && !name_validate(query["student"])) {
        filter = filter + " AND student = '" + query["student"] + "'";
    }
    if ("length" in query && !isNaN(query["length"]) && query["length"].trim() != "") {
        filter = filter + " AND length = " + query["length"];
    }
    if ("location" in query && !string_validate(query["location"])) {
        filter = filter + " AND location = '" + query["location"] + "'";
    }
    if ("cancelled" in query && (query["cancelled"].toLowerCase() === "true" || query["cancelled"].toLowerCase() === "false")) {
        filter = filter + " AND cancelled = '" + query["cancelled"].toLowerCase() + "'";
    }
    if ("note" in query && !string_validate(query["note"])) {
        filter = filter + " AND note = '" + query["note"] + "'";
    }
    if ("booked" in query) {
        if (query["booked"].toLowerCase() === "true") {
            filter = filter + " AND student IS NOT NULL";
        } else if (query["booked"].toLowerCase() === "false") {
            filter = filter + " AND student IS NULL";
        }
    }
    // if (ta != "") {
    //     if ("ta" in query && !name_validate(query["ta"])) {
    //         if (query["ta"].toLowerCase() != "all") {
    //             filter = filter + " AND ta = '" + query["ta"] + "'";
    //         }
    //     } else {
    //         filter = filter + " AND ta = '" + ta + "'";
    //     }
    // }
    filter = filter + " AND ta = '" + ta + "'";
    return filter;
}

function query_set(query) {
    let set = "";
    if ("set_time" in query && !time_validate(query["set_time"])) {
        set = set + " time = '" + query["set_time"] + " America/Toronto',";
    }
    if ("set_length" in query && !isNaN(query["set_length"]) && query["set_length"].trim() != "") {
        set = set + " length = " + query["set_length"] + ",";
    }
    if ("set_location" in query && !string_validate(query["set_location"])) {
        set = set + " location = '" + query["set_location"] + "',";
    }
    if ("set_cancelled" in query && (query["set_cancelled"].toLowerCase() === "true" || query["set_cancelled"].toLowerCase() === "false")) {
        set = set + " cancelled = '" + query["set_cancelled"].toLowerCase() + "',";
    }
    if ("set_note" in query && !string_validate(query["set_note"])) {
        set = set + " note = '" + query["set_note"] + "',";
    }
    return set;
}

function send_email(email, subject, body) {
    let mailOptions = {
        from: "Howie via CSC309 <csc309-noreply@teach.cs.toronto.edu>",
        to: email,
        subject: subject,
        text: "(Please do not reply to this email, as no one monitors it. Post your question to Piazza instead.)\n\n" + body
    };

    transporter.sendMail(mailOptions, function (error, info) { if (error) { console.log("Email error:" + error); } });
}

function send_interviews_csv(json, res, backup, note = "") {
    if (JSON.stringify(json) === "[]") {
        res.status(200).json({ message: "No data is available." });
        return;
    }

    let current_time = moment().tz("America/Toronto");
    let dir_date = current_time.format("YYYY") + "/" + current_time.format("MM") + "/" + current_time.format("DD") + "/";

    if (backup) {
        var dir = __dirname + "/../backup/" + dir_date;
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
        }
    } else {
        var dir = __dirname + "/../tmp/" + dir_date;
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
        }
    }

    let json2csvParser = new json2csv.Parser();
    let file_name = "interviews_" + current_time.format("YYYY-MM-DD-HH-mm-ss") + ((note === "") ? "" : "_") + note + ".csv";
    let csv = json2csvParser.parse(json);
    fs.writeFile(dir + file_name, csv, (err) => {
        if (err) {
            res.status(404).json({ message: "Unknown error." });
        } else {
            if (backup) {
                res.sendFile(file_name, { root: "./backup/" + dir_date, headers: { "Content-Disposition": "attachment; filename=" + file_name } });
            } else {
                res.sendFile(file_name, { root: "./tmp/" + dir_date, headers: { "Content-Disposition": "attachment; filename=" + file_name } });
            }
        }
    });
}

function search_files(keyword, sub_dir = "") {
    let dir = __dirname + "/../files/" + sub_dir;
    let result = [];

    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }

    let files = fs.readdirSync(dir);

    for (let i = 0; i < files.length; i++) {
        let file_name = dir + files[i];
        let stat = fs.lstatSync(file_name);

        if (stat.isDirectory()) {
            result = result.concat(search_files(keyword, sub_dir + files[i] + "/"));
        } else if (file_name.indexOf(keyword) >= 0) {
            result.push(sub_dir + files[i]);
        };
    };

    return result;
};

function backup_marks(json, note = "") {
    if (JSON.stringify(json) === "[]") {
        return;
    }

    let current_time = moment().tz("America/Toronto");
    let dir_date = current_time.format("YYYY") + "/" + current_time.format("MM") + "/" + current_time.format("DD") + "/";

    let dir = __dirname + "/../backup/" + dir_date;
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }

    let json2csvParser = new json2csv.Parser();
    let file_name = "marks_" + current_time.format("YYYY-MM-DD-HH-mm-ss") + ((note === "") ? "" : "_") + note + ".csv";
    let csv = json2csvParser.parse(json);
    fs.writeFile(dir + file_name, csv, (err) => {

    });
}

async function get_tasks(course_id){
    let pg_res = await db.query("SELECT * FROM course_" + course_id + ".task ORDER BY task_order", []);

    let tasks = {};
    for (let row of pg_res.rows){
        let task = {};
        task["due_date"] = row["due_date"];
        task["hidden"] = row["hidden"];
        task["min_member"] = row["min_member"];
        task["max_member"] = row["max_member"];

        tasks[row["task"]] = task;
    }

    return tasks;
}

async function get_criteria_id(course_id, task, criteria){
    let pg_res = await db.query("SELECT * FROM course_" + course_id + ".criteria WHERE task = ($1) AND criteria = ($2)", [task, criteria]);

    if (pg_res.rowCount === 0){
        return -1;
    } else{
        return pg_res.rows[0]["criteria_id"];
    }
    
}

async function get_criteria(course_id, task){
    let pg_res = await db.query("SELECT * FROM course_" + course_id + ".criteria WHERE task = ($1)", [task]);

    let all_criteria = {};
    let total_out_of = 0;
    for (let row of pg_res.rows){
        let criteria = {};
        criteria["task"] = row["task"];
        criteria["criteria"] = row["criteria"];
        criteria["total"] = row["total"];
        criteria["description"] = row["description"];

        all_criteria[row["criteria_id"]] = criteria;
        total_out_of += row["total"];
    }

    return all_criteria;
}

async function get_total_out_of(course_id){
    let pg_res = await db.query("SELECT task, SUM(total) AS sum FROM course_" + course_id + ".criteria GROUP BY task", []);

    let total_out_of = {};
    for (let row of pg_res.rows){
        total_out_of[row["task"]] = row["sum"];
    }

    return total_out_of;
}

async function format_marks_one_task(json, course_id, task) {
    let marks = {};
    let all_criteria = await get_criteria(course_id, task);

    for (let row of json) {
        let username = row["username"];
        if (!(username in marks)){
            marks[username] = {};
            for (let criteria in all_criteria){
                marks[username][all_criteria[criteria]["criteria"]] = {mark: 0, out_of: all_criteria[criteria]["total"]};
            }
        }

        let criteria_name = all_criteria[row["criteria_id"]]["criteria"];
        marks[username][criteria_name]["mark"] = parseFloat(row["mark"]);
    }
    return marks;
}

async function format_marks_all_tasks(json, course_id) {
    let marks = {};
    let total_out_of = await get_total_out_of(course_id);

    for (let row of json) {
        let username = row["username"];
        if (!(username in marks)){
            marks[username] = {};
            for (let task in total_out_of){
                marks[username][task] = {mark: 0, out_of: total_out_of[task]};
            }
        }

        marks[username][row["task"]]["mark"] = parseFloat(row["sum"]);
    }
    return marks;
}

function send_marks_csv(json, res, note = "", total = false) {
    if (JSON.stringify(json) === "[]") {
        res.status(200).json({ message: "No data is available." });
        return;
    }

    let current_time = moment().tz("America/Toronto");
    let dir_date = current_time.format("YYYY") + "/" + current_time.format("MM") + "/" + current_time.format("DD") + "/";

    let dir = __dirname + "/../backup/" + dir_date;
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }

    let json2csvParser = new json2csv.Parser({ defaultValue: "0" });
    let file_name = "marks_readable_" + current_time.format("YYYY-MM-DD-HH-mm-ss") + ((note === "") ? "" : "_") + note + ".csv";

    let header = { Student: "/" };
    let parsed_json = {};

    for (let mark of json) {
        if (!(mark["criteria"] in header)) {
            header[mark["criteria"]] = parseFloat(mark["total"]);
        }

        if (mark["student"] in parsed_json) {
            parsed_json[mark["student"]][mark["criteria"]] = parseFloat(mark["mark"]);
        } else {
            parsed_json[mark["student"]] = { Student: mark["student"], [mark["criteria"]]: parseFloat(mark["mark"]) };
        }
    }

    let rows = [header].concat(Object.values(parsed_json));

    if (total) {
        for (let row of rows) {
            let row_total = 0;
            for (let criteria of Object.keys(row)) {
                if (criteria != "Student") {
                    row_total += row[criteria];
                }
            }
            row["Total"] = row_total;
        }
    }

    let csv = json2csvParser.parse(rows);
    fs.writeFile(dir + file_name, csv, (err) => {
        if (err) {
            res.status(404).json({ message: "Unknown error." });
        } else {
            res.sendFile(file_name, { root: "./backup/" + dir_date, headers: { "Content-Disposition": "attachment; filename=" + file_name } });
        }
    });
}

function send_final_marks_csv(json, res, total = false) {
    if (JSON.stringify(json) === "[]") {
        res.status(200).json({ message: "No data is available." });
        return;
    }

    let current_time = moment().tz("America/Toronto");
    let dir_date = current_time.format("YYYY") + "/" + current_time.format("MM") + "/" + current_time.format("DD") + "/";

    let dir = __dirname + "/../backup/" + dir_date;
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }

    let json2csvParser = new json2csv.Parser({ defaultValue: "0" });
    let file_name = "marks_final_" + current_time.format("YYYY-MM-DD-HH-mm-ss") + ".csv";

    let header = Object.assign({ Student: "/" }, constants["weights"]);
    let parsed_json = {};

    for (let mark of json) {
        if (mark["task"] in constants["max"] && parseFloat(mark["marks_sum"]) > constants["max"][mark["task"]]) {
            mark["marks_sum"] = constants["max"][mark["task"]];
        }

        if (parseFloat(mark["totals_sum"]) != 0) {
            var weighted_mark = parseFloat(mark["marks_sum"]) / parseFloat(mark["totals_sum"]) * constants["weights"][mark["task"]];
        } else {
            var weighted_mark = 0;
        }

        if (mark["student"] in parsed_json) {
            parsed_json[mark["student"]][mark["task"]] = weighted_mark;
        } else {
            parsed_json[mark["student"]] = { Student: mark["student"], [mark["task"]]: weighted_mark };
        }
    }

    let rows = [header].concat(Object.values(parsed_json));

    if (total) {
        for (let row of rows) {
            let row_total = 0;
            for (let task of Object.keys(row)) {
                if (task != "Student") {
                    row_total += row[task];
                }
            }
            row["Total"] = row_total;
        }
    }

    let csv = json2csvParser.parse(rows);
    fs.writeFile(dir + file_name, csv, (err) => {
        if (err) {
            res.status(404).json({ message: "Unknown error." });
        } else {
            res.sendFile(file_name, { root: "./backup/" + dir_date, headers: { "Content-Disposition": "attachment; filename=" + file_name } });
        }
    });
}


module.exports = {
    generateAccessToken: generateAccessToken,
    password_validate: password_validate,
    name_validate: name_validate,
    boolean_validate: boolean_validate,
    number_validate: number_validate,
    string_validate: string_validate,
    date_validate: date_validate,
    time_validate: time_validate,
    email_validate: email_validate,
    query_filter: query_filter,
    query_set: query_set,
    send_email: send_email,
    send_interviews_csv: send_interviews_csv,
    search_files: search_files,
    backup_marks: backup_marks,
    get_tasks: get_tasks,
    get_criteria_id: get_criteria_id,
    get_criteria: get_criteria,
    get_total_out_of: get_total_out_of,
    format_marks_one_task: format_marks_one_task,
    format_marks_all_tasks: format_marks_all_tasks,
    send_marks_csv: send_marks_csv,
    send_final_marks_csv: send_final_marks_csv,
}