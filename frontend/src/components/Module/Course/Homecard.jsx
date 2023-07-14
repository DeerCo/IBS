import React from 'react';
import { Card, CardActionArea, CardContent, CardMedia, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import HomeCardLink from './HomeCardLink';

const Homecard = ({ data }) => {
    const role = data.role === undefined || data.role === 'student' ? '' : data.role;
    const staffRoles = ['admin', 'ta', 'instructor'];

    const coursePageLink = (role ? '/' + role : '') + '/course/' + data.course_id + '/task';
    const courseStudentListPageLink = `/course/${data.course_id}/student-list`;

    const allGradesPageLink = `${role ? `/${role}` : ''}/course/${data.course_id}/all-grades`;

    const taskGroupsPageLink = `${role ? `/${role}` : ''}/course/${data.course_id}/task-group`;
    const submitMarksPageLink = `/instructor/course/${data.course_id}/submit-marks`;

    return (
        <Card sx={{ width: { xs: 300, sm: 300, md: 400, lg: 400 } }}>
            <CardActionArea component={Link} to={coursePageLink}>
                <CardMedia
                    component="img"
                    height="200"
                    src={require('../../../images/general.png')}
                    alt="course"
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        {data.course_code}
                    </Typography>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Typography variant="body2" color="text.secondary">
                            {data.course_session.replaceAll('_', ' ')}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            {data?.role?.charAt(0)?.toUpperCase() + data?.role?.slice(1)}
                        </Typography>
                    </div>
                </CardContent>
            </CardActionArea>
            {staffRoles.includes(data.role) && (
                <>
                    <HomeCardLink to={courseStudentListPageLink} name="Enrolled Students" />
                    <HomeCardLink to={allGradesPageLink} name="View Grades" />
                    <HomeCardLink to={taskGroupsPageLink} name="Edit Task Groups" />
                    {data.role === 'instructor' && (
                        <>
                            <HomeCardLink to={submitMarksPageLink} name="Submit Marks" />{' '}
                        </>
                    )}
                </>
            )}
        </Card>
    );
};

export default Homecard;