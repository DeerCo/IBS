require("dotenv").config({ path: "../.env" });

const helpers = require("./helpers");
console.log(helpers.generateTaAccessToken("Howie", "phase_1"));
console.log(helpers.generateTaAccessToken("Lance", "phase_1"));
console.log(helpers.generateTaAccessToken("Hans", "phase_1"));
console.log(helpers.generateTaAccessToken("Rohan", "phase_1"));
console.log(helpers.generateTaAccessToken("Osama", "phase_1"));
console.log(helpers.generateTaAccessToken("Wencai", "phase_1"));
console.log(helpers.generateTaAccessToken("Kianoosh", "phase_1"));