import {Box, Grid, Typography} from "@mui/material";
import NavBar from "../../Module/Navigation/NavBar";
import Taskcard from "../../Module/Course/Taskcard";
import React, {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import InstructorApi from "../../../api/instructor_api";
import {toast} from "react-toastify";

const InstructorTaskPage = () => {
  let navigate = useNavigate();
  let {course_id} = useParams();
  let [tasks, setTasks] = useState([]);

  useEffect(() => {
    InstructorApi.all_tasks(course_id).then(
      (response) => {
        if (!response || !("status" in response)) {
          toast.error("Unknown error", {theme: "colored"});
          navigate("/login");
        } else if (response["status"] === 200) {
          setTasks(response["data"]["task"]);
        } else if (response["status"] === 401 || response["status"] === 403) {
          toast.warn("You need to login again", {theme: "colored"});
          navigate("/login");
        } else {
          toast.error("Unknown error", {theme: "colored"});
          navigate("/login");
        }
      })
  }, [course_id, navigate]);

  let mainTasks = tasks.filter(task => task.interview_group === null).map(task => ({
    ...task,
    subtasks: tasks.filter(subtask => subtask.interview_group === task.task)
  }));

  return (
    <Grid container
          direction="column"
          height="100%"
          wrap="nowrap">
      <NavBar item page="Task" role={"instructor"}/>
      <Grid item container
            spacing={2}
            direction="row"
            justifyContent="center"
            alignContent="center"
            justify="center"
            flex="1 1 auto">
        {mainTasks.map(data => (
          <Taskcard data={data} course_id={course_id} role={"instructor"}/>
        ))}
      </Grid>
    </Grid>
  )
}

export default InstructorTaskPage