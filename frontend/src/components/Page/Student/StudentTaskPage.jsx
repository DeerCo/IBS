import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import StudentApi from '../../../api/student_api';
import NavBar from '../../Module/Navigation/NavBar';
import Taskcard from '../../Module/Task/Taskcard';
import { Grid, Typography } from '@mui/material';
import PageContainer from '../../FlexyMainComponents/container/PageContainer';


let StudentTaskPage = () => {
  let navigate = useNavigate();
  let { course_id } = useParams();
  let [tasks, setTasks] = useState([]);

  useEffect(() => {
    StudentApi.all_tasks(course_id).then((response) => {
      if (!response || !('status' in response)) {
        toast.error('Unknown error', { theme: 'colored' });
        navigate('/login');
      } else if (response['status'] === 200) {
        setTasks(response['data']['task']);
      } else if (response['status'] === 401 || response['status'] === 403) {
        toast.warn('You need to login again', { theme: 'colored' });
        navigate('/login');
      } else {
        toast.error('Unknown error', { theme: 'colored' });
        navigate('/login');
      }
    });
  }, [course_id, navigate]);

  let mainTasks = tasks
    .filter((task) => task.interview_group === null)
    .map((task) => ({
      ...task,
      subtasks: tasks.filter((subtask) => subtask.interview_group === task.task)
    }));

  return (
    <PageContainer
      title={`${course_id} Tasks`}
      description={`Contains the tasks for the course '${course_id}'`}
      height="100%"
    >
      <Grid container direction="column" wrap="nowrap">
        <NavBar item page="Task" role='student' />
        <Typography variant="h1"
          sx={{ textAlign: 'center', marginTop: '32px' }} >
          Assignments
        </Typography>
        <Grid item container textAlign="center" padding={'32px'}
          alignItems='center'>
          {mainTasks.length === 0 && <h5>There are currently no assessments in this course</h5>}
          {mainTasks.map((data, index) => (
            <Grid item xs="12" sm="6" md="4" lg="3">
              <Taskcard key={index} data={data} course_id={course_id} role="student" />
            </Grid>
          ))}
        </Grid>
      </Grid>
    </PageContainer>
  );
};

export default StudentTaskPage;
