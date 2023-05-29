import StudentList from '../../Module/Course/StudentList';
import { useParams } from 'react-router-dom';
import { Container, Grid, Stack, Typography } from '@mui/material';
import NavBar from '../../Module/Navigation/NavBar';
import PageContainer from '../../FlexyMainComponents/container/PageContainer';
import React from 'react';
import { findCourseCodeInCourse } from '../../../api/staff_api';
import DashboardCard from '../../FlexyMainComponents/base-card/DashboardCard';

const StudentListPage = () => {
    let { course_id } = useParams();
    const courseCode = findCourseCodeInCourse(course_id);

    return (
        <PageContainer title={`Student List`} description={`All the students within ${courseCode}`}>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <NavBar page={`${courseCode} Student List`} />
                </Grid>

                <Grid item xs={12}>
                    <Container id="student-list" maxWidth="md">
                        <Stack spacing={2}>
                            <StudentList courseId={course_id} courseCode={courseCode} />
                        </Stack>
                    </Container>
                </Grid>
            </Grid>
        </PageContainer>
    );
};

export default StudentListPage;
