import React from 'react';
import PropTypes from 'prop-types';
import useSWR from 'swr';
import StaffApi from '../../../api/staff_api';
import { Container, Typography } from '@mui/material';
import InterviewsTimeline from './InterviewsTimeline';

const UpcomingInterviews = (props) => {
    const [interviewsArr, setInterviewsArr] = React.useState([]);

    const { data, isLoading, error } = useSWR('/get/all-interviews', () =>
        StaffApi.getAllInterviews(props.courseId, props.taskId).then((res) => res.data)
    );

    React.useEffect(() => {
        if (isLoading || error) return;

        setInterviewsArr(data.interviews);
    }, [props.courseId, data, isLoading, error]);

    if (isLoading) return <Typography variant="h1">Loading...</Typography>;

    if (error) return <Typography variant="h1">Error. Try Logging in again</Typography>;

    return (
        <Container sx={{ mt: 10 }}>
            <InterviewsTimeline interviewsArr={interviewsArr} />
        </Container>
    );
};

UpcomingInterviews.propTypes = {
    // Current Course ID
    courseId: PropTypes.string.isRequired,
    // Current Task ID
    taskId: PropTypes.string.isRequired
};

export default UpcomingInterviews;
