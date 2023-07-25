import React from 'react';
import { Card, Typography, Box } from '@mui/material';
import {
    Timeline,
    TimelineItem,
    TimelineSeparator,
    TimelineConnector,
    TimelineContent,
    TimelineOppositeContent,
    TimelineDot
} from '@mui/lab';
import FeatherIcon from 'feather-icons-react';
import PropTypes from 'prop-types';

const InterviewsTimeline = (props) => {
    const sampleFeatherIcons = ['clock', 'slack', 'airplay', 'moon', 'repeat'];
    const sampleIconColors = ['info', 'warning', 'success', 'error', 'secondary'];
    const sampleBgColors = ['primary.light', 'warning.light', 'success.light', 'error.light'];

    const { interviewsArr } = props;

    return (
        <Timeline position="alternate" sx={{ color: 'rgba(0, 0, 0, 0.87)' }}>
            {interviewsArr.map((interviewObj, index) => {
                const isOnline = interviewObj.location === 'Online';

                return (
                    <TimelineItem key={`${interviewObj}-${index}`}>
                        <TimelineOppositeContent
                            sx={{ m: 'auto 0' }}
                            align="right"
                            variant="body2"
                            color="text.secondary"
                        >
                            {interviewObj.start_time}
                            <br />
                            ~
                            <br />
                            {interviewObj.end_time}
                        </TimelineOppositeContent>
                        <TimelineSeparator>
                            <TimelineConnector />
                            <TimelineDot color={isOnline ? 'success' : 'secondary'} sx={{ p: 1 }}>
                                <FeatherIcon
                                    icon={isOnline ? 'airplay' : 'user'}
                                    width="22"
                                    height="22"
                                />
                            </TimelineDot>
                            <TimelineConnector />
                        </TimelineSeparator>
                        <TimelineContent>
                            <Box
                                sx={{
                                    bgcolor: isOnline ? 'success.light' : 'primary.light',
                                    p: 2,
                                    borderRadius: 3
                                }}
                            >
                                <Typography variant="h4" component="span" sx={{ mb: 2 }}>
                                    {interviewObj.location}
                                </Typography>
                                <Typography>
                                    Group ID:{' '}
                                    {interviewObj.group_id === null
                                        ? 'None'
                                        : interviewObj.group_id}
                                </Typography>
                                <Typography>Host: {interviewObj.host}</Typography>
                                <Typography>Interview ID: {interviewObj.interview_id}</Typography>
                                <Typography>Length: {interviewObj.length} min.</Typography>
                                {interviewObj.note !== null && (
                                    <Typography>Additional Notes: {interviewObj.note}</Typography>
                                )}
                            </Box>
                        </TimelineContent>
                    </TimelineItem>
                );
            })}
        </Timeline>
    );
};

InterviewsTimeline.propTypes = {
    // Interviews Array: Same as data.interviews response from backend API call
    interviewsArr: PropTypes.arrayOf(
        PropTypes.shape({
            cancelled: PropTypes.bool,
            end_time: PropTypes.string,
            group_id: PropTypes.number,
            host: PropTypes.string,
            interview_id: PropTypes.number,
            length: PropTypes.number,
            location: PropTypes.string,
            note: PropTypes.string,
            start_time: PropTypes.string,
            task: PropTypes.string
        })
    ).isRequired
};

export default InterviewsTimeline;
