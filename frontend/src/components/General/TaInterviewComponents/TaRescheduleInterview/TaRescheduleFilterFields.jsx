import React from 'react';
import PropTypes from 'prop-types';
import { Container } from '@mui/material';

const TaRescheduleFilterFields = (props) => {
    return <Container></Container>;
};

TaRescheduleFilterFields.propTypes = {
    // Current Course ID
    courseId: PropTypes.string.isRequired,
    // Current Task ID
    taskId: PropTypes.string.isRequired
};

export default TaRescheduleFilterFields;
