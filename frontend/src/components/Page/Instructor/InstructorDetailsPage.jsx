import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import InviteMember from '../../Module/Group/InviteMember';
import NavBar from '../../Module/Navigation/NavBar';
import InstrucrorApi from '../../../api/instructor_api';
import '../../../styles/style.css';
import { Button, Container, Grid, Link, Typography } from '@mui/material';
import PageContainer from '../../FlexyMainComponents/container/PageContainer';
import DashboardCard from '../../FlexyMainComponents/base-card/DashboardCard';
import TaskForm from '../../Module/Course/TaskForm';
import MarkGraph from '../../Module/Mark/MarkGraph'

let InstructorDetailsPage = () => {
  let navigate = useNavigate();

  let { course_id, task } = useParams();
  let [task_data, setTaskData] = useState([]);

  useEffect(() => {
    InstrucrorApi.get_task(course_id, task).then((task_response) => {
      if (!task_response || !('status' in task_response)) {
        toast.error('Unknown error', { theme: 'colored' });
        navigate('/login');
        return;
      } else if (task_response['status'] === 200) {
        setTaskData(task_response['data']['task']);
      } else if (task_response['status'] === 401 || task_response['status'] === 403) {
        toast.warn('You need to login again', { theme: 'colored' });
        navigate('/login');
        return;
      } else {
        toast.error('Unknown error', { theme: 'colored' });
        navigate('/login');
        return;
      }
    });
  }, [course_id, task, navigate]);


  return (
    <PageContainer
      title={`${task} Details`}
      description={`Contains due date, grace tokens for task '${task}'`}
    >
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <NavBar page="Details" />
        </Grid>

        <Grid item xs={12}>
          <Container id="details_page" maxWidth="xl">
            <Grid container spacing={3}>
              <Grid item xs={7}>
                <DashboardCard title={`${task} Details`}>
                  <div>
                    <Typography variant="h4"> Token </Typography>

                    <Typography variant="body1" gutterBottom>
                      {' '}
                      At most <b>B</b> token(s) can be used for this task
                    </Typography>

                    <hr />
                    <Typography variant="h4"> Token </Typography>

                    <Typography variant="body1" gutterBottom>
                      {' '}
                      At most <b>B</b> token(s) can be used for this task
                    </Typography>
                    <hr />
                  </div>
                  {
                  }
                  <MarkGraph marks={
                    {
                      "stud": {
                        "1": {
                          "mark": 2,
                          "out_of": 10
                        },
                        "2": {
                          "mark": 20,
                          "out_of": 20
                        }
                      }
                    }
                  }/>
                </DashboardCard>
              </Grid>
              <Grid container item sx='7' sm='6' md='5' lg='4' xl='3'>
                <DashboardCard title={`Modify ${task}`}>
                  <TaskForm mode='modify' initialValues={task_data} />
                </DashboardCard >
              </Grid>
            </Grid>
          </Container>
        </Grid>
      </Grid >
    </PageContainer >
  );
};

export default InstructorDetailsPage;
