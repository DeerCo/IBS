import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import NavBar from '../../Module/Navigation/NavBar';
import Taskcard from '../../Module/Task/Taskcard';
import { Grid, Typography } from '@mui/material';
import PageContainer from '../../FlexyMainComponents/container/PageContainer';
import InstructorApi from '../../../api/instructor_api';
import useSWR from 'swr';

let InstructorTaskPage = () => {
    let navigate = useNavigate();
    let { course_id } = useParams();
    let [mainTasks, setMainTasks] = useState([]);

    const {
        data: tasks,
        isLoading,
        error
    } = useSWR('/task/all', () =>
        InstructorApi.all_tasks(course_id).then((res) => res['data']['task'])
    );

    useEffect(() => {
        if (isLoading) return;
        if (error) navigate('/login');
        setMainTasks(
            tasks
                .filter((task) => task.interview_group === null)
                .map((task) => ({
                    ...task,
                    subtasks: tasks.filter((subtask) => subtask.interview_group === task.task)
                }))
        );
    }, [course_id, navigate, tasks, isLoading, error]);

    return (
        <PageContainer
            title={`${course_id} Tasks`}
            description={`Contains the tasks for the course '${course_id}'`}
        >
            <Grid container direction="column" height="100%" wrap="nowrap">
                <NavBar item page="Task" role="instructor" />
                <Typography variant="h1" sx={{ textAlign: 'center', marginTop: '32px' }}>
                    Assignments
                </Typography>
                <Grid item container padding={'32px'}>
                    {mainTasks.length === 0 && (
                        <h5>There are currently no assessments in this course</h5>
                    )}
                    {mainTasks.map((data, index) => (
                        <Grid item xs="12" sm="8" md="6" lg="4">
                            <Taskcard
                                key={index}
                                data={data}
                                course_id={course_id}
                                role="instructor"
                            />
                        </Grid>
                    ))}
                </Grid>
            </Grid>
        </PageContainer>
    );
};

export default InstructorTaskPage;
