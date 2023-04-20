import React, {useState, useEffect} from "react";
import {useNavigate, useParams} from 'react-router-dom';
import {toast} from 'react-toastify';
import StudentApi from "../../../api/student_api";
import NavBar from "../../Module/Navigation/NavBar";
import Taskcard from "../../Module/Course/Taskcard";
import {Grid} from '@mui/material';

let StudentTaskPage = () => {
  let navigate = useNavigate();
  let {course_id} = useParams();
  let [tasks, setTasks] = useState([]);

  useEffect(() => {
    StudentApi.all_tasks(course_id).then(
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
      <NavBar item page="Task"/>
      <Grid item container
            spacing={2}
            direction="row"
            justifyContent="center"
            alignContent="center"
            justify="center"
            flex="1 1 auto">
        {mainTasks.map(data => (
          <Taskcard data={data} course_id={course_id} ta={false}/>
        ))}
      </Grid>
    </Grid>
  )
};


export default StudentTaskPage;