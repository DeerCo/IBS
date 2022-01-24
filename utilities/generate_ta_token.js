require("dotenv").config({ path: "../.env" });

const helpers = require("./helpers");
console.log(helpers.generateTaAccessToken("Howie", "phase_2"));