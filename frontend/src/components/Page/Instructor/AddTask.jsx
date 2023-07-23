import { useParams } from "react-router-dom";
import { Grid, Box } from '@mui/material';
import DashboardCard from '../../FlexyMainComponents/base-card/DashboardCard';
import NavBar from "../../Module/Navigation/NavBar";
import PageContainer from '../../FlexyMainComponents/container/PageContainer';
import dayjs from 'dayjs';
import TaskForm from '../../Module/Course/TaskForm';

const AddTask = () => {
  let { course_id } = useParams();

  return (
    <PageContainer
      title={`${course_id} Add Task`}
      description={`Add Task to the course '${course_id}'`}
    >
      <NavBar item page="Add Task" />

      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <Grid container sx='12' sm='10' md='8' lg='6' xl='6'>
          <DashboardCard title={`Add New Task to This Course`}>
            <TaskForm mode='add' initialValues={
              {
                task: '',
                long_name: '',
                due_date: dayjs().add(1, 'hour').format('YYYY-MM-DD HH:mm:ss'),
                hidden: false,
                weight: null,
                min_member: null,
                max_member: null,
                max_token: null,
                change_group: false,
                hide_interview: false,
                hide_file: false,
                interview_group: undefined,
                task_group_id: undefined,
                starter_code_url: undefined
              }} />
          </DashboardCard >
        </Grid>
      </Box>
    </PageContainer>
  );
};

export default AddTask;
