import React from 'react';
import PropTypes from 'prop-types';
import Grid from '@mui/material/Unstable_Grid2';
import TaRescheduleUpdatedFields from './TaRescheduleUpdatedFields';
import TaRescheduleFilterFields from './TaRescheduleFilterFields';

const TaRescheduleInterview = (props) => {
    return (
        <Grid container columns={12}>
            <Grid xs={6}>
                <TaRescheduleFilterFields courseId={props.courseId} taskId={props.taskId} />
            </Grid>
            <Grid xs={6}>
                <TaRescheduleUpdatedFields courseId={props.courseId} taskId={props.taskId} />
            </Grid>
        </Grid>
    );
};

TaRescheduleInterview.propTypes = {
    // Current Course ID
    courseId: PropTypes.string.isRequired,
    // Current Task ID
    taskId: PropTypes.string.isRequired
};

export default TaRescheduleInterview;
