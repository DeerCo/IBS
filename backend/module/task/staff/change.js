const express = require("express");
const router = express.Router();
const client = require("../../../setup/db");
const helpers = require("../../../utilities/helpers");

router.put("/", async (req, res) => {
  if (res.locals["task"] === "") {
    res.status(400).json({ message: "The task is missing or invalid." });
    return;
  }
  if ("long_name" in req.body && helpers.string_validate(req.body["long_name"])) {
        res.status(400).json({ message: "The long name is not correct." });
        return;
  }
  if (
    !("due_date" in req.body) ||
    helpers.time_validate(req.body["due_date"])
  ) {
    res
      .status(400)
      .json({ message: "The due date is missing or not correct." });
    return;
  }
  if (!("weight" in req.body) || helpers.number_validate(req.body["weight"])) {
    res
      .status(400)
      .json({ message: "The weight property is missing or invalid." });
    return;
  }
  let isWeightExceeded = await helpers.new_weight_validate(
    typeof req.body["weight"] === "string"
      ? parseInt(req.body["weight"])
      : req.body["weight"],
    res.locals["course_id"],
    res.locals["task"]
  );

  if (isWeightExceeded) {
    res
      .status(400)
      .json({ message: "The accumulated weight of all tasks exceeds 100" });
    return;
  }

  if (!("hidden" in req.body) || helpers.boolean_validate(req.body["hidden"])) {
    res
      .status(400)
      .json({ message: "The hidden property is missing or not correct." });
    return;
  }
  if (
    !("min_member" in req.body) ||
    helpers.number_validate(req.body["min_member"])
  ) {
    res.status(400).json({ message: "The min member is missing or invalid." });
    return;
  }
  if (
    !("max_member" in req.body) ||
    helpers.number_validate(req.body["max_member"])
  ) {
    res.status(400).json({ message: "The max member is missing or invalid." });
    return;
  }
  if (
    !("max_token" in req.body) ||
    helpers.number_validate(req.body["max_token"])
  ) {
    res.status(400).json({ message: "The max token is missing or invalid." });
    return;
  }
  if (
    !("hide_interview" in req.body) ||
    helpers.boolean_validate(req.body["hide_interview"])
  ) {
    res.status(400).json({
      message: "The hide interview property is missing or not correct.",
    });
    return;
  }
  if (!("hide_file" in req.body) || helpers.boolean_validate(req.body["hide_file"])) {
        res.status(400).json({ message: "The hide file property is missing or not correct." });
        return;
  }
  if (
    !("change_group" in req.body) ||
    helpers.boolean_validate(req.body["change_group"])
  ) {
    res.status(400).json({
      message: "The change group property is missing or not correct.",
    });
    return;
  }

  let interview_group = null;
  if ("interview_group" in req.body) {
    if (req.body["interview_group"] === "") {
      interview_group = null;
    } else if (helpers.name_validate(req.body["interview_group"])) {
      res.status(400).json({ message: "The interview group is invalid." });
      return;
    } else {
      interview_group = req.body["interview_group"];
    }
  }

  let task_group_id = null;
  if ("task_group_id" in req.body) {
    if (req.body["task_group_id"] === "") {
      task_group_id = null;
    } else if (helpers.number_validate(req.body["task_group_id"])) {
      res.status(400).json({ message: "The task group id is invalid." });
      return;
    } else {
      task_group_id = req.body["task_group_id"];
    }
  }

  let starter_code_url = null;
  if ("starter_code_url" in req.body) {
    if (req.body["starter_code_url"] === "") {
      starter_code_url = null;
    } else if (helpers.string_validate(req.body["starter_code_url"])) {
      res.status(400).json({ message: "The starter code url is invalid." });
      return;
    } else {
      starter_code_url = req.body["starter_code_url"];
    }
  }

  let due_date = req.body["due_date"] + " America/Toronto";
  let sql_update =
    "UPDATE course_" +
    res.locals["course_id"] +
    ".task SET due_date = ($1), hidden = ($2), min_member = ($3), max_member = ($4) , max_token = ($5), change_group = ($6), hide_interview = ($7), hide_file = ($8), interview_group = ($9), task_group_id = ($10), starter_code_url = ($11), weight = ($12), long_name = ($13) WHERE task = ($14)";
  let sql_update_data = [
    due_date,
    req.body["hidden"],
    req.body["min_member"],
    req.body["max_member"],
    req.body["max_token"],
    req.body["change_group"],
    req.body["hide_interview"],
	req.body["hide_file"],
    interview_group,
    task_group_id,
    starter_code_url,
    req.body["weight"],
    req.body["long_name"],
    res.locals["task"],
  ];

  client.query(sql_update, sql_update_data, (err, pg_res) => {
    if (err) {
      if (err.code === "23503") {
        res
          .status(400)
          .json({ message: "The task_group_id is not found in the database." });
      } else {
        res.status(404).json({ message: "Unknown error." });
        console.log(err);
      }
    } else if (pg_res.rowCount === 0) {
      res.status(400).json({ message: "The task is invalid." });
    } else {
      res.status(200).json({ message: "The task is changed." });
    }
  });
});

module.exports = router;
