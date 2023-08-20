import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from 'react-router-dom';
import NavBar from "../../Module/Navigation/NavBar";
import Taskcard from "../../Module/Task/Taskcard";
import { Grid, Typography, Box } from '@mui/material';
import PageContainer from '../../FlexyMainComponents/container/PageContainer';
import InstructorApi from "../../../api/instructor_api";
import useSWR from 'swr';
import PreviousPageButton from '../../General/PreviousPageButton/PreviousPageButton'


let StudentTaskPage = () => {
  let navigate = useNavigate();
  let { course_id } = useParams();
  let [mainTasks, setMainTasks] = useState([]);


  const { data: tasks, isLoading, error } = useSWR('/task/all', () =>
    InstructorApi.all_tasks(course_id).then((res) => res["data"]["task"])
  );

  useEffect(() => {
    if (isLoading) return;
    if (error) navigate("/login");
    setMainTasks(tasks.filter(task => task.interview_group === null).map(task => ({
      ...task,
      subtasks: tasks.filter(subtask => subtask.interview_group === task.task)
    })));

  }, [course_id, navigate, tasks, isLoading, error]);

  return (
    <PageContainer
      title={`${course_id} Tasks`}
      description={`Contains the tasks for the course '${course_id}'`}
    >
      <Grid container
        direction="column"
        height="100%"
        wrap="nowrap">
        <NavBar item page="Task" role='instructor' />
        <Box sx={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', padding: '32px 32px 0 32px'}}>
          <Typography variant="h1"> Assignments </Typography>
          <PreviousPageButton />
        </Box>
        <Grid item container
          padding='32px'>
          {mainTasks.map((data, index) => (
            <Grid item xs='12' sm="8" md="6" lg="4">
              <Taskcard key={index} data={data} course_id={course_id} role='instructor' />
            </Grid>
          ))}
        </Grid>
      </Grid>
    </PageContainer >
  )
};


export default StudentTaskPage;