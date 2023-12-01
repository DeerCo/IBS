import React from 'react';
import { Card, Typography, Box, Divider } from '@mui/material';
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
import moment from 'moment';
import Grid from '@mui/material/Unstable_Grid2';

const InterviewsTimeline = (props) => {
    const sampleFeatherIcons = ['clock', 'slack', 'airplay', 'moon', 'repeat'];
    const sampleIconColors = ['info', 'warning', 'success', 'error', 'secondary'];
    const sampleBgColors = ['primary.light', 'warning.light', 'success.light', 'error.light'];

    const { interviewsArr } = props;

    // React.useEffect(() => {
    //     // for dev purposes
    //     console.log(interviewsArr);
    //     if (interviewsArr.length > 0) {
    //         const startTimeExample = interviewsArr[0].start_time;
    //         const momentConversion = moment(startTimeExample);
    //         console.log(momentConversion.format('MMMM Do YYY, h:mm:ss a'));
    //     }
    // }, [interviewsArr]);

    return (
        <Timeline position="alternate" sx={{ color: 'rgba(0, 0, 0, 0.87)' }}>
            {interviewsArr.map((interviewObj, index) => {
                const isOnline = interviewObj.location === 'Online';

                const startTimeConversion = moment(interviewObj.start_time).format(
                    'MMMM Do YYYY, h:mm a'
                );
                const endTimeConversion = moment(interviewObj.end_time).format(
                    'MMMM Do YYYY, h:mm a'
                );

                const gridStyling = () => (
                    <Grid
                        container
                        sx={{ mt: 1 }}
                        columnSpacing={0}
                        rowSpacing={1.5}
                        justifyContent="space-evenly"
                    >
                        <Grid xs>
                            <Typography fontWeight={600}>Group ID:</Typography>
                            <Typography fontWeight={600}>Host:</Typography>
                            <Typography fontWeight={600}>Interview ID:</Typography>
                            <Typography fontWeight={600}>Length:</Typography>
                            {interviewObj.note !== null && (
                                <Typography fontWeight={600}>Additional Notes:</Typography>
                            )}
                        </Grid>
                        <Divider orientation="vertical" />
                        <Grid xs>
                            <Typography>
                                {interviewObj.group_id === null ? 'None' : interviewObj.group_id}
                            </Typography>
                            <Typography>{interviewObj.host}</Typography>
                            <Typography>{interviewObj.interview_id}</Typography>
                            <Typography>{interviewObj.length} min.</Typography>
                            {interviewObj.note !== null && (
                                <Typography>{interviewObj.note}</Typography>
                            )}
                        </Grid>
                    </Grid>
                );

                return (
                    <TimelineItem key={`${interviewObj}-${index}`}>
                        <TimelineOppositeContent
                            sx={{ m: 'auto 0' }}
                            align="right"
                            variant="body2"
                            color="text.secondary"
                        >
                            {startTimeConversion}
                            <br />
                            ~
                            <br />
                            {endTimeConversion}
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
