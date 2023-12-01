const express = require("express");
const router = express.Router();
const multer = require("multer");
const csv = require("csvtojson");
const format = require("pg-format");
const path = require("path");
const client = require("../../../setup/db");
const helpers = require("../../../utilities/helpers");

const upload = multer({
  dest: "./tmp/upload/",
});

router.post("/", upload.single("file"), async (req, res) => {
  if (req.file === undefined) {
    res
      .status(400)
      .json({ message: "The file is missing or has invalid format." });
    return;
  }
  if (path.extname(req.file.originalname) !== ".csv") {
    res.status(200).json({ message: "The file must be a csv file." });
    return;
  }
  if (
    !("course_id" in req.body) ||
    helpers.number_validate(req.body["course_id"])
  ) {
    res
      .status(400)
      .json({ message: "The course id is missing or has invalid format." });
    return;
  }
  if (
    !("update_user_info" in req.body) ||
    helpers.boolean_validate(req.body["update_user_info"])
  ) {
    res.status(400).json({
      message: "The update user info property is missing or invalid.",
    });
    return;
  }

  let roles = ["instructor", "ta", "student"];
  if (!("role" in req.body) || !roles.includes(req.body["role"])) {
    res.status(400).json({ message: "The role is missing or invalid." });
    return;
  }

  if (
    req.body["update_user_info"] === true ||
    req.body["update_user_info"] === "true"
  ) {
    var sql_register =
      "INSERT INTO user_info (username, password, email) VALUES %L ON CONFLICT (username) DO UPDATE SET email = EXCLUDED.email";
  } else {
    var sql_register =
      "INSERT INTO user_info (username, password, email) VALUES %L ON CONFLICT (username) DO NOTHING";
  }

  let sql_upload =
    "INSERT INTO course_role (username, course_id, role) VALUES %L ON CONFLICT (username, course_id) DO NOTHING; " +
    "INSERT INTO course_" +
    req.body["course_id"] +
    ".user (username) VALUES %L ON CONFLICT (username) DO NOTHING";

  const csv_path = req.file.destination + req.file.filename;
  csv({
    noheader: true,
    output: "csv",
  })
    .fromFile(csv_path)
    .then(async (csv_row) => {
      let invalid_username = 0;
      let invalid_email = 0;
      let upload_data_all = [];
      let upload_data_users = [];
      let register_data = [["test", "initial", "ibs-test@utoronto.ca"]];
      let totalRows = csv_row.length - 1;

      for (let j = 1; j < csv_row.length; j++) {
        if (csv_row[j].length >= 1 && !helpers.name_validate(csv_row[j][0])) {
          upload_data_users.push([csv_row[j][0]]);
          upload_data_all.push([
            csv_row[j][0],
            req.body["course_id"],
            req.body["role"],
          ]);
          if (csv_row[j].length >= 2 && csv_row[j][1] !== "") {
            if (helpers.email_validate(csv_row[j][1])) {
              invalid_email += 1;
            } else {
              register_data.push([csv_row[j][0], "initial", csv_row[j][1]]);
            }
          }
        } else {
          invalid_username += 1;
        }
      }

      let validRows =
        totalRows === 0 ? 0 : totalRows - invalid_username - invalid_email;

      if (upload_data_users.length === 0) {
        res.status(200).json({
          message: "The file must contain at least 1 valid username.",
        });
      }

      try {
        await client.query(format(sql_register, register_data), []);
        await client.query(
          format(sql_upload, upload_data_all, upload_data_users)
        );
        let message =
          validRows +
          " users are added to the course as " +
          req.body["role"] +
          ".";
        res.status(200).json({
          message: message,
          added: validRows,
          registered: validRows,
          invalid_username: invalid_username,
          invalid_email: invalid_email,
        });
      } catch (err) {
        if (err.code === "23503" && err.constraint === "username") {
          let username = err.detail.match(
            /Key \(username\)=\((.*)\) is not present in table "user_info"\./
          );
          res.status(400).json({
            message:
              "The username " +
              username[1] +
              " is not found in the database and a valid email is not provided.",
          });
        } else {
          res.status(404).json({ message: "Unknown error." });
          console.error(err);
        }
      }
    });
});

module.exports = router;
