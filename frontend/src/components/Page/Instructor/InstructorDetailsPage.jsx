import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import NavBar from '../../Module/Navigation/NavBar';
import InstrucrorApi from '../../../api/instructor_api';
import '../../../styles/style.css';
import { Button, Grid, Link, Typography, Box } from '@mui/material';
import PageContainer from '../../FlexyMainComponents/container/PageContainer';
import DashboardCard from '../../FlexyMainComponents/base-card/DashboardCard';
import EditIcon from '@mui/icons-material/Edit';

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
      <NavBar page="Details" />

      <Box sx={{ paddingTop: '32px', display: 'flex', justifyContent: 'center' }}>
        <Grid container sx='12' sm='10' md='8' lg='6' xl='6'>
        <Grid item width='100%'>
          <DashboardCard
            customdisplay='grid'
            title={`${task_data['long_name']} Details`}
            action={
              <Button
                href={"/instructor/course/" + course_id + "/task/" + task_data.task + "/modify"}
                color="primary"
                endIcon={<EditIcon />}>
                <b>Edit</b>
              </Button>}
          >
            <div>

              <Typography variant="h4"> Due Date </Typography>
              <Typography variant="body1" gutterBottom>

                Original Due Date: <b>{task_data['due_date']}</b>
              </Typography>
              <hr />

              <Typography variant="h4"> Token </Typography>
              <Typography variant="body1" gutterBottom>
                At most <b>{task_data['max_token']}</b> token(s) can be used for this task.
              </Typography>

              <hr />

              <Typography variant="h4"> Weight </Typography>
              <Typography variant="body1" gutterBottom>
                This task has a weight of <b>{task_data['weight']}%</b>.
              </Typography>
              <hr />

              <Typography variant="h4"> Group Members </Typography>
              <Typography variant="body1" gutterBottom>
                Each group must have <b>{task_data['min_member']} to {task_data['max_member']}</b> members.
              </Typography>
              <hr />

              {task_data['task_group_id'] &&
                <div>
                  <Typography variant="h4"> Task Group </Typography>
                  <Typography variant="body1" gutterBottom>
                    This task is in group <b>{task_data['task_group_id']}</b>.
                  </Typography>
                  <hr />
                </div>}

              {task_data['starter_code_url'] &&
                <div>
                  <Typography variant="h4"> Starter Code </Typography>
                  <Typography variant="body1" gutterBottom>
                    Starter Code can be found <Link href={task_data['starter_code_url']}>here</Link>.
                  </Typography>
                  <hr />
                </div>}

              <Typography variant="h4"> Student Access </Typography>
              <Typography variant="body1" gutterBottom>
                The students <b>{task_data['hidden'] ? "can't" : 'can'}</b> view the task.
                <br />
                The students <b>{task_data['hide_file'] ? "can't" : 'can'}</b> view the feedback file.
                <br />
                The students <b>{task_data['change_group'] ? 'are' : "are not"}</b> allowed to change groups.
                <br />
                The students <b>{task_data['hide_interview'] ? 'are not' : 'are'}</b> able to book interviews.
              </Typography>

            </div>
          </DashboardCard>
        </Grid >
        </Grid >
      </Box>

    </PageContainer >
  );
};

export default InstructorDetailsPage;
