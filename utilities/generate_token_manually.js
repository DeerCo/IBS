require("dotenv").config({ path: "../.env" });

const helpers = require("./helpers");

console.log(helpers.generateTaAccessToken("Howie", "phase_3_mentor_2"));
console.log(helpers.generateTaAccessToken("Lance", "phase_3_mentor_2"));
console.log(helpers.generateTaAccessToken("Hans", "phase_3_mentor_2"));
console.log(helpers.generateTaAccessToken("Rohan", "phase_3_mentor_2"));
console.log(helpers.generateTaAccessToken("Osama", "phase_3_mentor_2"));
console.log(helpers.generateTaAccessToken("Wencai", "phase_3_mentor_2"));
console.log(helpers.generateTaAccessToken("Kianoosh", "phase_3_mentor_2"));

console.log(helpers.generateStudentAccessToken({ user_id: 0, user_name: "", email: "", type: "student" }));

console.log(helpers.generateAdminAccessToken("Howie"));