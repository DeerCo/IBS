import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import NavBar from '../../Module/Navigation/NavBar';
import { Grid, Box } from '@mui/material';
import PageContainer from '../../FlexyMainComponents/container/PageContainer';
import InstructorApi from '../../../api/instructor_api';
import DashboardCard from '../../FlexyMainComponents/base-card/DashboardCard';
import TaskForm from '../../Module/Course/TaskForm';

const ModifyMentorSession = () => {
    let { course_id, task } = useParams();
    let [task_data, setTaskData] = useState([]);
    let navigate = useNavigate();

    useEffect(() => {
        InstructorApi.get_task(course_id, task).then((task_response) => {
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
            title={`${course_id} Modify ${task} Mentor Session`}
            description={`Modify '${task} Mentor Session'`}
            key="modify"
        >
            <NavBar item page="Modify Task Mentor Session" />
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                <Grid container sx="12" sm="10" md="8" lg="6" xl="6">
                    <DashboardCard title={`Modify ${task}`}>
                        <TaskForm mode="modify" initialValues={task_data} />
                    </DashboardCard>
                </Grid>
            </Box>
        </PageContainer>
    );
};

export default ModifyMentorSession;
