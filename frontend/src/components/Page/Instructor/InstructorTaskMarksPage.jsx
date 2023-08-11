import { Container, Grid } from '@mui/material';
import NavBar from '../../Module/Navigation/NavBar';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import TaskMarkTable from '../../Module/Mark/TaskMarkTable';
import PageContainer from '../../FlexyMainComponents/container/PageContainer';

const InstructorTaskMarksPage = () => {
    const { course_id, task_id } = useParams();
    return (
        <PageContainer
            title={`Task Marks for ${task_id}`}
            description="Instructors' view of task marks"
        >
            <Grid container spacing={2}>
                <Grid xs={12}>
                    <NavBar item page="Task Marks" role="instructor" />
                </Grid>
                <Grid item container spacing={2} xs={12}>
                    <Container>
                        <TaskMarkTable courseId={course_id} taskId={task_id} />
                    </Container>
                </Grid>
            </Grid>
        </PageContainer>
    );
};

export default InstructorTaskMarksPage;
