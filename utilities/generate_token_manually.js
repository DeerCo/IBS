require("dotenv").config({ path: "../.env" });

const helpers = require("./helpers");

console.log(helpers.generateTaAccessToken("Howie", "phase_3"));
console.log(helpers.generateTaAccessToken("Lance", "phase_3"));
console.log(helpers.generateTaAccessToken("Hans", "phase_3"));
console.log(helpers.generateTaAccessToken("Rohan", "phase_3"));
console.log(helpers.generateTaAccessToken("Osama", "phase_3"));
console.log(helpers.generateTaAccessToken("Wencai", "phase_3"));
console.log(helpers.generateTaAccessToken("Kianoosh", "phase_3"));

console.log(helpers.generateStudentAccessToken({ user_id: 0, user_name: "", email: "", type: "student" }));

console.log(helpers.generateAdminAccessToken("Howie"));